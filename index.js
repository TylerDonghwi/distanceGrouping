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
    [15, 6],
    [19, 3],
    [18, 6],
    [2, 13],
    [9, 12],
    [4, 3],
    [5, 11],
    [1, 9],
    [4, 16],
    [2, 8],
    [16, 17],
    [15, 0],
    [8, 11],
    [4, 14],
    [12, 0],
    [9, 3],
    [15, 11],
    [11, 12],
    [15, 2],
    [18, 10],
    [15, 15],
    [7, 18],
    [7, 1],
    [6, 3],
  ],
  [
    [10, 14],
    [6, 3],
    [1, 10],
    [7, 19],
    [4, 9],
    [4, 2],
    [18, 10],
    [15, 15],
    [0, 4],
    [12, 12],
    [15, 1],
    [0, 18],
    [17, 2],
    [11, 3],
    [15, 10],
    [17, 5],
    [10, 0],
    [8, 11],
    [0, 0],
    [0, 2],
    [1, 0],
    [17, 6],
    [6, 15],
    [0, 8],
    [19, 13],
    [19, 5],
    [16, 2],
    [6, 12],
    [5, 18],
    [19, 18],
  ],
  [
    [8, 7],
    [0, 6],
    [4, 8],
    [2, 13],
    [12, 1],
    [7, 5],
    [16, 18],
    [6, 17],
    [10, 7],
    [0, 5],
    [5, 11],
    [18, 1],
    [16, 4],
    [16, 14],
    [17, 2],
    [13, 0],
    [14, 15],
    [16, 1],
    [2, 14],
    [16, 13],
    [5, 3],
    [4, 4],
    [2, 12],
    [13, 16],
    [6, 1],
    [19, 14],
    [7, 4],
    [9, 14],
  ],
  [
    [15, 3],
    [11, 9],
    [14, 16],
    [13, 8],
    [2, 17],
    [13, 16],
    [2, 9],
    [9, 9],
    [0, 17],
    [4, 12],
    [13, 15],
    [7, 10],
    [7, 1],
    [8, 13],
    [19, 6],
    [13, 14],
    [4, 3],
    [7, 2],
    [6, 14],
    [7, 3],
    [10, 13],
    [0, 19],
    [13, 12],
    [13, 3],
    [5, 2],
    [4, 1],
    [19, 1],
    [16, 3],
    [3, 4],
    [8, 1],
    [14, 8],
    [2, 0],
  ],
  [
    [12, 2],
    [10, 15],
    [1, 1],
    [2, 18],
    [15, 8],
    [5, 5],
    [19, 8],
    [19, 11],
    [18, 4],
    [9, 8],
    [5, 17],
    [5, 5],
    [11, 10],
    [9, 13],
    [9, 6],
    [4, 6],
    [11, 4],
    [17, 5],
    [1, 2],
    [4, 3],
    [3, 11],
    [5, 11],
    [5, 14],
    [12, 11],
    [18, 15],
    [17, 15],
    [15, 12],
    [6, 15],
    [6, 5],
    [7, 9],
    [5, 11],
    [3, 5],
    [15, 1],
  ],
  [
    [12, 7],
    [8, 12],
    [16, 17],
    [18, 0],
    [10, 5],
    [10, 6],
    [8, 9],
    [19, 10],
    [8, 15],
    [17, 12],
    [9, 17],
    [5, 6],
    [7, 10],
    [1, 8],
    [8, 17],
    [3, 11],
    [6, 5],
    [18, 1],
    [2, 12],
    [16, 8],
    [7, 18],
    [9, 15],
    [0, 19],
    [0, 4],
    [3, 0],
    [13, 11],
    [12, 7],
    [13, 16],
    [11, 7],
  ],
  [
    [7, 19],
    [3, 10],
    [16, 13],
    [0, 11],
    [5, 19],
    [11, 9],
    [4, 0],
    [1, 9],
    [9, 14],
    [4, 8],
    [9, 6],
    [5, 12],
    [4, 8],
    [7, 0],
    [10, 17],
    [6, 4],
    [0, 17],
    [19, 3],
    [1, 5],
    [17, 8],
    [11, 1],
    [6, 7],
    [15, 3],
    [14, 6],
    [11, 13],
    [1, 13],
    [16, 14],
    [9, 8],
    [4, 2],
    [14, 18],
    [16, 16],
    [6, 2],
    [19, 10],
  ],
  [
    [9, 13],
    [2, 15],
    [4, 15],
    [11, 9],
    [17, 19],
    [3, 10],
    [8, 3],
    [13, 2],
    [6, 17],
    [8, 10],
    [19, 19],
    [14, 11],
    [9, 1],
    [1, 8],
    [3, 15],
    [2, 8],
    [19, 2],
    [5, 9],
    [14, 7],
    [9, 5],
    [17, 19],
    [12, 6],
    [3, 7],
    [4, 4],
    [8, 16],
    [12, 8],
    [6, 15],
    [7, 8],
    [3, 19],
  ],
  [
    [15, 7],
    [17, 1],
    [9, 14],
    [4, 17],
    [14, 9],
    [12, 0],
    [2, 6],
    [0, 7],
    [4, 11],
    [18, 12],
    [13, 14],
    [5, 14],
    [7, 2],
    [1, 10],
    [1, 8],
    [5, 11],
    [7, 9],
    [1, 16],
    [0, 10],
    [3, 4],
    [12, 17],
    [3, 2],
    [14, 11],
    [16, 18],
    [6, 6],
    [2, 10],
    [17, 11],
    [2, 11],
    [11, 1],
    [8, 11],
    [12, 4],
    [12, 1],
    [9, 13],
    [10, 11],
  ],
  [
    [18, 5],
    [5, 10],
    [8, 4],
    [13, 17],
    [2, 14],
    [15, 3],
    [17, 7],
    [16, 17],
    [12, 15],
    [1, 3],
    [14, 7],
    [9, 12],
    [17, 16],
    [19, 7],
    [9, 16],
    [19, 11],
    [9, 10],
    [10, 16],
    [19, 15],
    [19, 13],
    [7, 7],
    [3, 13],
    [19, 3],
    [12, 16],
    [4, 6],
    [16, 8],
    [0, 2],
    [17, 8],
    [8, 13],
    [8, 12],
    [10, 6],
    [4, 4],
  ],
  [
    [10, 17],
    [9, 5],
    [15, 16],
    [6, 1],
    [9, 10],
    [1, 1],
    [13, 10],
    [4, 18],
    [8, 3],
    [17, 14],
    [9, 14],
    [19, 11],
    [9, 19],
    [5, 12],
    [4, 14],
    [11, 11],
    [13, 19],
    [19, 18],
    [10, 16],
    [3, 11],
    [11, 15],
  ],
  [
    [5, 15],
    [8, 6],
    [6, 7],
    [6, 15],
    [7, 16],
    [1, 5],
    [9, 13],
    [16, 1],
    [3, 12],
    [12, 3],
    [18, 19],
    [3, 10],
    [16, 5],
    [10, 8],
    [19, 18],
    [14, 2],
    [4, 8],
    [1, 9],
    [19, 6],
    [1, 9],
    [11, 17],
    [14, 13],
    [11, 17],
    [9, 17],
    [5, 5],
    [19, 11],
    [14, 9],
    [7, 15],
    [15, 3],
    [7, 1],
    [7, 13],
    [7, 0],
    [17, 6],
    [4, 10],
    [7, 0],
  ],
  [
    [12, 13],
    [12, 4],
    [11, 1],
    [8, 7],
    [1, 14],
    [14, 17],
    [0, 0],
    [1, 0],
    [18, 8],
    [12, 18],
    [6, 7],
    [10, 4],
    [8, 5],
    [3, 0],
    [4, 1],
    [8, 7],
    [14, 9],
    [14, 7],
    [11, 0],
    [2, 4],
    [19, 10],
    [2, 1],
    [18, 4],
    [3, 5],
    [15, 11],
    [3, 5],
    [2, 5],
    [12, 10],
    [13, 6],
    [13, 6],
    [14, 10],
    [9, 8],
  ],
  [
    [1, 17],
    [9, 15],
    [10, 10],
    [2, 2],
    [4, 18],
    [14, 9],
    [8, 10],
    [14, 17],
    [4, 6],
    [13, 17],
    [18, 16],
    [18, 1],
    [3, 12],
    [3, 9],
    [18, 17],
    [16, 10],
    [9, 0],
    [16, 4],
    [6, 15],
    [6, 13],
    [1, 11],
    [3, 4],
    [12, 17],
    [9, 16],
    [10, 5],
    [18, 2],
    [11, 3],
    [2, 7],
    [5, 18],
    [8, 9],
    [13, 6],
    [12, 4],
  ],
  [
    [16, 0],
    [16, 3],
    [1, 1],
    [15, 17],
    [15, 9],
    [8, 14],
    [9, 0],
    [9, 2],
    [10, 18],
    [0, 8],
    [11, 2],
    [0, 3],
    [13, 18],
    [18, 5],
    [9, 9],
    [2, 11],
    [2, 3],
    [15, 16],
    [3, 5],
    [11, 12],
    [10, 2],
    [10, 7],
    [15, 15],
    [14, 10],
    [17, 12],
    [11, 15],
    [1, 13],
    [7, 11],
    [8, 14],
    [6, 13],
    [15, 11],
    [18, 6],
    [16, 16],
  ],
  [
    [6, 16],
    [9, 1],
    [8, 0],
    [7, 2],
    [12, 5],
    [14, 16],
    [5, 5],
    [18, 14],
    [14, 10],
    [10, 12],
    [18, 8],
    [16, 17],
    [11, 6],
    [10, 14],
    [17, 6],
    [9, 8],
    [18, 8],
    [11, 19],
    [4, 3],
    [18, 11],
    [10, 12],
  ],
  [
    [6, 15],
    [14, 9],
    [5, 9],
    [17, 7],
    [5, 16],
    [17, 2],
    [0, 18],
    [2, 14],
    [4, 14],
    [19, 0],
    [13, 7],
    [16, 12],
    [18, 10],
    [7, 15],
    [13, 7],
    [15, 6],
    [18, 9],
    [5, 6],
    [12, 1],
    [4, 3],
    [13, 11],
    [16, 18],
    [17, 5],
    [5, 0],
    [15, 5],
    [5, 11],
    [16, 1],
    [8, 11],
    [16, 13],
    [1, 3],
    [3, 10],
    [13, 14],
    [16, 5],
  ],
  [
    [9, 16],
    [10, 0],
    [15, 5],
    [2, 11],
    [15, 7],
    [4, 2],
    [1, 11],
    [12, 13],
    [10, 15],
    [11, 4],
    [5, 17],
    [5, 17],
    [18, 4],
    [16, 19],
    [5, 17],
    [8, 11],
    [16, 2],
    [1, 5],
    [15, 4],
    [5, 16],
    [1, 1],
    [4, 12],
    [13, 12],
  ],
  [
    [17, 12],
    [16, 12],
    [6, 16],
    [17, 18],
    [7, 15],
    [8, 6],
    [7, 11],
    [6, 12],
    [13, 9],
    [1, 5],
    [13, 17],
    [4, 7],
    [0, 19],
    [4, 19],
    [1, 0],
    [17, 13],
    [15, 16],
    [11, 4],
    [7, 16],
    [8, 0],
    [15, 12],
    [7, 3],
    [15, 14],
    [10, 15],
    [13, 3],
    [16, 17],
    [18, 3],
    [16, 7],
    [8, 14],
    [14, 5],
    [4, 18],
    [11, 9],
    [4, 7],
    [19, 9],
    [3, 0],
  ],
  [
    [1, 9],
    [2, 6],
    [19, 16],
    [19, 17],
    [10, 16],
    [10, 13],
    [3, 10],
    [15, 7],
    [1, 15],
    [3, 18],
    [3, 9],
    [11, 19],
    [6, 1],
    [17, 5],
    [6, 2],
    [13, 17],
    [11, 1],
    [18, 2],
    [13, 1],
    [0, 6],
    [19, 17],
    [18, 18],
  ],
  [
    [19, 8],
    [19, 5],
    [7, 2],
    [1, 19],
    [19, 12],
    [5, 14],
    [18, 4],
    [18, 9],
    [5, 0],
    [1, 10],
    [7, 7],
    [1, 16],
    [2, 10],
    [15, 6],
    [2, 2],
    [16, 5],
    [9, 8],
    [16, 3],
    [16, 11],
    [11, 4],
    [12, 6],
    [16, 13],
    [13, 3],
    [8, 2],
    [14, 6],
    [11, 3],
    [0, 17],
    [19, 8],
    [9, 5],
    [4, 10],
    [4, 14],
    [14, 13],
    [11, 0],
    [0, 12],
    [10, 13],
  ],
  [
    [7, 7],
    [0, 17],
    [7, 13],
    [4, 16],
    [16, 17],
    [1, 14],
    [4, 12],
    [14, 14],
    [0, 16],
    [7, 6],
    [11, 17],
    [1, 4],
    [2, 16],
    [12, 3],
    [19, 11],
    [3, 7],
    [3, 14],
    [17, 10],
    [17, 16],
    [5, 18],
    [9, 19],
    [18, 12],
    [17, 7],
    [10, 17],
    [7, 10],
    [10, 9],
    [8, 4],
    [9, 5],
    [13, 18],
    [14, 0],
    [13, 12],
  ],
  [
    [17, 12],
    [18, 5],
    [4, 6],
    [12, 8],
    [17, 16],
    [8, 2],
    [3, 19],
    [6, 5],
    [7, 7],
    [0, 13],
    [11, 17],
    [13, 15],
    [14, 19],
    [1, 12],
    [16, 10],
    [17, 8],
    [13, 0],
    [19, 15],
    [1, 2],
    [7, 13],
    [17, 14],
    [0, 0],
    [5, 9],
    [12, 9],
    [16, 14],
    [8, 3],
    [5, 0],
    [16, 0],
  ],
  [
    [1, 11],
    [18, 15],
    [8, 17],
    [11, 12],
    [4, 19],
    [7, 18],
    [9, 18],
    [9, 4],
    [2, 15],
    [7, 5],
    [11, 13],
    [1, 10],
    [1, 1],
    [15, 15],
    [17, 8],
    [10, 17],
    [11, 12],
    [3, 10],
    [2, 4],
    [11, 14],
    [0, 15],
    [10, 17],
    [7, 13],
  ],
  [
    [5, 11],
    [17, 9],
    [3, 5],
    [2, 19],
    [6, 15],
    [19, 16],
    [17, 19],
    [18, 10],
    [7, 12],
    [4, 9],
    [8, 1],
    [18, 2],
    [4, 18],
    [3, 14],
    [3, 16],
    [18, 8],
    [3, 0],
    [5, 10],
    [10, 18],
    [19, 12],
    [17, 19],
    [11, 2],
    [11, 14],
    [16, 19],
    [6, 2],
    [15, 9],
    [17, 16],
    [9, 13],
    [7, 5],
    [18, 4],
    [5, 0],
  ],
  [
    [11, 10],
    [9, 18],
    [2, 15],
    [15, 0],
    [5, 3],
    [12, 2],
    [7, 5],
    [4, 3],
    [2, 10],
    [12, 2],
    [18, 5],
    [13, 4],
    [19, 0],
    [4, 4],
    [5, 15],
    [7, 1],
    [9, 8],
    [1, 0],
    [4, 16],
    [0, 14],
    [5, 5],
    [15, 8],
    [2, 6],
    [16, 7],
    [17, 16],
    [19, 17],
    [4, 18],
    [13, 1],
    [9, 5],
    [13, 18],
    [6, 16],
    [3, 10],
    [0, 4],
    [12, 13],
    [5, 1],
  ],
  [
    [7, 1],
    [15, 9],
    [12, 4],
    [4, 1],
    [13, 5],
    [6, 10],
    [3, 12],
    [4, 14],
    [14, 5],
    [7, 3],
    [2, 17],
    [7, 5],
    [15, 0],
    [10, 3],
    [8, 7],
    [18, 14],
    [0, 15],
    [0, 11],
    [9, 0],
    [4, 10],
    [2, 4],
    [18, 15],
    [11, 7],
    [11, 8],
    [5, 7],
    [3, 17],
    [8, 0],
    [16, 1],
    [11, 10],
    [3, 1],
  ],
  [
    [16, 17],
    [4, 6],
    [10, 9],
    [4, 7],
    [15, 15],
    [14, 6],
    [5, 16],
    [13, 12],
    [3, 12],
    [0, 10],
    [10, 11],
    [12, 17],
    [3, 19],
    [19, 8],
    [8, 1],
    [19, 4],
    [17, 4],
    [19, 4],
    [17, 13],
    [18, 7],
    [7, 10],
    [17, 15],
    [1, 8],
    [1, 10],
    [6, 0],
    [12, 15],
    [3, 6],
    [8, 10],
    [10, 8],
    [1, 2],
    [10, 11],
  ],
  [
    [8, 4],
    [10, 8],
    [13, 0],
    [4, 5],
    [14, 16],
    [12, 1],
    [5, 12],
    [2, 2],
    [11, 2],
    [12, 1],
    [10, 15],
    [12, 5],
    [14, 19],
    [17, 9],
    [1, 0],
    [2, 18],
    [17, 9],
    [16, 13],
    [14, 7],
    [10, 3],
    [10, 3],
    [0, 13],
    [9, 12],
    [12, 3],
    [11, 10],
    [9, 8],
    [15, 2],
  ],
  [
    [16, 6],
    [4, 15],
    [19, 15],
    [5, 14],
    [11, 18],
    [13, 1],
    [1, 7],
    [17, 18],
    [1, 17],
    [9, 0],
    [12, 2],
    [2, 5],
    [8, 5],
    [14, 14],
    [19, 7],
    [3, 9],
    [19, 14],
    [17, 12],
    [18, 0],
    [13, 16],
    [10, 2],
    [16, 14],
    [0, 7],
    [10, 5],
    [10, 1],
    [16, 19],
    [17, 11],
    [0, 11],
    [7, 18],
    [1, 6],
  ],
  [
    [3, 1],
    [9, 2],
    [16, 15],
    [5, 5],
    [10, 0],
    [0, 17],
    [12, 0],
    [16, 7],
    [12, 4],
    [10, 17],
    [8, 15],
    [15, 15],
    [0, 17],
    [10, 11],
    [8, 15],
    [6, 8],
    [4, 15],
    [16, 13],
    [6, 2],
    [3, 6],
    [13, 9],
    [10, 6],
    [6, 16],
    [16, 19],
    [12, 8],
    [0, 9],
    [10, 13],
    [13, 8],
    [3, 10],
  ],
  [
    [3, 5],
    [8, 12],
    [8, 14],
    [12, 3],
    [0, 8],
    [13, 17],
    [17, 0],
    [7, 14],
    [4, 8],
    [14, 0],
    [9, 8],
    [8, 11],
    [8, 18],
    [12, 13],
    [1, 16],
    [17, 6],
    [14, 6],
    [15, 12],
    [17, 12],
    [2, 7],
    [8, 19],
    [12, 17],
    [9, 10],
    [4, 17],
  ],
  [
    [19, 2],
    [10, 8],
    [14, 10],
    [16, 16],
    [14, 18],
    [12, 9],
    [5, 2],
    [12, 17],
    [16, 16],
    [5, 16],
    [3, 13],
    [13, 15],
    [8, 6],
    [14, 9],
    [13, 6],
    [17, 18],
    [19, 8],
    [16, 2],
    [12, 9],
    [19, 2],
    [5, 0],
    [5, 10],
    [17, 2],
    [2, 0],
    [14, 13],
    [11, 18],
    [3, 11],
    [11, 15],
    [9, 14],
    [11, 15],
  ],
  [
    [7, 11],
    [1, 2],
    [18, 16],
    [19, 18],
    [17, 9],
    [2, 3],
    [1, 10],
    [9, 19],
    [12, 11],
    [12, 17],
    [4, 13],
    [2, 8],
    [8, 10],
    [4, 17],
    [12, 0],
    [8, 3],
    [18, 19],
    [1, 14],
    [9, 18],
    [1, 17],
    [6, 2],
    [1, 3],
    [18, 1],
    [11, 14],
    [9, 6],
  ],
  [
    [5, 6],
    [9, 1],
    [10, 4],
    [1, 2],
    [10, 2],
    [4, 19],
    [14, 13],
    [19, 5],
    [3, 5],
    [2, 13],
    [0, 4],
    [1, 19],
    [6, 12],
    [5, 6],
    [3, 2],
    [11, 13],
    [9, 16],
    [6, 7],
    [10, 3],
    [15, 15],
    [14, 14],
    [10, 0],
    [14, 4],
    [3, 4],
    [9, 2],
    [0, 7],
    [19, 12],
    [4, 4],
    [19, 6],
    [12, 15],
    [6, 10],
    [18, 4],
    [16, 10],
  ],
  [
    [9, 17],
    [9, 15],
    [12, 6],
    [11, 14],
    [18, 15],
    [1, 6],
    [10, 9],
    [19, 13],
    [9, 0],
    [15, 5],
    [17, 13],
    [4, 4],
    [5, 7],
    [11, 18],
    [18, 11],
    [13, 12],
    [16, 17],
    [5, 18],
    [9, 5],
    [12, 15],
    [3, 8],
    [12, 16],
    [7, 13],
    [5, 16],
    [0, 5],
    [15, 11],
    [13, 6],
    [6, 7],
    [18, 4],
    [3, 4],
    [2, 1],
  ],
  [
    [13, 6],
    [19, 13],
    [14, 5],
    [3, 14],
    [10, 5],
    [16, 16],
    [5, 6],
    [17, 19],
    [8, 5],
    [15, 12],
    [4, 8],
    [3, 16],
    [18, 8],
    [13, 8],
    [10, 18],
    [3, 17],
    [16, 6],
    [0, 5],
    [13, 11],
    [3, 7],
    [9, 2],
    [16, 6],
    [17, 5],
    [10, 16],
    [12, 13],
    [12, 11],
    [11, 4],
    [14, 18],
    [12, 2],
    [1, 1],
  ],
  [
    [6, 3],
    [19, 16],
    [13, 3],
    [7, 9],
    [12, 13],
    [0, 5],
    [10, 16],
    [2, 1],
    [5, 18],
    [9, 11],
    [14, 19],
    [7, 16],
    [10, 1],
    [10, 14],
    [11, 6],
    [4, 12],
    [1, 7],
    [16, 8],
    [5, 2],
    [1, 16],
    [17, 1],
    [9, 0],
    [7, 15],
    [17, 12],
    [19, 9],
    [7, 11],
    [10, 13],
    [4, 8],
    [0, 14],
    [19, 8],
    [6, 7],
    [6, 16],
  ],
  [
    [10, 12],
    [14, 7],
    [2, 17],
    [14, 3],
    [6, 6],
    [16, 3],
    [16, 19],
    [19, 12],
    [12, 7],
    [17, 2],
    [7, 14],
    [9, 14],
    [2, 11],
    [8, 17],
    [4, 5],
    [5, 7],
    [14, 10],
    [3, 1],
    [16, 15],
    [7, 19],
    [11, 9],
    [19, 0],
    [4, 7],
    [2, 17],
    [18, 15],
    [8, 12],
    [12, 10],
  ],
  [
    [14, 12],
    [6, 9],
    [19, 9],
    [0, 18],
    [14, 6],
    [1, 1],
    [12, 18],
    [7, 4],
    [4, 8],
    [19, 0],
    [16, 18],
    [9, 12],
    [3, 8],
    [2, 15],
    [13, 12],
    [10, 0],
    [4, 9],
    [9, 8],
    [0, 7],
    [12, 0],
    [7, 1],
    [10, 13],
    [9, 14],
  ],
  [
    [5, 5],
    [12, 2],
    [18, 1],
    [9, 16],
    [15, 18],
    [8, 16],
    [9, 6],
    [12, 18],
    [1, 13],
    [12, 1],
    [8, 17],
    [15, 4],
    [0, 7],
    [4, 6],
    [3, 8],
    [8, 7],
    [18, 15],
    [6, 13],
    [3, 4],
    [12, 2],
    [19, 5],
    [1, 3],
    [12, 17],
    [8, 6],
    [11, 0],
    [2, 1],
    [5, 17],
    [14, 5],
    [17, 9],
    [2, 9],
  ],
  [
    [11, 12],
    [9, 10],
    [11, 17],
    [15, 12],
    [6, 4],
    [14, 10],
    [16, 6],
    [17, 8],
    [5, 1],
    [7, 0],
    [5, 10],
    [12, 9],
    [6, 5],
    [5, 10],
    [2, 15],
    [2, 12],
    [6, 6],
    [12, 10],
    [4, 19],
    [5, 3],
    [18, 14],
    [14, 18],
    [19, 18],
    [12, 6],
    [15, 0],
    [16, 16],
    [2, 13],
    [10, 6],
  ],
  [
    [17, 18],
    [3, 2],
    [18, 15],
    [8, 14],
    [15, 15],
    [12, 2],
    [4, 18],
    [6, 6],
    [12, 15],
    [18, 7],
    [15, 2],
    [5, 19],
    [1, 0],
    [7, 14],
    [8, 16],
    [19, 4],
    [4, 9],
    [10, 5],
    [17, 17],
    [0, 2],
    [3, 12],
    [6, 17],
  ],
  [
    [1, 18],
    [11, 14],
    [16, 10],
    [12, 8],
    [1, 18],
    [15, 4],
    [16, 1],
    [15, 9],
    [9, 13],
    [8, 5],
    [11, 16],
    [16, 15],
    [6, 11],
    [3, 15],
    [2, 8],
    [19, 0],
    [18, 3],
    [9, 9],
    [17, 5],
    [14, 5],
    [16, 5],
    [13, 3],
    [16, 7],
    [5, 15],
    [3, 18],
    [16, 2],
    [3, 11],
    [7, 16],
    [6, 14],
    [3, 16],
    [8, 19],
    [3, 7],
  ],
  [
    [19, 8],
    [1, 5],
    [13, 13],
    [6, 15],
    [14, 7],
    [19, 3],
    [9, 1],
    [1, 0],
    [14, 12],
    [11, 15],
    [4, 10],
    [9, 10],
    [18, 3],
    [1, 2],
    [2, 8],
    [9, 0],
    [19, 0],
    [16, 14],
    [11, 4],
    [14, 7],
    [1, 8],
    [16, 3],
    [7, 12],
    [2, 7],
    [11, 11],
    [16, 19],
    [11, 0],
    [16, 17],
    [3, 3],
    [19, 17],
    [17, 3],
    [5, 11],
    [15, 9],
    [13, 18],
  ],
  [
    [15, 6],
    [12, 12],
    [3, 19],
    [11, 7],
    [11, 14],
    [16, 6],
    [9, 13],
    [3, 9],
    [6, 10],
    [11, 2],
    [2, 13],
    [6, 7],
    [2, 18],
    [8, 7],
    [8, 18],
    [3, 0],
    [0, 18],
    [1, 5],
    [9, 15],
    [10, 2],
    [8, 6],
    [8, 12],
    [9, 15],
    [18, 12],
    [14, 15],
    [17, 17],
    [11, 9],
    [16, 4],
    [3, 12],
    [16, 6],
    [19, 5],
    [17, 6],
  ],
  [
    [10, 15],
    [3, 8],
    [7, 2],
    [7, 9],
    [12, 2],
    [11, 4],
    [16, 11],
    [7, 13],
    [2, 2],
    [11, 4],
    [18, 18],
    [0, 13],
    [18, 12],
    [19, 3],
    [5, 1],
    [2, 3],
    [5, 16],
    [12, 8],
    [1, 2],
    [18, 18],
    [17, 17],
    [13, 12],
    [5, 15],
    [11, 15],
    [18, 10],
    [9, 16],
    [9, 2],
    [0, 8],
    [2, 18],
    [18, 11],
    [18, 10],
    [7, 7],
    [11, 5],
    [10, 4],
    [15, 8],
  ],
  [
    [17, 14],
    [5, 18],
    [16, 3],
    [16, 6],
    [9, 4],
    [14, 7],
    [14, 2],
    [11, 0],
    [6, 14],
    [12, 17],
    [3, 16],
    [14, 14],
    [6, 4],
    [18, 8],
    [12, 5],
    [5, 3],
    [10, 10],
    [7, 9],
    [3, 12],
    [19, 13],
    [0, 13],
    [18, 19],
    [14, 6],
    [9, 14],
    [19, 17],
    [6, 0],
    [0, 19],
    [12, 10],
    [18, 19],
    [4, 13],
    [6, 8],
    [6, 3],
    [8, 9],
    [1, 15],
    [1, 13],
  ],
  [
    [17, 2],
    [5, 14],
    [15, 18],
    [11, 3],
    [5, 17],
    [14, 17],
    [19, 2],
    [5, 14],
    [8, 6],
    [9, 15],
    [16, 10],
    [6, 19],
    [12, 13],
    [3, 6],
    [15, 11],
    [14, 9],
    [6, 19],
    [3, 2],
    [15, 18],
    [13, 16],
    [18, 13],
    [7, 1],
    [2, 5],
    [11, 15],
  ],
  [
    [4, 11],
    [9, 6],
    [10, 6],
    [15, 8],
    [19, 9],
  ],
];
const meths = [
  // groupFindMin,
  groupEvenlySpreadKMean,
];

console.time("timer");
test(tests);
console.timeEnd("timer");

//
// Display Zone
//
function display(coor, i, max, n, meth) {
  const parent = document.createElement("div");
  parent.style.display = "flex";

  const { groups, travels, initialTravels } = meth(coor, max, n);
  visualiseCoordinates(coor, groups, parent);

  const ul = document.createElement("ul");
  addLi(ul, `Index: ${i}, Num jobs: ${coor.length}`);
  addLi(ul, `MaxCap: ${max}, Num Technicians: ${n}`);
  addLi(ul, `Function: ${meth.name}`);
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
          ? `overflow: 0, ${group ? group : "None Assigned"}`
          : `${colors[i + 3]}: ${Math.floor(
              travels[i]
            )} (starts with ${Math.floor(initialTravels[i])}), ${group}`
      );
    });

  const totalTravel = Math.floor(
    travels.reduce((total, travel) => total + travel, 0)
  );
  addLi(ul, "");
  addLi(ul, `Total Travel: ${totalTravel}`);

  // const totalTravelMinutStart =
  //   totalTravel -
  //   Math.floor(initialTravels.reduce((total, travel) => total + travel, 0));
  // addLi(ul, `Total Travel Without Start: ${totalTravelMinutStart}`);
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

    let size = Math.random() * 15 + 20;
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
    meths.forEach((meth) => display(coor, i, 4, 8, meth));
    document.body.appendChild(document.createElement("br"));
  });

  // const sum = tests.reduce((sum, coor, i) => {
  //   document.body.appendChild(document.createElement("br"));
  //   return sum + display(tests[0], 0, 4, 8, meths[0]);
  // }, 0);
  // console.log(sum / tests.length);

  // display(tests[0], 0, 4, 8, meths[0]);
}

//
// DISTANCE UTILITY FUNCTIONS
//

// O(1)
function getDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

// O(numTechnicians)
function getRandomJob(coordinates, added) {
  let rand = Math.floor(Math.random() * coordinates.length);
  if (added.every((el) => el)) return -1;
  while (added[rand]) {
    rand = Math.floor(Math.random() * coordinates.length);
  }
  added[rand] = true;
  return rand;
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
      initialTravel: 0,
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

// K means clustering
// RUNTIME: O(number of iterations * number of jobs * number of technicians)

// Iterating multiple times to find the best K-means cluster
function groupFindMin(coordinates, max, n) {
  let res;
  let minTravel = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < 10000; i++) {
    const cur = groupRandomKMean(coordinates, max, n);
    let curTravel = cur.travels.reduce((sum, travel) => sum + travel, 0);
    if (curTravel < minTravel) {
      res = cur;
      minTravel = curTravel;
    }
  }
  return res;
}

// Finding a random K mean cluster
function groupRandomKMean(coordinates, max, n) {
  const { groups, technicians, added } = initialSetUp(coordinates, n);

  const startPoints = [];

  for (let i = 0; i < n; i++) {
    const rand = getRandomJob(coordinates, added);
    if (rand === -1) break;
    groups[i].push(coordinates[rand]);
    startPoints.push(rand);
  }

  // edge case may end up as legacy
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

function closestTech(coordinates, x, startPoints, technicians) {
  const inits = startPoints.map((el) => coordinates[el]);
  let minDistance = Number.MAX_SAFE_INTEGER;

  const closest = inits.reduce((minIndex, init, i) => {
    if (technicians[i].maxCap) return minIndex;

    let curDistance = getDistance(init, coordinates[x]);
    if (curDistance < minDistance) {
      minDistance = curDistance;
      return i;
    } else {
      return minIndex;
    }
  }, -1);

  if (closest !== -1) {
    technicians[closest].travel += minDistance;
  }

  return closest;
}

function groupEvenlySpreadKMean(coordinates, max, n) {
  const { groups, technicians, added } = initialSetUp(coordinates, n);

  const startPoints = getEvenStarts(coordinates, n, groups);

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

function getEvenStarts(coordinates, n, groups) {
  // O(n)
  const { width, height, leftmost, topmost } = getBoundaries(coordinates);
  // console.log(width, height, leftmost, rightmost, topmost, bottommost);

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
  // console.log(rows);

  let yIncrement = height / (2 * rows.length);
  // O(number of technicians * n)
  rows.forEach((row, i) => {
    let xIncrement = width / (2 * row);
    [...Array(row)].forEach((_, j) => {
      let coor = [
        leftmost + (2 * j + 1) * xIncrement,
        topmost + (2 * i + 1) * yIncrement,
      ];
      console.log(coor);
      res.push(coor);
    });
  });
  // console.log(res);
  return [1];
}

function getBoundaries(coordinates) {
  // const sum = coordinates.reduce(
  //   (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]],
  //   [0, 0]
  // );

  // const average = [sum[0] / coordinates.length, sum[1] / coordinates.length];

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
