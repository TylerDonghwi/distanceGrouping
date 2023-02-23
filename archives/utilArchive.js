// O(n)
function getClosestJob(technician, coordinates, added) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  const closestIndex = coordinates.reduce((minIndex, coordinate, i) => {
    if (added[i]) return minIndex;
    let curDistance = getDistance(technician.curLocation, coordinate);
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
  if (technician.travel === 0) {
    technician.initialTravel = minDistance;
  }
  technician.travel += minDistance;
  return closestIndex;
}
// O(n)
function getFurthestJob(technician, coordinates, added) {
  let maxDistance = Number.MIN_SAFE_INTEGER;
  const furthestIndex = coordinates.reduce((maxIndex, coordinate, i) => {
    if (added[i]) return maxIndex;
    let curDistance = getDistance(technician.curLocation, coordinate);
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
  if (technician.travel === 0) {
    technician.initialTravel = maxDistance;
  }
  technician.travel += maxDistance;
  return furthestIndex;
}
