import fs from "fs-extra";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getTplFilePath = (meta) => ({
  api: {
    from: "./.template/api/index.ts.tpl",
    to: `../src/api/${meta.moduleName}/index.ts`,
  },
  store: {
    from: "./.template/store/index.ts.tpl",
    to: `../src/store/modules/${meta.moduleName}.ts`,
  },
  types: {
    from: "./.template/types/index.ts.tpl",
    to: `../src/types/${meta.moduleName}.ts`,
  },
  vue: {
    from: "./.template/vue/index.vue.tpl",
    to: `../src/views/${meta.moduleName}/index.vue`,
  },
  handle: {
    from: "./.template/vue/components/form-model.vue.tpl",
    to: `../src/views/${meta.moduleName}/components/form-model.vue`,
  },
  query: {
    from: "./.template/vue/components/header-query.vue.tpl",
    to: `../src/views/${meta.moduleName}/components/header-query.vue`,
  },
  index: {
    from: "./.template/vue/components/index.ts.tpl",
    to: `../src/views/${meta.moduleName}/components/index.ts`,
  },
  table: {
    from: "./.template/vue/components/table-list.vue.tpl",
    to: `../src/views/${meta.moduleName}/components/table-list.vue`,
  },
});

const filesTplReplacer = (meta) => {
  const filePaths = getTplFilePath(meta);
  Object.keys(filePaths).forEach((key) => {
    const fileTpl = fs.readFileSync(
      path.resolve(__dirname, filePaths[key].from),
      "utf-8"
    );
    const fileContent = handlebars.compile(fileTpl)(meta);
    fs.outputFile(
      path.resolve(__dirname, filePaths[key].to),
      fileContent,
      (err) => {
        if (err) console.log(err);
      }
    );
  });
};

const tplStart = (meta) => {
  filesTplReplacer(meta);
  console.log(`模块新建完毕`);
};

export default tplStart;
