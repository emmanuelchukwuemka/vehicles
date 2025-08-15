const path = require("path");
const fs = require("fs");
const prettierAction = require("./plop-action-prettier");

// Path for main modules (loader)
function getModuleImportPath(loaderFile, moduleFolder) {
  let relativePath = path.relative(path.dirname(loaderFile), moduleFolder);
  relativePath = relativePath.replace(/\\/g, "/");
  if (!relativePath.startsWith(".")) relativePath = "./" + relativePath;
  return relativePath;
}

// Path for submodules (parent index)
function getSubmoduleImportPath(parentIndexFile, subFolder) {
  let relativePath = path.relative(path.dirname(parentIndexFile), subFolder);
  relativePath = relativePath.replace(/\\/g, "/");
  if (!relativePath.startsWith(".")) relativePath = "./" + relativePath;
  return relativePath;
}

// Compute import path from current module folder to apiResponse
function getApiResponseImportPath(moduleFolder) {
  const absPath = path.resolve(
    __dirname,
    "../src/globals/utility/apiResponse.ts"
  );
  let relativePath = path.relative(moduleFolder, absPath).replace(/\\/g, "/");
  if (!relativePath.startsWith(".")) relativePath = "./" + relativePath;
  // Remove .ts extension for TypeScript import
  relativePath = relativePath.replace(/\.ts$/, "");
  return relativePath;
}

module.exports = function (plop) {
  console.log("==> plopfile loaded");

  plop.setActionType("prettier", prettierAction);

  plop.setGenerator("module", {
    description: "Create a new module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name?",
        validate: (input) => {
          if (!input || !input.trim()) return "Module name is required.";
          if (/^[\.\d]/.test(input))
            return "Module name cannot start with a dot or a number.";
          if (!/^[a-z0-9-]+$/.test(input))
            return "Module name must be lowercase letters, numbers, or dashes only.";
          return true;
        },
      },
      {
        type: "list",
        name: "type",
        message: "Is this a main module or a submodule?",
        choices: ["main", "sub"],
      },
      {
        type: "input",
        name: "subPath",
        message:
          "Enter submodule path after /modules (e.g. stores or stores/reviews):",
        when: (answers) => answers.type === "sub",
        filter: (input) => input.replace(/^\/+/, "").replace(/\/+$/, ""),
        validate: (input) => {
          if (!input || !input.trim())
            return "Submodule path is required for submodules.";
          if (/^[\.\d]/.test(input))
            return "Submodule path cannot start with a dot or a number.";
          if (!/^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(input))
            return "Submodule path must be lowercase letters, numbers, or dashes, with folders separated by '/'.";
          return true;
        },
      },
      {
        type: "confirm",
        name: "createMissingPath",
        message: (answers) => {
          if (answers.type === "sub") {
            const parentPath = path.join(
              __dirname,
              "../src/modules",
              answers.subPath
            );
            if (!fs.existsSync(parentPath)) {
              return `Parent module path "${answers.subPath}" does not exist. Create it?`;
            }
          }
          return false;
        },
        when: (answers) => answers.type === "sub",
        default: true,
      },
    ],
    actions: function (data) {
      const dashName = plop.getHelper("dashCase")(data.name);
      const basePath =
        data.type === "main"
          ? path.join(__dirname, `../src/modules/${dashName}`)
          : path.join(__dirname, `../src/modules/${data.subPath}/${dashName}`);

      // am checking if parent folder for submodule exists
      if (data.type === "sub") {
        const parentPath = path.join(__dirname, "../src/modules", data.subPath);
        if (!fs.existsSync(parentPath) && data.createMissingPath) {
          fs.mkdirSync(parentPath, { recursive: true });
          console.log(`Created missing parent folder: ${parentPath}`);
        } else if (!fs.existsSync(parentPath) && !data.createMissingPath) {
          console.log("Process aborted: Parent module path does not exist.");
          return [];
        }
      }

      // am checking for base folder exists
      if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

      const importPath = getApiResponseImportPath(basePath);

      const files = [
        { name: `${dashName}.controller.ts`, template: "controller.hbs" },
        { name: `${dashName}.service.ts`, template: "service.hbs" },
        { name: `${dashName}.types.ts`, template: "types.hbs" },
        { name: `index.ts`, template: "index.hbs" },
        { name: `${dashName}.routes.ts`, template: "routes.hbs" },
        { name: `${dashName}.helper.ts`, template: "helper.hbs" },
        { name: `${dashName}.model.ts`, template: "model.hbs" },
        { name: `${dashName}.middleware.ts`, template: "middleware.hbs" },
      ];

      let actions = [
        ...files.map((file) => ({
          type: "add",
          path: path.join(basePath, file.name),
          templateFile: path.resolve(
            __dirname,
            `plop-templates/${file.template}`
          ),
          data: { importApiResponse: importPath },
        })),
        { type: "prettier", path: path.join(basePath, "**/*.ts") },
      ];

      // Submodule patching in parent index
      if (data.type === "sub") {
        const parentFolder = path.join(
          __dirname,
          "../src/modules",
          data.subPath
        );
        const parentIndexFile = path.join(parentFolder, "index.ts");

        if (fs.existsSync(parentIndexFile)) {
          const subImportName = `${dashName}Module`;
          const subRoutePath = getSubmoduleImportPath(
            parentIndexFile,
            path.join(parentFolder, dashName)
          );

          actions.push({
            type: "modify",
            path: parentIndexFile,
            transform(fileContents) {
              if (!fileContents.includes(subImportName)) {
                fileContents = fileContents.replace(
                  /(\nconst router = Router\(\);)/,
                  `\nimport ${subImportName} from "${subRoutePath}";$1`
                );
              }
              if (!fileContents.includes(`router.use("/${dashName}"`)) {
                fileContents = fileContents.replace(
                  /(export default router;)/,
                  `router.use("/${dashName}", ${subImportName});\n\n$1`
                );
              }
              return fileContents;
            },
          });

          actions.push({ type: "prettier", path: parentIndexFile });
        } else {
          console.warn(
            `⚠ No index.ts found in ${parentFolder}, skipping patch.`
          );
        }
      }

      // Main module loader patch
      if (data.type === "main") {
        const loaderFile = path.join(__dirname, "../src/loaders/express.ts");
        if (fs.existsSync(loaderFile)) {
          const importName = `${dashName}Module`;
          const importPath = getModuleImportPath(loaderFile, basePath);

          actions.push({
            type: "modify",
            path: loaderFile,
            transform(fileContents) {
              // Add import if missing
              const importLine = `import ${importName} from "${importPath}";`;
              if (!fileContents.includes(importLine)) {
                const lastImportIndex = fileContents.lastIndexOf("import");
                const nextLine = fileContents.indexOf("\n", lastImportIndex);
                fileContents =
                  fileContents.slice(0, nextLine + 1) +
                  importLine +
                  "\n" +
                  fileContents.slice(nextLine + 1);
              }

              const useLine = `  app.use("/api/${dashName}", ${importName});`;

              // Find all app.use(...) inside the exported function
              const functionStart = fileContents.indexOf(
                "export default (app: Application)"
              );
              const bodyStart = fileContents.indexOf("{", functionStart) + 1;
              const bodyEnd = fileContents.indexOf("}", bodyStart);
              const functionBody = fileContents.slice(bodyStart, bodyEnd);

              const appUseMatches = [
                ...functionBody.matchAll(/app\.use\(.*\);/g),
              ];

              if (appUseMatches.length) {
                // Insert after last app.use(...)
                const lastMatch = appUseMatches[appUseMatches.length - 1];
                const insertPos =
                  bodyStart + lastMatch.index + lastMatch[0].length;
                fileContents =
                  fileContents.slice(0, insertPos) +
                  "\n" +
                  useLine +
                  fileContents.slice(insertPos);
              } else {
                // fallback: insert right after {
                fileContents =
                  fileContents.slice(0, bodyStart) +
                  "\n" +
                  useLine +
                  fileContents.slice(bodyStart);
              }

              return fileContents;
            },
          });

          actions.push({ type: "prettier", path: loaderFile });
        }
      }

      return actions;
    },
  });
};
