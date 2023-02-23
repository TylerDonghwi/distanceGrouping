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

// O(n^2)
// DFS
// Start furthest from the center
// cons the later vans need to travel more
function groupCornerDFS(coordinates, max, n) {
  const { m, groups, technicians, added } = initialSetUp(coordinates, n);
  max = m > max * n ? max : Math.ceil(m / n);

  let counter = 0;
  let curTech = 0;

  while (counter < m && curTech < n) {
    const i = getFurthestJob(technicians[curTech], coordinates, added);
    groups[curTech].push(coordinates[i]);
    technicians[curTech].curLocation = coordinates[i];
    counter++;

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
