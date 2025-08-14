import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("module", {
    description: "Create a new module with controller, service, and route",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/modules/{{dashCase name}}/{{dashCase name}}.controller.ts",
        templateFile: "scripts/plop-templates/controller.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{dashCase name}}/{{dashCase name}}.service.ts",
        templateFile: "scripts/plop-templates/service.hbs",
      },
      {
        type: "add",
        path: "src/modules/{{dashCase name}}/{{dashCase name}}.routes.ts",
        templateFile: "scripts/plop-templates/routes.hbs",
      },
    ],
  });
}
