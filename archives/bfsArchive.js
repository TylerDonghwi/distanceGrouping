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
