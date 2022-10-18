import inquirer from "inquirer";

const RegxMap = {
  IS_MODULE_NAME: /^[a-z]/,
};

const infoCollector = async () => {
  const prompt = inquirer.createPromptModule();
  const meta = await prompt([
    {
      type: "input",
      message: "请输入模块名：",
      name: "moduleName",
      validate(answer) {
        const done = this.async();
        const validateRes = RegxMap.IS_MODULE_NAME.test(answer);
        if (!validateRes) {
          done("请按要求输入正确的模块名！");
          return;
        }
        done(null, true);
      },
    },
    {
      type: "input",
      message: "请输入API前缀：",
      name: "moduleApi",
    },
  ]);
  meta.moduleLargeName = meta.moduleName
    .toLowerCase()
    .replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  return meta;
};

export default infoCollector;
