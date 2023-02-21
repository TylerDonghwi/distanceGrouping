function genTests() {
  const tests = [];
  for (let i = 0; i < 20; i++) {
    const coordinates = [];

    let size = Math.random() * 40;
    for (let i = 0; i < size; i++) {
      let x = Math.floor(Math.random() * 20);
      let y = Math.floor(Math.random() * 20);
      coordinates.push([x, y]);
    }
    tests.push("[" + coordinates.join("], [") + "]");
  }
  console.log("[" + tests.join("], [") + "]");
}

