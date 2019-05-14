const gulp = require("gulp");

gulp.task("build", () => new Promise((resolve, reject) => {
  const esmbly = require('@esmbly/core');
  const Flow = require('@esmbly/transformer-flow');
  const Wasm = require('@esmbly/transformer-wasm');
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
    transformers: [
      Flow.createTransformer(),
      Wasm.createTransformer()
    ],
    output: [{ format: 'WebAssembly' }],
  })
  .then(([{ content }]) => {
    project.newFile('out/add.wasm', 'wasm', true).setData(content);
    resolve();
  })
  .catch((err) => reject(err)); 
}));

gulp.task("default", ["build"]);

// This task is not required when running the project locally. Its purpose is to set up the
// esmbly when a new project has been loaded in WebAssembly Studio.
gulp.task("project:load", () => {
  const utils = require("@wasm/studio-utils");
  utils.eval(utils.project.getFile("setup.js").getData(), {
    logLn,
  });
});
