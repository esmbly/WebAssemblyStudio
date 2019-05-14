// This file is not required when running the project locally. Its purpose is to set up the
// AssemblyScript compiler when a new project has been loaded in WebAssembly Studio.
require.config({
  paths: {
    "binaryen": "https://assemblyscript.github.io/binaryen.js/index",
    "@esmbly/core": "https://unpkg.com/@esmbly/core@0.0.5/dist/index.bundle",
    "@esmbly/transformer-wasm": "https://unpkg.com/@esmbly/transformer-wasm@0.0.5/dist/index.bundle",
    "@esmbly/transformer-flow": "https://unpkg.com/@esmbly/transformer-flow@0.0.5/dist/index.bundle",
  }
});
logLn("Loading Esmbly ...");
require(["@esmbly/core", "@esmbly/transformer-flow", "@esmbly/transformer-wasm"], () => {
  logLn("Esmbly is ready!");
});
