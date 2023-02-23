// Each job is represented by an array of coordinates eg. [x, y]
// There are m number of jobs to do
// There are n number of technicians that can complete those jobs,
// There is a limit to a number of jobs that a technician can do, suppose it is defined as max,
// We want to assign each job to a technician such that the total distance traveled by technicians is minimum

// Ideally we want every technicians to have similar number of jobs
// If there is no more capacity left for any of the technicians, add the rest of the unassigned jobs to overflow and return as another group
// Every technician starts at the center of the map (arbitrary)

// Suppose there will be around 30 jobs
// O(n) = 30
// O(n^2) = 900
// O(n^3) = 27000
// O(n^4) = 810000
// O(n!) = 2.65e32
// from O(n) to O(n^3) will be acceptable

// Suppose there are m jobs and n technicians, there are m! / (n! * (m - n)!) potential start points
// if n = 7 and m = 30, there will be 2035800 potential combinations of start points
// Need to find the best start points without having to iterate all of them
