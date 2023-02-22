// O(n^2)
// BFS approach
// Start From the Center and get the closest job then from that location find the nearest jobs
function groupCenterBFS(coordinates, max, n) {
  const { m, groups, technicians, added } = initialSetUp(coordinates, n);

  let counter = 0;
  let curTech = 0;

  while (counter < m && technicians.some((tech) => !tech.maxCap)) {
    if (!technicians.maxCap) {
      const i = getClosestJob(technicians[curTech], coordinates, added);
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

  return {
    groups,
    travels: technicians.map((tech) => tech.travel),
    initialTravels: technicians.map((tech) => tech.initialTravel),
  };
}

// O(n^2)
// BFS approach
// Do the first iteration with the furthest, from there find the closest job from there
function groupCornerBFS(coordinates, max, n) {
  max = Math.max(1, max);
  const { m, groups, technicians, added } = initialSetUp(coordinates, n);

  let counter = 0;
  let curTech = 0;

  while (counter < m && curTech < n) {
    const i = getFurthestJob(technicians[curTech], coordinates, added);
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
      const i = getClosestJob(technicians[curTech], coordinates, added);
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
  return {
    groups,
    travels: technicians.map((tech) => tech.travel),
    initialTravels: technicians.map((tech) => tech.initialTravel),
  };
}

// O(n^2)
// DFS approach
// Pros more accurate grouping
// Cons not perfect grouping, not equal distribution of work
function groupCenterDFS(coordinates, max, n) {
  const { m, groups, technicians, added } = initialSetUp(coordinates, n);

  let counter = 0;
  let curTech = 0;

  while (counter < m && curTech < n - 1) {
    while (groups[curTech].length < max && counter < m) {
      const i = getClosestJob(technicians[curTech], coordinates, added);
      groups[curTech].push(coordinates[i]);
      technicians[curTech].curLocation = coordinates[i];
      counter++;
    }
    curTech++;
  }
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

// Purpose: Increase accuracy of grouping
// Process: instead of following the current location, get the bound and add it if the job is in the range
// Outcome: slower as it needs to filter the range
function groupCornerDFSRange(coordinates, max, n) {
  const { m, groups, technicians, added } = initialSetUp(coordinates, n);
  max = m > max * n ? max : Math.ceil(m / n);

  let counter = 0;
  let curTech = 0;

  // Iterates m or n * max times
  while (counter < m && curTech < n) {
    const i = getFurthestJob(technicians[curTech], coordinates, added);
    groups[curTech].push(coordinates[i]);
    technicians[curTech].curLocation = coordinates[i];
    counter++;

    // Filtering takes O(m)
    const newCoors = coordinates.filter((coor) =>
      coorInRange(coor, technicians[curTech].curLocation)
    );
    // Iterate max times
    while (groups[curTech].length < max && counter < m) {
      // Slower O(m^2) to get the cloest job that is also in range (might be able to refactor to O())
      const i = getClosestJobInRange(
        technicians[curTech],
        coordinates,
        newCoors,
        added
      );
      if (i === -1) break;
      groups[curTech].push(coordinates[i]);
      counter++;
    }
    curTech++;
  }
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
