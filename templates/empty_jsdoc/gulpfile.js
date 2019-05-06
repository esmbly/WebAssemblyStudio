const gulp = require("gulp");

gulp.task("build", callback => {
  const { default: esmbly } = require('@esmbly/core');
  const { default: JSDocTransformer } = require('@esmbly/transformer-jsdoc');
  const { default: WasmTransformer } = require('@esmbly/transformer-wasm');
  const file = project.getFile('src/add.js');

  esmbly.run({
    input: [
      {
        content: file.data,
        dir: 'src',
        name: 'add',
        type: '.js',
      },
    ],
    output: [{ format: 'WebAssembly' }],
    transformers: [JSDocTransformer({}), WasmTransformer({})],
  })
  .then(([{ content }]) => {
    project.newFile('out/add.wasm', 'wasm', true).setData(content);
    callback();
  }).catch((err) => callback(err));
});

gulp.task("default", ["build"]);

// This task is not required when running the project locally. Its purpose is to set up the
// esmbly when a new project has been loaded in WebAssembly Studio.
gulp.task("project:load", () => {
  const utils = require("@wasm/studio-utils");
  utils.eval(utils.project.getFile("setup.js").getData(), {
    logLn,
  });
});
