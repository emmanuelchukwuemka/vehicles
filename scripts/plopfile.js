const path = require("path");
const fs = require("fs");
const prettierAction = require("./plop-action-prettier");

function getImportPath(fromDir, targetFile) {
  const relativePath = path.relative(fromDir, targetFile).replace(/\\/g, "/");
  const cleaned = relativePath.replace(/\.ts$/, "");
  return cleaned.startsWith(".") ? cleaned : "./" + cleaned;
}

module.exports = function (plop) {
  console.log("✅ plopfile loaded");

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

      if (data.type === "sub") {
        const parentPath = path.join(__dirname, "../src/modules", data.subPath);
        if (!fs.existsSync(parentPath) && data.createMissingPath) {
          fs.mkdirSync(parentPath, { recursive: true });
          console.log(`Created missing parent folder: ${parentPath}`);
        } else if (!fs.existsSync(parentPath) && !data.createMissingPath) {
          console.log("Proccess aborted: Parent module path does not exist.");
          return [];
        }
      }

      if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });

      const importPath = getImportPath(
        basePath,
        path.resolve(__dirname, "../src/globals/utility/apiResponse.ts")
      );

      const files = [
        { name: `${dashName}.controller.ts`, template: "controller.hbs" },
        { name: `${dashName}.service.ts`, template: "service.hbs" },
        { name: `${dashName}.types.ts`, template: "types.hbs" },
        { name: `index.ts`, template: "index.hbs" },
        { name: `${dashName}.routes.ts`, template: "routes.hbs" },
        { name: `${dashName}.helper.ts`, template: "helper.hbs" },
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

      if (data.type === "sub") {
        const parentFolder = path.join(
          __dirname,
          "../src/modules",
          data.subPath
        );
        const parentIndexFile = path.join(parentFolder, "index.ts");

        if (fs.existsSync(parentIndexFile)) {
          const subImportName = `${dashName}Module`;
          const subRoutePath = getImportPath(
            parentFolder,
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

      return actions;
    },
  });
};
