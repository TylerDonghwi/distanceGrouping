const colors = [
  "",
  "lightgray",
  "black",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "cyan",
];
const tests = [
  [
    [17, 10],
    [2, 18],
    [1, 5],
    [3, 0],
    [3, 13],
    [8, 4],
    [1, 9],
    [17, 16],
    [8, 11],
    [12, 16],
    [17, 0],
    [11, 18],
    [5, 2],
    [6, 2],
    [2, 6],
    [9, 12],
    [2, 2],
  ],
  [
    [5, 2],
    [12, 13],
    [6, 19],
    [3, 1],
    [13, 17],
    [10, 19],
    [0, 2],
    [11, 7],
    [9, 19],
    [6, 16],
    [3, 4],
    [4, 5],
    [15, 10],
    [4, 9],
    [15, 18],
    [19, 13],
    [0, 12],
    [13, 2],
    [3, 18],
    [0, 19],
    [5, 7],
    [13, 5],
    [11, 15],
    [3, 6],
    [4, 18],
    [9, 13],
  ],
  [
    [11, 8],
    [10, 2],
    [7, 14],
    [4, 3],
    [13, 5],
    [4, 12],
  ],
  [
    [4, 9],
    [19, 14],
    [9, 5],
    [19, 13],
    [12, 6],
    [0, 3],
    [18, 4],
    [1, 4],
    [10, 19],
    [12, 5],
    [15, 16],
    [6, 4],
    [0, 11],
  ],
  [
    [15, 11],
    [1, 7],
    [8, 0],
    [14, 3],
    [15, 8],
    [7, 17],
    [19, 2],
    [3, 18],
    [14, 15],
    [5, 13],
    [12, 9],
    [4, 1],
    [19, 10],
    [8, 17],
    [8, 16],
    [14, 8],
    [15, 16],
    [13, 14],
    [8, 7],
    [7, 8],
    [2, 10],
    [18, 13],
    [6, 19],
    [15, 7],
    [15, 4],
    [0, 15],
    [6, 14],
    [18, 10],
    [17, 0],
    [1, 2],
    [7, 6],
  ],
  [
    [7, 10],
    [11, 2],
    [12, 1],
    [10, 3],
    [13, 0],
    [13, 2],
    [3, 11],
    [10, 16],
    [11, 18],
    [19, 13],
    [3, 5],
    [5, 11],
    [9, 14],
    [17, 18],
    [7, 10],
    [4, 5],
    [5, 15],
    [17, 15],
    [17, 6],
    [13, 8],
    [14, 16],
    [0, 15],
    [15, 7],
    [15, 0],
    [5, 7],
    [9, 4],
    [5, 14],
    [12, 5],
    [14, 3],
    [13, 11],
    [3, 0],
    [16, 5],
    [16, 16],
    [14, 14],
    [2, 7],
    [11, 6],
    [14, 9],
    [9, 0],
  ],
  [
    [15, 15],
    [13, 15],
    [12, 17],
    [2, 12],
    [0, 9],
    [11, 16],
    [18, 11],
    [9, 8],
    [7, 12],
    [0, 8],
    [11, 12],
    [17, 16],
    [6, 16],
    [2, 17],
    [6, 15],
    [18, 8],
    [13, 6],
    [18, 16],
    [1, 0],
    [4, 17],
    [2, 16],
    [10, 19],
    [5, 9],
    [15, 2],
    [8, 12],
    [8, 14],
    [9, 17],
    [15, 18],
    [1, 8],
    [0, 6],
    [0, 7],
    [12, 3],
  ],
  [
    [13, 3],
    [13, 5],
    [15, 14],
    [2, 7],
    [9, 0],
    [18, 2],
    [15, 4],
    [8, 10],
    [9, 1],
    [13, 2],
    [13, 13],
    [9, 19],
  ],
  [
    [6, 0],
    [2, 18],
    [3, 0],
    [8, 6],
    [14, 13],
    [2, 6],
    [16, 3],
    [13, 0],
    [8, 4],
    [10, 10],
    [6, 18],
    [3, 2],
    [2, 17],
    [1, 8],
    [16, 3],
    [9, 13],
    [3, 8],
    [14, 11],
    [0, 6],
    [17, 19],
    [4, 18],
    [13, 11],
    [12, 10],
    [5, 2],
    [4, 3],
  ],
  [
    [1, 10],
    [5, 4],
    [8, 7],
    [5, 3],
    [4, 11],
    [5, 16],
    [17, 6],
    [16, 6],
    [9, 15],
    [3, 11],
    [17, 14],
    [7, 10],
    [12, 17],
    [8, 5],
    [10, 16],
    [16, 3],
    [15, 10],
    [12, 13],
    [15, 13],
    [9, 1],
    [16, 19],
    [18, 8],
    [6, 17],
    [11, 19],
    [0, 19],
    [17, 16],
    [4, 4],
    [15, 11],
    [12, 7],
    [13, 3],
    [2, 17],
  ],
  [
    [5, 11],
    [17, 0],
    [11, 0],
    [11, 2],
    [17, 4],
    [5, 3],
    [6, 15],
    [0, 3],
    [7, 5],
    [15, 7],
    [7, 2],
    [2, 19],
    [16, 15],
    [2, 7],
    [9, 8],
    [4, 10],
    [1, 2],
    [19, 4],
    [13, 14],
    [8, 4],
    [6, 8],
    [10, 17],
    [3, 6],
    [14, 9],
    [3, 11],
    [2, 10],
  ],
  [
    [13, 10],
    [9, 4],
    [10, 19],
    [10, 3],
    [4, 19],
    [9, 11],
    [9, 1],
    [17, 19],
    [7, 19],
    [1, 16],
    [4, 7],
    [15, 9],
    [19, 6],
    [16, 11],
    [18, 6],
    [17, 9],
    [11, 15],
    [4, 10],
    [2, 6],
    [12, 2],
    [19, 13],
  ],
  [
    [0, 19],
    [4, 8],
    [5, 17],
    [6, 19],
    [1, 18],
    [12, 14],
    [19, 9],
    [1, 8],
    [11, 15],
    [3, 8],
    [13, 1],
    [19, 6],
    [4, 12],
    [14, 13],
    [2, 16],
    [6, 19],
  ],
  [
    [16, 4],
    [15, 9],
    [15, 18],
    [18, 1],
    [2, 17],
    [4, 17],
    [17, 17],
    [0, 9],
    [0, 2],
    [11, 0],
    [17, 13],
    [16, 15],
    [9, 14],
    [14, 0],
    [17, 10],
    [0, 3],
  ],
  [
    [5, 16],
    [5, 3],
    [8, 15],
    [6, 18],
    [8, 10],
    [10, 1],
    [19, 16],
    [3, 19],
    [19, 9],
    [10, 17],
    [16, 14],
    [2, 12],
    [2, 15],
    [5, 8],
    [3, 9],
    [4, 10],
    [0, 17],
    [3, 6],
    [16, 6],
    [11, 13],
    [16, 2],
    [15, 2],
  ],
  [
    [3, 7],
    [10, 18],
    [1, 12],
    [16, 7],
    [14, 3],
    [3, 11],
    [18, 8],
    [12, 12],
    [2, 13],
    [19, 1],
    [9, 16],
    [11, 12],
    [5, 14],
    [18, 2],
    [16, 12],
  ],
  [
    [14, 7],
    [14, 8],
    [11, 10],
    [19, 8],
    [4, 14],
    [8, 17],
    [16, 15],
    [15, 15],
    [2, 4],
    [9, 11],
    [0, 6],
    [6, 3],
    [17, 18],
    [7, 1],
    [2, 3],
    [5, 16],
    [15, 4],
    [2, 12],
    [16, 4],
    [15, 13],
    [9, 14],
    [17, 5],
    [5, 9],
    [9, 13],
    [12, 13],
    [17, 18],
    [4, 2],
    [17, 10],
    [15, 0],
    [15, 11],
    [3, 9],
    [4, 16],
    [17, 9],
    [7, 6],
    [15, 15],
  ],
  [
    [0, 12],
    [11, 8],
    [10, 12],
    [17, 1],
    [18, 6],
    [19, 17],
    [7, 14],
  ],
];
const meths = [groupbyDistance, groupStartFarEnd];

function generateTests() {
  const tests = [];
  for (let i = 0; i < 20; i++) {
    const coordinates = [];

    let size = Math.random() * 35 + 5;
    for (let i = 0; i < size; i++) {
      let x = Math.floor(Math.random() * 20);
      let y = Math.floor(Math.random() * 20);
      coordinates.push([x, y]);
    }
    tests.push("[" + coordinates.join("], [") + "]");
  }
  console.log("[" + tests.join("], [") + "]");
}

function display(coor, i, max, n, x) {
  const parent = document.createElement("div");
  parent.style.display = "flex";

  const groups = meths[x](coor, max, n);
  const ul = document.createElement("ul");
  addLi(ul, `Index: ${i}, Num jobs: ${coor.length}`);
  addLi(ul, `MaxCap: ${max}, Num Technicians: ${n}`);
  addLi(ul, `Function Number: ${x}`);
  addLi(ul, "");

  groups
    .map((group) =>
      group.map((element) => `[${element[0]}, ${element[1]}]`).join(", ")
    )
    .forEach((group, i) => {
      addLi(
        ul,
        `${i === groups.length - 1 ? "Overflow" : colors[i + 3]}: ${group}`
      );
    });
  visualiseCoordinates(coor, groups, parent);
  parent.appendChild(ul);
  document.body.appendChild(parent);
}
function visualiseCoordinates(coordinates, groups, parent) {
  const [y, x] = coordinates.reduce(
    (max, coordinate) => {
      return [Math.max(max[0], coordinate[0]), Math.max(max[1], coordinate[1])];
    },
    [0, 0]
  );

  const array = Array.from({ length: x + 1 }, () => new Array(y + 1).fill(0));

  coordinates.forEach((coordinate) => {
    array[coordinate[1]][coordinate[0]] = 1;
  });

  groups.forEach((group, i) => {
    group.forEach((location) => {
      array[location[1]][location[0]] = i === groups.length - 1 ? 1 : i + 3;
    });
  });

  const table = document.createElement("table");
  table.style.marginBottom = "20px";
  table.style.width = "70vw";
  table.style.height = "47.5vh";

  for (let i = 0; i <= x; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= y; j++) {
      const cell = document.createElement("td");
      cell.textContent = `${j}, ${i}`;
      cell.style.textAlign = "center";
      cell.style.backgroundColor = colors[array[i][j]];
      cell.style.border = "solid 1px black";
      cell.style.fontSize = "15px";
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  parent.appendChild(table);
}
function addLi(parent, text) {
  const li = document.createElement("li");
  li.textContent = text;
  parent.appendChild(li);
}
//
// Testing Zone
//
tests.forEach((coor, i) => {
  display(coor, i, 4, 8, 0);
  display(coor, i, 4, 8, 1);
});

// sample with the first test
// display(tests[0], 0, 4, 8, 0);
// display(tests[0], 0, 4, 8, 1);

// display(tests[0], 0, 1, 8, 0);
// display(tests[0], 0, 2, 8, 0);

//
// UTILITY FUNCTIONS
//
function getClosestJob(technician, coordinates, added) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  const closestIndex = coordinates.reduce((minIndex, coordinate, i) => {
    if (added[i]) return minIndex;
    let curDistance = getDistance(technician, coordinate);
    if (curDistance < minDistance) {
      minDistance = curDistance;
      return i;
    } else {
      return minIndex;
    }
  }, -1);
  if (closestIndex === -1) {
    return -1;
  }
  added[closestIndex] = true;
  return closestIndex;
}
function getFurthestJob(technician, coordinates, added) {
  let maxDistance = Number.MIN_SAFE_INTEGER;
  const furthestIndex = coordinates.reduce((maxIndex, coordinate, i) => {
    if (added[i]) return maxIndex;
    let curDistance = getDistance(technician, coordinate);
    if (curDistance > maxDistance) {
      maxDistance = curDistance;
      return i;
    } else {
      return maxIndex;
    }
  }, -1);
  if (furthestIndex === -1) {
    return -1;
  }
  added[furthestIndex] = true;
  return furthestIndex;
}

function getDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

// Assigning Functions

// O(n^2)
// BFS approach
// Start From the Center and get the closest job then from that location find the nearest jobs
function groupbyDistance(coordinates, max, n) {
  const [y, x] = coordinates.reduce(
    (max, coordinate) => {
      return [Math.max(max[0], coordinate[0]), Math.max(max[1], coordinate[1])];
    },
    [0, 0]
  );
  const m = coordinates.length;
  const groups = Array.from(Array(n + 1), () => []);
  const technicians = Array.from(Array(n), () => {
    return {
      maxCap: false,
      curLocation: [Math.floor(y / 2), Math.floor(x / 2)],
    };
  });
  const added = [...Array(m)].map(() => false);

  let counter = 0;
  let curTech = 0;

  while (counter < m && technicians.some((tech) => !tech.maxCap)) {
    if (!technicians.maxCap) {
      const i = getClosestJob(
        technicians[curTech].curLocation,
        coordinates,
        added
      );
      groups[curTech].push(coordinates[i]);
      if (groups[curTech].length === max) {
        technicians[curTech].maxCap = true;
      }
      technicians[curTech].curLocation = coordinates[i];
      counter++;
    }
    curTech = (curTech + 1) % n;
  }
  added.forEach((el, i) => {
    if (!el) {
      groups[n].push(coordinates[i]);
    }
  });

  return groups;
}

// O(n^2)
// BFS approach
// Do the first iteration with the furthest, from there find the closest job from there
function groupStartFarEnd(coordinates, max, n) {
  max = Math.max(1, max);
  const [y, x] = coordinates.reduce(
    (max, coordinate) => {
      return [Math.max(max[0], coordinate[0]), Math.max(max[1], coordinate[1])];
    },
    [0, 0]
  );
  const m = coordinates.length;
  const groups = Array.from(Array(n + 1), () => []);
  const technicians = Array.from(Array(n), () => {
    return {
      maxCap: false,
      curLocation: [Math.floor(y / 2), Math.floor(x / 2)],
    };
  });
  const added = [...Array(m)].map(() => false);

  let counter = 0;
  let curTech = 0;

  while (counter < m && curTech < n) {
    const i = getFurthestJob(
      technicians[curTech].curLocation,
      coordinates,
      added
    );
    groups[curTech].push(coordinates[i]);
    if (groups[curTech].length === max) {
      technicians[curTech].maxCap = true;
    }
    technicians[curTech].curLocation = coordinates[i];
    counter++;

    curTech++;
  }
  curTech = curTech % n;
  while (counter < m && technicians.some((tech) => !tech.maxCap)) {
    if (!technicians.maxCap) {
      const i = getClosestJob(
        technicians[curTech].curLocation,
        coordinates,
        added
      );
      groups[curTech].push(coordinates[i]);
      if (groups[curTech].length === max) {
        technicians[curTech].maxCap = true;
      }
      technicians[curTech].curLocation = coordinates[i];
      counter++;
    }
    curTech = (curTech + 1) % n;
  }
  added.forEach((el, i) => {
    if (!el) {
      groups[n].push(coordinates[i]);
    }
  });

  return groups;
}
