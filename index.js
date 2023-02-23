const maxWeight = 8;
const n = 10;
const numIterations = 1000;

const colors = [
  "",
  "lightgray",
  "black",
  "orange",
  "yellow",
  "green",
  "pink",
  "cyan",
  "brown",
  "olive",
  "yellowGreen",
  "peachPuff",
  "salmon",
  "khaki",
  "thistle",
];
const tests = [
  [
    [-36.9020038, 174.7578935, Math.floor(Math.random() * 4) + 1],
    [-41.2911729, 174.7970831, Math.floor(Math.random() * 4) + 1],
    [-43.5151538, 172.6479433, Math.floor(Math.random() * 4) + 1],
    [-36.8818618, 174.750201, Math.floor(Math.random() * 4) + 1],
    [-36.7942876, 174.6605501, Math.floor(Math.random() * 4) + 1],
    [-36.902283, 174.8396365, Math.floor(Math.random() * 4) + 1],
    [-36.8948571, 174.8153186, Math.floor(Math.random() * 4) + 1],
    [-41.1539607, 174.9809583, Math.floor(Math.random() * 4) + 1],
    [-41.22773400000001, 174.8807125, Math.floor(Math.random() * 4) + 1],
    [-41.3187241, 174.8216688, Math.floor(Math.random() * 4) + 1],
    [-36.8720438, 174.609816, Math.floor(Math.random() * 4) + 1],
    [-36.8720438, 174.609816, Math.floor(Math.random() * 4) + 1],
    [-41.2089077, 174.9056448, Math.floor(Math.random() * 4) + 1],
    [-36.880712, 174.7513683, Math.floor(Math.random() * 4) + 1],
    [-36.812286, 174.6346072, Math.floor(Math.random() * 4) + 1],
    [-36.8230079, 174.6352204, Math.floor(Math.random() * 4) + 1],
    [-36.9201965, 174.7860347, Math.floor(Math.random() * 4) + 1],
    [-36.9237037, 174.7949032, Math.floor(Math.random() * 4) + 1],
    [-36.9683935, 174.8324668, Math.floor(Math.random() * 4) + 1],
    [-36.903619, 174.7634011, Math.floor(Math.random() * 4) + 1],
    [-43.5415986, 172.5804111, Math.floor(Math.random() * 4) + 1],
    [-36.9232304, 174.8302906, Math.floor(Math.random() * 4) + 1],
    [-36.9255603, 174.7847758, Math.floor(Math.random() * 4) + 1],
    [-36.8681201, 174.6987089, Math.floor(Math.random() * 4) + 1],
    [-36.9985805, 174.8727487, Math.floor(Math.random() * 4) + 1],
    [-36.895712, 174.6255309, Math.floor(Math.random() * 4) + 1],
    [-37.0517898, 174.8631455, Math.floor(Math.random() * 4) + 1],
    [-36.9232304, 174.8302906, Math.floor(Math.random() * 4) + 1],
    [-36.8953169, 174.68107, Math.floor(Math.random() * 4) + 1],
    [-36.868632, 174.7113698, Math.floor(Math.random() * 4) + 1],
    [-36.8882769, 174.6735535, Math.floor(Math.random() * 4) + 1],
    [-36.7255477, 174.7449787, Math.floor(Math.random() * 4) + 1],
    [-36.9032209, 174.6574038, Math.floor(Math.random() * 4) + 1],
    [-36.9224744, 174.7511624, Math.floor(Math.random() * 4) + 1],
    [-36.9120967, 174.7494903, Math.floor(Math.random() * 4) + 1],
    [-43.51627209999999, 172.6166238, Math.floor(Math.random() * 4) + 1],
  ],
];
console.time("timer");
test(tests);
console.timeEnd("timer");

// Display Zone
function display(coor, i, max, n) {
  const parent = document.createElement("div");

  const { groups, travels, startPoints } = kMeanCluster(coor, max, n);

  // visualiseCoordinates(coor, groups, parent, startPoints);

  const ul = document.createElement("ul");
  addLi(ul, `Index: ${i}, NumJobs: ${coor.length}`);
  addLi(ul, `MaxCap: ${max}, Num Technicians: ${n}`);
  addLi(
    ul,
    `Coordinates: ${coor
      .map((element) => `[${element[0]}, ${element[1]}]`)
      .join(", ")}`
  );
  addLi(ul, "");

  const weights = groups.map((group) =>
    group.reduce((sum, coor) => sum + coor[2], 0)
  );

  groups
    .map((group) =>
      group.map((element) => `[${element[0]}, ${element[1]}]`).join(", ")
    )
    .forEach((group, i) => {
      addLi(
        ul,
        i === groups.length - 1
          ? `overflow: 0, ${group ? group : "None Assigned"}`
          : `${colors[i + 3]}: t: ${Math.floor(travels[i])}, w: ${
              weights[i]
            }, ${group}`
      );
    });

  const totalTravel = Math.floor(
    travels.reduce((total, travel) => total + travel, 0)
  );
  addLi(ul, "");
  addLi(ul, `Total Travel: ${totalTravel}`);

  parent.appendChild(ul);
  document.body.appendChild(parent);
  return totalTravel;
}
function visualiseCoordinates(coordinates, groups, parent, startPoints) {
  const [y, x] = getXY(coordinates);

  const groupArr = Array.from({ length: x + 1 }, () =>
    new Array(y + 1).fill(0)
  );
  const weightArr = Array.from({ length: x + 1 }, () =>
    new Array(y + 1).fill(0)
  );
  const startArr = Array.from({ length: x + 1 }, () =>
    new Array(y + 1).fill(0)
  );

  coordinates.forEach((coordinate, i) => {
    groupArr[coordinate[1]][coordinate[0]] = 1;
    weightArr[coordinate[1]][coordinate[0]] = coordinate[2];
    startArr[coordinate[1]][coordinate[0]] = startPoints.includes(i);
  });

  groups.forEach((group, i) => {
    group.forEach((location) => {
      groupArr[location[1]][location[0]] = i === groups.length - 1 ? 1 : i + 3;
    });
  });

  const table = document.createElement("table");

  for (let i = 0; i <= x; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= y; j++) {
      const cell = document.createElement("td");
      cell.textContent = `${j} ${i} ${weightArr[i][j]}`;
      cell.style.textAlign = "center";
      cell.style.backgroundColor = colors[groupArr[i][j]];
      cell.style.color = startArr[i][j] ? "black" : "gray";
      cell.style.fontWeight = startArr[i][j] ? "bold" : "";

      cell.style.border = "solid 1px black";
      cell.style.fontSize = "13px";
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
function generateTests() {
  const tests = [];
  for (let i = 0; i < 20; i++) {
    const coordinates = [];

    let size = Math.random() * 30 + 30;
    for (let i = 0; i < size; i++) {
      let x = Math.floor(Math.random() * 40);
      let y = Math.floor(Math.random() * 40);
      let z = Math.floor(Math.random() * 4) + 1;
      coordinates.push([x, y, z]);
    }
    tests.push("[" + coordinates.join("], [") + "]");
  }
  console.log("[" + tests.join("], [") + "]");
}
function test(tests) {
  tests.forEach((test, i) => display(test, i, maxWeight, n));
}

// K means clustering with x iterations with randomly chosen coordinates
// RUNTIME: O(number of iterations * number of jobs * number of technicians)

// Iterating multiple times to find the best K-means cluster
function kMeanCluster(coordinates, max, n) {
  let res;
  let minTravel = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < numIterations; i++) {
    const cur = getRandomKMean(coordinates, max, n);
    let curTravel = cur.travels.reduce((sum, travel) => sum + travel, 0);
    if (curTravel < minTravel) {
      res = cur;
      minTravel = curTravel;
    }
  }
  return res;
}

// Finding a random K mean cluster
function getRandomKMean(coordinates, max, n) {
  const { groups, technicians, added } = initialSetUp(coordinates, n);

  const startPoints = [];

  for (let i = 0; i < n; i++) {
    const rand = getRandomJob(coordinates, added);
    if (rand === -1) break;
    groups[i].push(coordinates[rand]);
    startPoints.push(rand);
    technicians[i].weight += coordinates[rand][2];
  }

  coordinates.forEach((coor, i) => {
    if (added[i]) return;
    const index = closestTech(coordinates, i, startPoints, technicians, max);
    if (index === -1) return;
    groups[index].push(coor);
    technicians[index].weight += coor[2];
    added[i] = true;
  });

  added.forEach((el, i) => {
    if (!el) {
      groups[n].push(coordinates[i]);
    }
  });

  return {
    groups,
    startPoints,
    travels: technicians.map((tech) => tech.travel),
  };
}
function initialSetUp(coordinates, n) {
  const [y, x] = getXY(coordinates);
  const m = coordinates.length;
  const groups = Array.from(Array(n + 1), () => []);
  const technicians = Array.from(Array(n), () => {
    return {
      curLocation: [Math.floor(y / 2), Math.floor(x / 2)],
      travel: 0,
      weight: 0,
    };
  });
  const added = [...Array(m)].map(() => false);
  return { m, groups, technicians, added };
}
// Returns the range of area that the coordinates are located
function getXY(coordinates) {
  return coordinates.reduce(
    (max, coordinate) => {
      return [Math.max(max[0], coordinate[0]), Math.max(max[1], coordinate[1])];
    },
    [0, 0]
  );
}

function getRandomJob(coordinates, added) {
  if (added.every((el) => el)) return -1;

  let rand = Math.floor(Math.random() * coordinates.length);
  while (added[rand]) {
    rand = Math.floor(Math.random() * coordinates.length);
  }
  added[rand] = true;
  return rand;
}
function closestTech(coordinates, x, startPoints, technicians, max) {
  const inits = startPoints.map((el) => coordinates[el]);
  let minDistance = Number.MAX_SAFE_INTEGER;

  const closest = inits.reduce((minIndex, init, i) => {
    if (technicians[i].weight + coordinates[x][2] > max) return minIndex;

    let curDistance = getDistance(init, coordinates[x]);
    if (curDistance < minDistance) {
      minDistance = curDistance;
      return i;
    }

    return minIndex;
  }, -1);

  if (closest !== -1) {
    technicians[closest].travel += minDistance;
  }

  return closest;
}
function getDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}
