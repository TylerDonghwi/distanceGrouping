//
// K means clustering with evenly distributed start points
// Faster but less accurate
//

function groupEvenlySpreadKMean(coordinates, max, n) {
  const { groups, technicians, added } = initialSetUp(coordinates, n);

  coordinates.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  const startPoints = getEvenStarts(coordinates, n, groups, added);

  // edge case handling, may end up as legacy
  if (max === 1) {
    return {
      groups,
      travels: technicians.map((tech) => tech.travel),
      initialTravels: technicians.map((tech) => tech.initialTravel),
    };
  }

  coordinates.forEach((coor, i) => {
    if (added[i]) return;
    const index = closestTech(coordinates, i, startPoints, technicians);
    if (index === -1) return;
    groups[index].push(coor);
    added[i] = true;
    technicians[index].maxCap = groups[index].length >= max;
  });
  added.forEach((el, i) => {
    if (!el) {
      groups[n].push(coordinates[i]);
    }
  });

  return {
    groups,
    travels: technicians.map((tech) => tech.travel),
    initialTravels: technicians.map((tech) => tech.initialTravel),
  };
}

function getEvenStarts(coordinates, n, groups, added) {
  // O(n)
  const { width, height, leftmost, topmost } = getBoundaries(coordinates);

  const res = [];

  // O(n / log n)
  let num = n;
  let x = Math.ceil(Math.sqrt(n));
  const rows = [];
  while (num > 0) {
    let i = Math.min(x, num);
    rows.push(i);
    num -= i;
  }
  let av = (rows[0] + rows.at(-1)) / 2;
  rows[0] = Math.ceil(av);
  rows[rows.length - 1] = Math.floor(av);

  let yIncrement = height / (2 * rows.length);
  // O(number of technicians * n)
  rows.forEach((row, i) => {
    let xIncrement = width / (2 * row);
    [...Array(row)].forEach((_, j) => {
      let coor = [
        leftmost + (2 * j + 1) * xIncrement,
        topmost + (2 * i + 1) * yIncrement,
      ];
      const x = getClosestJob(coor, coordinates, added);
      if (x === -1) return;
      added[x] = true;
      groups[i * row + j].push(coordinates[x]);
      res.push(x);
    });
  });
  return res;
}

// O(n)
function getBoundaries(coordinates) {
  const xCoords = coordinates.map((coord) => coord[0]);
  const leftmost = Math.min(...xCoords);
  const rightmost = Math.max(...xCoords);

  const yCoords = coordinates.map((coord) => coord[1]);
  const topmost = Math.min(...yCoords);
  const bottommost = Math.max(...yCoords);

  const width = rightmost - leftmost;
  const height = bottommost - topmost;

  return { width, height, leftmost, topmost };
}

// O(n)
function getClosestJob(curLocation, coordinates, added) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  const closestIndex = coordinates.reduce((minIndex, coordinate, i) => {
    if (added[i]) return minIndex;
    let curDistance = getDistance(curLocation, coordinate);
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
