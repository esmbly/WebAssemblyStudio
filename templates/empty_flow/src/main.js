WebAssembly.instantiateStreaming(fetch("../out/add.wasm"), {})
  .then(result => {
    const exports = result.instance.exports;
    document.getElementById("container").textContent = "Result: " + exports.add(19, 23);
  })
  .catch(console.error);
