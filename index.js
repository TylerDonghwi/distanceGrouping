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
    [8, 19],
    [5, 1],
    [7, 11],
    [15, 19],
    [11, 4],
    [11, 1],
    [8, 4],
    [3, 13],
    [8, 4],
    [14, 18],
    [18, 3],
    [6, 8],
    [17, 12],
    [11, 13],
    [14, 19],
    [13, 6],
    [15, 5],
    [12, 5],
    [10, 12],
    [8, 6],
    [0, 12],
    [6, 16],
    [0, 13],
    [15, 2],
    [4, 18],
    [8, 9],
    [11, 14],
    [17, 14],
    [10, 14],
    [15, 4],
    [18, 1],
    [4, 6],
    [12, 1],
    [7, 1],
    [1, 9],
  ],
  [
    [0, 14],
    [3, 19],
    [18, 12],
    [9, 16],
    [5, 17],
    [19, 19],
    [7, 2],
    [0, 18],
    [17, 13],
    [15, 0],
    [12, 0],
    [6, 16],
    [13, 1],
    [2, 10],
    [5, 9],
    [13, 12],
    [11, 10],
    [4, 3],
    [12, 8],
    [10, 6],
    [2, 7],
    [17, 2],
    [19, 7],
    [9, 17],
    [2, 9],
    [0, 8],
    [1, 12],
    [17, 9],
    [3, 9],
    [9, 19],
    [9, 1],
    [14, 10],
    [13, 0],
    [9, 6],
    [7, 5],
    [3, 2],
    [13, 8],
    [19, 14],
    [15, 3],
    [11, 12],
  ],
  [
    [11, 1],
    [15, 7],
    [10, 16],
    [16, 13],
    [11, 12],
    [17, 6],
    [18, 3],
    [2, 15],
    [19, 9],
    [10, 2],
    [1, 0],
    [14, 2],
    [11, 10],
    [18, 18],
  ],
  [
    [7, 16],
    [16, 8],
    [19, 17],
    [1, 10],
    [2, 9],
    [18, 17],
    [12, 1],
    [10, 6],
    [12, 19],
    [9, 8],
    [4, 3],
    [6, 13],
    [7, 6],
    [1, 19],
    [9, 5],
    [17, 4],
    [5, 13],
    [19, 14],
    [17, 2],
    [10, 16],
    [5, 19],
    [0, 19],
    [4, 14],
    [4, 0],
    [19, 12],
    [12, 3],
    [14, 11],
    [10, 9],
    [3, 1],
    [10, 3],
    [18, 3],
    [17, 9],
    [18, 16],
    [17, 5],
    [2, 4],
    [7, 0],
    [16, 12],
    [15, 3],
    [7, 19],
    [16, 8],
  ],
  [
    [3, 3],
    [19, 5],
    [6, 9],
    [9, 18],
    [19, 4],
    [9, 4],
    [4, 17],
  ],
  [
    [4, 12],
    [19, 0],
    [6, 0],
    [13, 17],
    [0, 9],
    [19, 6],
    [10, 19],
    [0, 17],
    [16, 19],
    [11, 13],
    [15, 19],
    [0, 19],
    [9, 0],
    [7, 1],
    [18, 1],
    [3, 19],
    [14, 13],
    [11, 16],
    [17, 9],
    [10, 18],
    [18, 18],
    [1, 10],
    [7, 18],
    [3, 2],
  ],
  [
    [13, 6],
    [10, 17],
    [0, 2],
    [13, 15],
    [4, 12],
    [0, 5],
    [7, 12],
    [17, 1],
    [14, 14],
    [1, 6],
  ],
  [
    [2, 16],
    [14, 11],
    [18, 2],
    [9, 16],
    [10, 19],
    [10, 11],
  ],
  [
    [11, 18],
    [13, 19],
    [3, 2],
    [19, 12],
    [15, 10],
    [9, 1],
    [15, 0],
    [15, 9],
    [11, 8],
    [8, 11],
    [2, 12],
    [3, 2],
    [8, 10],
    [3, 12],
    [4, 16],
    [16, 3],
    [5, 2],
    [0, 4],
    [17, 9],
    [11, 10],
    [6, 7],
    [18, 9],
    [12, 4],
    [5, 18],
    [4, 9],
    [19, 11],
    [19, 9],
    [11, 6],
    [1, 14],
    [11, 8],
    [18, 8],
  ],
  [
    [15, 5],
    [6, 8],
    [15, 17],
    [12, 19],
    [17, 14],
    [18, 4],
    [6, 1],
    [15, 6],
    [1, 16],
    [1, 0],
    [1, 6],
    [14, 9],
    [1, 6],
    [17, 6],
    [8, 3],
    [13, 10],
    [3, 10],
    [1, 18],
    [7, 17],
    [4, 5],
    [13, 5],
  ],
  [
    [13, 0],
    [16, 1],
    [10, 9],
    [6, 11],
    [12, 12],
    [15, 15],
    [8, 12],
    [17, 15],
    [17, 0],
    [5, 8],
    [0, 3],
    [14, 5],
    [10, 18],
    [7, 7],
  ],
  [
    [4, 6],
    [2, 8],
    [2, 1],
    [14, 10],
    [6, 1],
    [17, 5],
    [15, 12],
    [18, 13],
    [9, 9],
    [9, 19],
    [18, 18],
    [18, 2],
    [17, 12],
    [9, 16],
    [2, 2],
    [8, 14],
    [12, 1],
    [10, 15],
    [12, 8],
    [9, 4],
    [13, 0],
    [9, 7],
    [9, 10],
    [11, 3],
    [9, 6],
    [13, 19],
    [11, 7],
    [7, 5],
    [16, 8],
    [11, 6],
    [12, 2],
  ],
  [
    [18, 18],
    [8, 1],
    [0, 3],
    [7, 0],
    [8, 0],
    [3, 11],
    [7, 3],
    [0, 11],
    [8, 10],
    [2, 7],
    [19, 8],
    [12, 3],
    [14, 5],
    [19, 0],
    [7, 17],
  ],
  [
    [12, 0],
    [14, 15],
    [7, 14],
    [9, 3],
    [6, 1],
    [5, 3],
    [15, 0],
    [6, 19],
    [4, 17],
    [18, 2],
    [8, 1],
  ],
  [
    [6, 19],
    [18, 13],
    [13, 6],
    [10, 16],
    [17, 0],
    [16, 18],
    [13, 2],
    [8, 19],
    [15, 11],
    [16, 9],
    [8, 16],
    [4, 2],
    [2, 19],
    [0, 14],
    [12, 13],
    [3, 13],
    [9, 17],
    [3, 8],
    [18, 14],
    [19, 1],
    [5, 7],
    [14, 13],
    [19, 2],
    [5, 4],
    [12, 3],
    [19, 8],
    [11, 8],
    [12, 7],
    [2, 4],
    [16, 10],
    [8, 6],
  ],
  [
    [3, 11],
    [19, 11],
    [19, 10],
    [10, 15],
    [3, 15],
    [12, 3],
    [13, 6],
    [16, 2],
    [16, 15],
    [5, 3],
  ],
  [
    [19, 7],
    [9, 0],
    [9, 16],
    [7, 7],
    [7, 17],
    [1, 16],
    [1, 19],
    [15, 9],
    [2, 10],
    [9, 8],
    [2, 15],
    [19, 4],
    [16, 6],
    [16, 12],
    [15, 13],
    [19, 5],
    [17, 6],
    [12, 19],
    [2, 7],
    [12, 4],
    [1, 18],
    [6, 18],
    [8, 4],
    [8, 5],
    [8, 18],
    [14, 3],
    [7, 8],
    [18, 6],
    [0, 10],
    [5, 1],
    [10, 4],
    [14, 10],
    [16, 0],
    [3, 3],
    [9, 15],
    [17, 14],
    [16, 13],
    [1, 3],
    [17, 14],
  ],
  [
    [7, 16],
    [15, 4],
    [3, 2],
    [17, 11],
    [6, 0],
    [18, 0],
    [11, 9],
    [2, 7],
  ],
  [
    [12, 7],
    [16, 8],
    [13, 5],
    [11, 9],
    [17, 19],
    [2, 11],
    [3, 4],
    [16, 12],
    [2, 4],
    [3, 13],
    [18, 5],
  ],
  [
    [18, 18],
    [5, 1],
    [10, 6],
    [2, 8],
    [8, 13],
    [18, 17],
    [1, 12],
    [0, 12],
    [13, 19],
  ],
  [
    [17, 19],
    [3, 11],
    [19, 1],
    [18, 16],
    [11, 4],
    [1, 15],
    [2, 15],
    [18, 5],
    [13, 9],
    [14, 0],
    [13, 6],
    [10, 12],
  ],
  [
    [10, 18],
    [16, 5],
    [17, 2],
    [11, 14],
    [3, 11],
    [19, 9],
    [7, 15],
    [19, 10],
    [10, 14],
    [13, 14],
    [7, 8],
    [3, 0],
    [17, 0],
    [11, 4],
    [8, 1],
    [3, 1],
    [17, 15],
    [3, 11],
    [2, 17],
    [18, 18],
    [1, 14],
  ],
  [
    [6, 17],
    [5, 4],
    [5, 11],
    [5, 4],
    [11, 2],
    [12, 7],
    [7, 19],
    [12, 11],
    [14, 19],
    [3, 0],
    [12, 8],
    [5, 1],
    [0, 17],
    [4, 2],
    [8, 19],
    [8, 9],
    [10, 14],
    [1, 6],
  ],
  [
    [1, 4],
    [14, 15],
    [18, 3],
    [10, 6],
    [4, 7],
    [14, 8],
    [4, 1],
    [6, 15],
    [7, 18],
    [18, 16],
    [8, 2],
    [15, 12],
    [3, 10],
    [8, 4],
    [11, 9],
    [2, 0],
    [1, 5],
    [4, 11],
    [15, 8],
    [6, 3],
    [10, 11],
    [4, 6],
    [19, 15],
    [16, 5],
    [17, 6],
    [9, 3],
    [15, 6],
    [19, 1],
    [15, 4],
    [14, 17],
    [18, 5],
    [13, 8],
    [8, 4],
    [11, 5],
    [15, 13],
    [12, 8],
    [18, 0],
    [8, 8],
  ],
  [
    [6, 6],
    [1, 13],
    [19, 0],
    [15, 15],
    [5, 0],
    [5, 1],
    [7, 10],
    [9, 3],
    [0, 5],
    [13, 9],
    [10, 0],
    [3, 9],
    [10, 7],
    [7, 0],
    [17, 12],
    [13, 19],
    [14, 15],
    [8, 19],
    [1, 15],
    [7, 2],
    [19, 9],
    [2, 19],
    [10, 16],
    [5, 16],
  ],
  [
    [10, 4],
    [5, 19],
    [2, 7],
    [18, 6],
    [6, 6],
    [2, 17],
    [5, 13],
    [4, 4],
    [18, 15],
    [9, 3],
    [1, 7],
    [8, 15],
    [8, 3],
    [18, 17],
    [5, 16],
    [5, 5],
    [5, 11],
    [7, 12],
    [1, 4],
    [19, 15],
    [17, 0],
    [13, 1],
    [5, 16],
    [17, 4],
    [2, 12],
  ],
  [
    [7, 2],
    [4, 0],
    [10, 17],
    [14, 14],
    [3, 12],
    [9, 11],
    [1, 2],
    [4, 7],
    [9, 9],
    [19, 5],
    [5, 5],
    [19, 3],
    [18, 15],
    [2, 4],
    [15, 10],
    [5, 14],
    [19, 15],
    [14, 4],
    [6, 4],
    [9, 9],
    [17, 3],
    [14, 11],
    [8, 4],
    [9, 19],
    [9, 2],
    [4, 15],
    [2, 0],
    [8, 1],
    [11, 14],
    [5, 7],
    [13, 0],
    [6, 2],
    [0, 12],
    [12, 13],
    [14, 11],
    [2, 9],
    [11, 5],
    [8, 4],
    [1, 2],
  ],
  [
    [0, 3],
    [11, 18],
    [9, 10],
    [16, 4],
    [5, 0],
    [4, 14],
    [0, 2],
    [15, 17],
    [6, 0],
    [1, 9],
    [5, 0],
    [4, 13],
    [1, 11],
    [13, 11],
    [12, 3],
    [5, 12],
    [1, 16],
    [16, 0],
    [5, 3],
    [6, 16],
    [0, 16],
    [16, 5],
    [10, 6],
    [5, 1],
    [8, 9],
    [17, 16],
    [19, 9],
    [11, 7],
    [7, 5],
    [8, 0],
    [9, 17],
    [17, 16],
    [6, 19],
    [0, 17],
    [9, 8],
    [10, 9],
    [13, 2],
    [1, 3],
    [19, 7],
    [6, 12],
  ],
  [
    [1, 13],
    [4, 10],
    [17, 18],
    [15, 11],
    [1, 19],
    [13, 5],
    [8, 13],
    [16, 17],
    [15, 12],
    [6, 8],
    [12, 7],
    [8, 10],
    [3, 5],
    [2, 14],
    [17, 19],
    [17, 4],
    [9, 13],
    [5, 7],
    [11, 6],
    [15, 11],
    [18, 8],
    [15, 13],
    [19, 10],
    [15, 15],
    [2, 17],
    [2, 5],
    [15, 18],
    [5, 12],
    [14, 0],
    [4, 1],
    [18, 14],
    [4, 18],
    [14, 9],
    [3, 6],
  ],
  [
    [14, 19],
    [0, 14],
    [0, 4],
    [0, 6],
    [15, 18],
    [7, 0],
    [6, 5],
    [6, 18],
    [10, 0],
    [17, 17],
    [4, 14],
    [14, 12],
    [6, 11],
  ],
  [
    [10, 2],
    [4, 15],
    [5, 6],
    [15, 0],
    [5, 12],
    [4, 1],
    [1, 0],
    [11, 2],
    [12, 18],
    [8, 16],
    [2, 13],
    [15, 12],
    [19, 17],
    [11, 11],
    [2, 16],
    [2, 3],
    [4, 14],
    [14, 11],
    [9, 7],
    [3, 16],
    [5, 19],
    [0, 2],
    [18, 4],
    [16, 18],
    [8, 11],
    [15, 6],
    [4, 0],
    [16, 6],
    [10, 11],
    [1, 19],
    [3, 3],
    [18, 6],
    [14, 8],
    [11, 8],
    [3, 15],
    [19, 14],
    [9, 2],
  ],
  [
    [6, 7],
    [18, 7],
    [6, 14],
    [1, 12],
    [6, 15],
    [4, 8],
    [5, 5],
    [0, 0],
    [4, 14],
    [5, 2],
    [19, 13],
    [8, 17],
    [1, 14],
    [8, 13],
    [13, 12],
    [4, 9],
    [5, 10],
    [17, 18],
    [0, 9],
    [8, 15],
    [2, 19],
  ],
  [
    [8, 2],
    [4, 2],
    [17, 5],
    [4, 17],
    [2, 2],
    [17, 15],
    [6, 3],
    [2, 11],
    [0, 5],
    [15, 15],
    [6, 15],
    [13, 14],
    [10, 1],
    [6, 19],
    [11, 12],
    [17, 9],
    [15, 2],
    [15, 15],
    [16, 15],
    [13, 7],
    [6, 12],
    [0, 15],
    [5, 18],
    [14, 0],
    [18, 8],
    [16, 0],
    [9, 1],
    [7, 9],
    [15, 5],
    [6, 2],
    [14, 8],
    [1, 10],
    [15, 15],
    [2, 4],
    [9, 4],
    [7, 12],
    [0, 19],
    [11, 8],
    [18, 13],
    [17, 4],
  ],
  [
    [16, 11],
    [0, 11],
    [10, 14],
    [12, 14],
    [4, 15],
    [0, 10],
    [4, 17],
    [4, 15],
    [18, 0],
    [14, 13],
    [0, 16],
    [12, 17],
    [8, 6],
    [4, 13],
    [15, 10],
    [13, 2],
    [6, 16],
    [2, 10],
    [12, 1],
    [3, 14],
    [14, 2],
    [17, 7],
    [17, 12],
    [5, 11],
    [16, 0],
    [11, 13],
    [12, 18],
  ],
  [
    [0, 15],
    [14, 1],
    [3, 12],
    [10, 7],
    [16, 2],
    [2, 13],
    [13, 12],
    [5, 18],
    [8, 7],
    [15, 14],
    [2, 4],
    [8, 19],
    [0, 5],
    [7, 3],
    [2, 5],
    [1, 18],
    [4, 9],
    [6, 18],
    [17, 4],
    [4, 1],
    [7, 18],
    [15, 10],
    [8, 14],
    [15, 17],
    [4, 7],
    [19, 9],
    [2, 10],
    [9, 1],
    [2, 17],
    [15, 15],
    [10, 14],
  ],
  [
    [2, 2],
    [16, 15],
    [18, 1],
    [18, 14],
    [3, 0],
    [7, 0],
    [15, 10],
    [1, 1],
    [16, 14],
    [4, 15],
    [18, 9],
    [1, 6],
    [4, 0],
    [7, 2],
    [15, 4],
    [1, 15],
  ],
  [
    [12, 0],
    [8, 10],
    [19, 7],
    [17, 8],
    [5, 11],
    [9, 5],
    [4, 9],
    [19, 7],
    [16, 9],
    [9, 15],
    [13, 0],
    [10, 18],
    [1, 7],
    [16, 17],
    [16, 6],
    [2, 18],
    [17, 3],
    [18, 0],
    [10, 13],
    [6, 18],
    [7, 6],
    [7, 18],
    [15, 9],
    [4, 5],
  ],
  [
    [17, 10],
    [11, 15],
    [7, 8],
    [11, 19],
    [11, 6],
    [10, 1],
    [12, 13],
    [9, 12],
  ],
  [
    [12, 2],
    [19, 8],
    [18, 9],
    [3, 19],
    [0, 5],
    [12, 9],
    [6, 11],
    [1, 9],
    [9, 6],
    [12, 18],
    [12, 13],
    [14, 16],
    [15, 16],
    [18, 4],
    [11, 0],
    [0, 2],
    [18, 9],
    [19, 17],
    [1, 16],
    [2, 2],
    [9, 13],
    [16, 3],
    [18, 10],
    [2, 3],
    [18, 0],
    [2, 6],
    [3, 2],
    [5, 19],
    [18, 19],
    [18, 15],
    [4, 13],
    [7, 6],
    [10, 0],
    [14, 3],
    [12, 12],
    [10, 15],
    [3, 0],
    [1, 8],
    [6, 15],
    [8, 9],
  ],
  [
    [8, 11],
    [4, 3],
    [2, 13],
    [18, 15],
    [10, 8],
    [14, 16],
    [12, 1],
    [5, 18],
    [2, 5],
    [3, 14],
    [13, 2],
    [9, 3],
    [11, 4],
    [17, 12],
    [16, 13],
    [10, 11],
    [18, 6],
    [7, 13],
    [11, 8],
    [4, 15],
    [15, 16],
    [6, 11],
    [5, 6],
    [14, 19],
    [12, 7],
    [6, 11],
    [17, 11],
    [6, 13],
    [5, 12],
    [14, 3],
    [19, 18],
    [0, 9],
    [12, 16],
  ],
  [
    [15, 14],
    [19, 8],
    [17, 15],
    [14, 2],
    [13, 2],
    [17, 3],
    [4, 0],
    [11, 6],
    [14, 2],
    [13, 15],
    [11, 5],
    [4, 1],
    [8, 2],
    [3, 16],
    [2, 18],
    [0, 13],
  ],
  [
    [3, 7],
    [11, 9],
    [1, 6],
    [7, 19],
    [9, 12],
    [6, 13],
    [10, 3],
    [13, 1],
    [16, 13],
    [0, 8],
    [0, 9],
    [1, 10],
    [7, 19],
    [13, 9],
    [15, 7],
    [13, 6],
    [5, 6],
    [10, 13],
    [13, 9],
    [5, 16],
    [19, 0],
    [1, 18],
    [18, 2],
    [0, 10],
    [2, 0],
    [13, 10],
    [16, 7],
    [15, 16],
    [11, 18],
    [5, 7],
    [10, 16],
    [12, 14],
    [8, 3],
    [12, 3],
    [9, 14],
    [7, 6],
    [19, 7],
    [13, 18],
    [2, 19],
  ],
  [
    [14, 15],
    [14, 13],
    [1, 7],
    [2, 15],
    [17, 16],
    [12, 18],
    [7, 9],
    [17, 11],
    [3, 8],
    [0, 6],
    [4, 16],
    [17, 4],
    [7, 1],
    [3, 17],
    [9, 2],
    [16, 3],
    [8, 14],
    [15, 0],
    [19, 16],
    [18, 8],
    [8, 6],
    [11, 18],
    [16, 16],
    [19, 4],
    [4, 15],
    [7, 1],
    [0, 1],
    [2, 8],
  ],
  [
    [6, 18],
    [5, 6],
    [19, 9],
    [13, 19],
    [7, 11],
    [19, 5],
    [14, 5],
    [15, 16],
    [12, 10],
    [12, 5],
    [4, 18],
    [19, 3],
    [18, 13],
    [3, 2],
    [7, 19],
    [19, 7],
    [8, 8],
    [18, 9],
    [9, 9],
    [10, 12],
    [1, 3],
    [8, 1],
    [8, 1],
    [13, 19],
    [9, 1],
    [19, 19],
    [4, 8],
    [8, 17],
    [5, 8],
  ],
  [
    [12, 10],
    [0, 15],
    [8, 4],
    [1, 10],
    [4, 10],
    [6, 9],
    [10, 4],
  ],
  [
    [12, 15],
    [16, 15],
    [1, 16],
    [19, 15],
    [1, 1],
    [12, 4],
    [14, 2],
    [6, 3],
    [14, 8],
    [6, 18],
    [1, 16],
    [15, 15],
    [8, 2],
    [11, 8],
    [1, 0],
    [1, 0],
    [8, 12],
    [17, 14],
    [9, 7],
    [9, 17],
    [10, 2],
    [18, 19],
    [15, 13],
    [12, 17],
    [10, 2],
    [8, 8],
    [11, 15],
  ],
  [
    [17, 13],
    [15, 15],
    [3, 14],
    [18, 5],
    [18, 6],
    [3, 5],
    [10, 1],
    [18, 6],
    [12, 15],
    [11, 10],
    [0, 11],
    [8, 0],
    [5, 4],
    [5, 2],
    [10, 2],
    [16, 14],
    [15, 0],
    [14, 7],
    [4, 5],
    [0, 17],
    [14, 7],
    [9, 13],
    [9, 16],
    [7, 3],
    [13, 8],
    [11, 7],
    [5, 9],
    [1, 13],
    [13, 8],
    [14, 7],
  ],
  [
    [15, 0],
    [4, 1],
    [1, 10],
    [17, 15],
    [9, 19],
    [15, 19],
    [1, 8],
    [16, 6],
    [13, 0],
    [17, 17],
    [19, 3],
    [18, 13],
    [7, 10],
    [10, 16],
    [8, 11],
    [11, 2],
    [14, 10],
    [10, 2],
    [2, 14],
    [14, 3],
    [11, 12],
    [19, 6],
    [3, 10],
    [2, 4],
    [14, 17],
    [3, 17],
    [8, 7],
    [15, 19],
    [9, 12],
    [1, 7],
    [17, 14],
  ],
  [
    [4, 4],
    [5, 12],
    [11, 9],
    [0, 8],
    [13, 19],
    [9, 7],
    [17, 14],
    [19, 2],
    [5, 19],
    [13, 9],
    [17, 0],
    [4, 15],
    [19, 2],
    [5, 9],
    [9, 6],
    [13, 9],
    [5, 16],
    [7, 2],
    [18, 14],
    [1, 17],
    [1, 10],
    [8, 12],
    [9, 2],
    [3, 14],
    [13, 11],
    [6, 17],
    [9, 13],
    [17, 2],
    [16, 8],
    [6, 18],
    [13, 1],
    [1, 10],
    [0, 3],
    [17, 8],
  ],
  [
    [14, 3],
    [14, 12],
    [16, 7],
    [1, 13],
    [10, 6],
    [4, 3],
    [11, 13],
    [12, 6],
    [14, 10],
    [10, 2],
    [16, 5],
    [4, 18],
    [17, 12],
    [14, 7],
    [13, 9],
    [3, 1],
    [18, 6],
    [8, 17],
    [17, 7],
    [1, 1],
    [16, 14],
    [5, 6],
    [12, 10],
    [7, 0],
    [12, 12],
    [3, 5],
    [16, 19],
    [12, 8],
  ],
];
const meths = [groupStartClose, groupStartFarEnd, groupDFS];

// console.time("timer");
test(tests);
// console.timeEnd("timer");

//
// Display Zone
//
function display(coor, i, max, n, x) {
  const parent = document.createElement("div");
  parent.style.display = "flex";

  const { groups, travels } = meths[x](coor, max, n);
  visualiseCoordinates(coor, groups, parent);

  const ul = document.createElement("ul");
  addLi(ul, `Index: ${i}, Num jobs: ${coor.length}`);
  addLi(ul, `MaxCap: ${max}, Num Technicians: ${n}`);
  addLi(ul, `Function Number: ${x}`);
  addLi(
    ul,
    `Coordinates: ${coor
      .map((element) => `[${element[0]}, ${element[1]}]`)
      .join(", ")}`
  );
  addLi(ul, "");

  groups
    .map((group) =>
      group.map((element) => `[${element[0]}, ${element[1]}]`).join(", ")
    )
    .forEach((group, i) => {
      addLi(
        ul,
        i === groups.length - 1
          ? "overflow: 0, None Assigned"
          : `${colors[i + 3]}: ${Math.floor(travels[i])}, ${group}`
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
function visualiseCoordinates(coordinates, groups, parent) {
  const [y, x] = getXY(coordinates);

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
  table.style.minWidth = "65vw";
  table.style.minHeight = "47.5vh";

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
function generateTests() {
  const tests = [];
  for (let i = 0; i < 50; i++) {
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
function test(tests) {
  tests.forEach((coor, i) => {
    let meth = -1;
    meths.reduce((minTot, _, x) => {
      const curTot = display(coor, i, 4, 8, x);
      if (curTot < minTot) {
        meth = x;
        return curTot;
      }
    }, Number.MAX_SAFE_INTEGER);
    console.log(`Function ${meth} has the shortest total distance traveled`);
  });
}

//
// DISTANCE UTILITY FUNCTIONS
//
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
  technician.travel += maxDistance;
  return furthestIndex;
}
// O(1)
function getDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

//
// SETUP UTILITY FUNCTIONS
//
function initialSetUp(coordinates, n) {
  const [y, x] = getXY(coordinates);
  const m = coordinates.length;
  const groups = Array.from(Array(n + 1), () => []);
  const technicians = Array.from(Array(n), () => {
    return {
      maxCap: false,
      curLocation: [Math.floor(y / 2), Math.floor(x / 2)],
      travel: 0,
    };
  });
  const added = [...Array(m)].map(() => false);
  return { m, groups, technicians, added };
}
function getXY(coordinates) {
  return coordinates.reduce(
    (max, coordinate) => {
      return [Math.max(max[0], coordinate[0]), Math.max(max[1], coordinate[1])];
    },
    [0, 0]
  );
}

//
// Assigning Functions
//

// O(n^2)
// BFS approach
// Start From the Center and get the closest job then from that location find the nearest jobs
function groupStartClose(coordinates, max, n) {
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

  return { groups, travels: technicians.map((tech) => tech.travel) };
}

// O(n^2)
// BFS approach
// Do the first iteration with the furthest, from there find the closest job from there
function groupStartFarEnd(coordinates, max, n) {
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
  return { groups, travels: technicians.map((tech) => tech.travel) };
}

// O(n^2)
// DFS approach
function groupDFS(coordinates, max, n) {
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

  return { groups, travels: technicians.map((tech) => tech.travel) };
}
