const maxWeight = 8;
const n = 8;
const numIterations = 1;

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
    [4, 14, 3],
    [4, 5, 1],
    [15, 9, 1],
    [0, 8, 2],
    [19, 3, 2],
    [16, 1, 2],
    [10, 12, 3],
    [3, 8, 1],
    [18, 12, 2],
    [1, 4, 2],
    [4, 5, 2],
    [6, 18, 3],
    [0, 16, 3],
    [18, 12, 2],
    [17, 2, 1],
    [5, 18, 3],
    [17, 9, 1],
    [1, 8, 1],
    [4, 11, 3],
    [10, 6, 2],
    [17, 4, 3],
    [0, 14, 2],
    [15, 0, 2],
    [14, 18, 1],
  ],
  [
    [10, 17, 1],
    [19, 12, 2],
    [19, 15, 2],
    [12, 11, 1],
    [7, 4, 3],
    [10, 0, 3],
    [10, 1, 3],
    [15, 19, 3],
    [17, 18, 1],
    [14, 17, 2],
    [18, 18, 3],
    [1, 0, 2],
    [10, 1, 3],
    [9, 0, 3],
    [9, 13, 1],
    [14, 18, 2],
    [5, 18, 2],
    [9, 4, 2],
    [14, 2, 2],
    [18, 8, 3],
    [14, 8, 3],
    [2, 9, 1],
    [13, 6, 1],
    [11, 15, 3],
    [7, 5, 3],
    [2, 5, 3],
    [2, 16, 1],
    [2, 5, 1],
    [14, 5, 2],
    [5, 1, 3],
  ],
  [
    [17, 13, 1],
    [1, 1, 1],
    [6, 8, 3],
    [15, 4, 1],
    [8, 14, 3],
    [19, 8, 2],
    [8, 7, 2],
    [1, 1, 1],
    [10, 8, 2],
    [2, 7, 2],
    [16, 6, 2],
    [14, 9, 1],
    [13, 18, 2],
    [18, 12, 2],
    [9, 17, 2],
    [11, 12, 1],
    [12, 19, 1],
    [18, 12, 2],
    [17, 17, 2],
    [8, 15, 3],
    [10, 10, 1],
    [1, 15, 1],
    [9, 15, 3],
    [1, 13, 3],
  ],
  [
    [10, 13, 3],
    [7, 8, 3],
    [3, 12, 1],
    [6, 2, 1],
    [6, 19, 2],
    [11, 12, 1],
    [5, 5, 1],
    [8, 17, 2],
    [6, 15, 3],
    [14, 18, 3],
    [18, 12, 1],
    [13, 7, 1],
    [4, 5, 2],
    [16, 5, 3],
    [10, 0, 3],
    [9, 11, 2],
    [19, 4, 1],
    [10, 19, 3],
    [13, 3, 3],
    [7, 2, 1],
    [19, 0, 1],
    [16, 2, 2],
    [3, 7, 2],
    [0, 13, 1],
    [2, 1, 2],
    [19, 0, 2],
    [4, 6, 2],
    [6, 16, 1],
    [0, 1, 2],
    [17, 13, 3],
    [10, 17, 2],
    [6, 7, 1],
    [14, 12, 2],
    [6, 6, 2],
  ],
  [
    [14, 18, 1],
    [16, 17, 2],
    [15, 5, 1],
    [12, 8, 2],
    [10, 8, 2],
    [9, 0, 3],
    [8, 3, 1],
    [19, 12, 2],
    [17, 2, 3],
    [1, 9, 3],
    [0, 4, 2],
    [18, 16, 3],
    [9, 17, 1],
    [1, 4, 3],
    [8, 6, 2],
    [12, 11, 1],
    [11, 9, 3],
    [5, 3, 3],
    [4, 4, 3],
    [14, 3, 2],
    [16, 9, 2],
  ],
  [
    [9, 15, 3],
    [12, 14, 2],
    [1, 8, 3],
    [5, 7, 3],
    [11, 8, 3],
    [17, 13, 1],
    [10, 15, 1],
    [9, 3, 2],
    [11, 9, 3],
    [2, 14, 1],
    [11, 19, 1],
    [4, 19, 1],
    [3, 10, 1],
    [3, 16, 3],
    [8, 8, 1],
    [13, 6, 3],
    [5, 3, 2],
    [14, 7, 3],
    [17, 11, 1],
    [8, 2, 3],
    [15, 11, 1],
    [3, 11, 3],
    [14, 13, 3],
    [12, 14, 2],
    [12, 1, 2],
    [18, 11, 2],
    [3, 15, 1],
    [1, 13, 1],
    [16, 11, 3],
    [7, 12, 3],
  ],
  [
    [16, 12, 3],
    [12, 14, 3],
    [5, 18, 3],
    [17, 19, 1],
    [9, 1, 2],
    [16, 5, 3],
    [8, 13, 2],
    [7, 10, 3],
    [13, 1, 1],
    [10, 18, 2],
    [8, 16, 1],
    [10, 16, 1],
    [14, 5, 3],
    [12, 0, 2],
    [13, 0, 1],
    [0, 16, 3],
    [1, 10, 1],
    [13, 0, 1],
    [16, 9, 3],
    [15, 10, 3],
    [5, 19, 2],
    [11, 1, 1],
    [1, 14, 2],
    [3, 15, 3],
    [10, 12, 3],
    [12, 7, 1],
    [0, 16, 2],
    [3, 12, 2],
    [1, 14, 3],
  ],
  [
    [14, 0, 3],
    [4, 10, 2],
    [3, 0, 1],
    [13, 18, 1],
    [15, 13, 2],
    [5, 5, 1],
    [5, 16, 3],
    [0, 16, 1],
    [5, 13, 1],
    [18, 19, 1],
    [17, 3, 1],
    [3, 2, 3],
    [18, 19, 2],
    [6, 19, 2],
    [11, 3, 1],
    [9, 6, 1],
    [1, 9, 2],
    [9, 18, 1],
    [8, 5, 1],
    [10, 14, 1],
    [12, 1, 2],
    [12, 12, 3],
    [18, 15, 1],
    [8, 10, 1],
    [12, 9, 3],
    [5, 10, 3],
    [4, 4, 2],
    [6, 14, 3],
    [15, 12, 1],
    [0, 1, 1],
  ],
  [
    [2, 14, 1],
    [17, 16, 1],
    [10, 11, 1],
    [15, 8, 2],
    [11, 14, 1],
    [8, 12, 3],
    [14, 4, 2],
    [1, 0, 2],
    [13, 2, 3],
    [9, 7, 1],
    [0, 7, 1],
    [11, 18, 1],
    [18, 3, 3],
    [10, 2, 1],
    [5, 19, 2],
    [3, 3, 1],
    [15, 10, 2],
    [7, 19, 1],
    [9, 0, 1],
    [7, 16, 2],
    [17, 11, 1],
    [0, 15, 2],
    [11, 8, 2],
    [14, 6, 2],
    [6, 16, 2],
    [1, 15, 3],
    [2, 10, 2],
    [6, 13, 1],
    [9, 17, 3],
    [19, 6, 1],
    [12, 12, 3],
  ],
  [
    [8, 12, 3],
    [1, 9, 2],
    [12, 17, 1],
    [13, 11, 3],
    [10, 14, 2],
    [9, 11, 2],
    [17, 6, 1],
    [11, 14, 1],
    [9, 2, 1],
    [9, 18, 2],
    [13, 18, 1],
    [14, 16, 2],
    [14, 19, 1],
    [17, 18, 2],
    [7, 5, 3],
    [7, 18, 1],
    [5, 5, 2],
    [7, 9, 2],
    [8, 7, 3],
    [9, 19, 1],
    [0, 2, 1],
    [11, 17, 1],
    [4, 0, 3],
    [7, 10, 3],
    [1, 2, 1],
    [1, 1, 3],
    [1, 8, 3],
  ],
  [
    [9, 16, 1],
    [19, 12, 3],
    [17, 6, 1],
    [5, 9, 2],
    [13, 11, 2],
    [9, 11, 1],
    [5, 19, 3],
    [5, 8, 2],
    [11, 10, 1],
    [1, 18, 3],
    [14, 1, 1],
    [0, 3, 3],
    [4, 16, 2],
    [18, 9, 1],
    [9, 15, 1],
    [11, 1, 3],
    [16, 6, 3],
    [9, 9, 3],
    [19, 16, 3],
    [11, 16, 1],
    [16, 2, 1],
    [19, 14, 3],
    [12, 10, 2],
    [13, 7, 3],
    [10, 1, 2],
    [4, 5, 1],
    [8, 8, 2],
    [12, 7, 3],
    [17, 15, 1],
    [1, 10, 3],
    [4, 6, 2],
    [12, 11, 2],
    [9, 0, 2],
    [10, 5, 2],
  ],
  [
    [18, 5, 2],
    [17, 11, 1],
    [11, 13, 3],
    [15, 15, 1],
    [6, 11, 2],
    [0, 16, 3],
    [17, 11, 3],
    [14, 10, 1],
    [19, 10, 2],
    [5, 10, 2],
    [7, 10, 1],
    [13, 14, 1],
    [16, 6, 1],
    [18, 7, 2],
    [9, 4, 1],
    [0, 3, 3],
    [6, 2, 1],
    [8, 5, 3],
    [1, 13, 1],
    [10, 4, 3],
    [13, 19, 1],
  ],
  [
    [19, 6, 1],
    [13, 1, 3],
    [9, 19, 1],
    [5, 15, 2],
    [8, 1, 3],
    [6, 11, 3],
    [13, 7, 2],
    [6, 17, 3],
    [12, 12, 3],
    [16, 6, 2],
    [3, 5, 3],
    [18, 6, 3],
    [0, 7, 3],
    [17, 9, 1],
    [17, 17, 1],
    [6, 8, 1],
    [10, 17, 3],
    [6, 12, 1],
    [4, 11, 1],
    [4, 12, 3],
    [14, 15, 3],
    [10, 1, 2],
    [7, 18, 2],
    [6, 15, 1],
    [15, 16, 1],
    [6, 3, 2],
    [6, 16, 3],
    [15, 2, 1],
  ],
  [
    [4, 14, 2],
    [16, 0, 2],
    [18, 17, 3],
    [2, 13, 3],
    [14, 3, 1],
    [8, 16, 2],
    [7, 19, 3],
    [19, 14, 3],
    [2, 3, 3],
    [14, 17, 1],
    [4, 17, 2],
    [13, 7, 3],
    [8, 9, 1],
    [1, 17, 3],
    [17, 7, 2],
    [7, 2, 2],
    [18, 17, 1],
    [7, 17, 2],
    [10, 9, 2],
    [12, 6, 1],
    [13, 10, 2],
    [6, 19, 2],
    [14, 4, 3],
    [12, 18, 2],
    [4, 5, 1],
    [15, 2, 1],
    [18, 13, 1],
    [5, 14, 2],
    [5, 15, 2],
    [19, 0, 2],
  ],
  [
    [10, 7, 2],
    [11, 1, 2],
    [14, 8, 3],
    [16, 19, 3],
    [5, 10, 2],
    [0, 13, 3],
    [3, 13, 1],
    [15, 6, 2],
    [10, 9, 2],
    [3, 13, 3],
    [13, 7, 2],
    [14, 12, 3],
    [12, 17, 3],
    [16, 1, 2],
    [19, 3, 1],
    [17, 7, 1],
    [19, 19, 1],
    [5, 10, 3],
    [9, 18, 2],
    [3, 12, 2],
    [4, 11, 3],
    [2, 6, 2],
    [14, 15, 2],
    [14, 7, 2],
  ],
  [
    [5, 2, 2],
    [4, 8, 2],
    [3, 18, 1],
    [3, 15, 2],
    [12, 10, 1],
    [2, 4, 1],
    [1, 9, 1],
    [1, 2, 3],
    [12, 1, 1],
    [11, 8, 3],
    [2, 5, 1],
    [8, 12, 2],
    [10, 2, 1],
    [17, 10, 1],
    [16, 17, 3],
    [0, 10, 1],
    [14, 5, 1],
    [3, 9, 2],
    [2, 0, 3],
    [13, 2, 3],
    [1, 6, 3],
    [18, 6, 3],
    [18, 19, 2],
    [18, 7, 2],
    [17, 18, 1],
    [17, 18, 1],
  ],
  [
    [7, 1, 3],
    [8, 18, 3],
    [12, 5, 1],
    [4, 6, 1],
    [5, 12, 3],
    [10, 3, 3],
    [5, 10, 3],
    [1, 10, 3],
    [19, 8, 2],
    [11, 18, 1],
    [4, 6, 3],
    [12, 2, 1],
    [15, 14, 1],
    [11, 19, 1],
    [2, 11, 2],
    [5, 9, 2],
    [13, 9, 2],
    [16, 5, 3],
    [10, 3, 2],
    [3, 1, 3],
    [10, 13, 1],
    [14, 15, 3],
  ],
  [
    [5, 9, 1],
    [8, 12, 3],
    [2, 17, 3],
    [8, 11, 1],
    [19, 19, 1],
    [10, 6, 1],
    [17, 3, 3],
    [9, 6, 2],
    [8, 13, 2],
    [9, 8, 3],
    [8, 16, 2],
    [18, 11, 1],
    [1, 12, 2],
    [2, 0, 2],
    [18, 9, 3],
    [7, 12, 3],
    [7, 5, 2],
    [17, 9, 1],
    [5, 0, 1],
    [6, 5, 2],
    [4, 5, 3],
    [9, 1, 2],
    [0, 15, 3],
    [6, 4, 2],
    [10, 3, 1],
  ],
  [
    [12, 2, 2],
    [4, 8, 2],
    [19, 16, 3],
    [9, 3, 3],
    [14, 1, 1],
    [6, 19, 2],
    [0, 1, 2],
    [2, 15, 1],
    [13, 15, 3],
    [15, 15, 3],
    [4, 7, 3],
    [14, 15, 1],
    [14, 4, 1],
    [12, 3, 1],
    [17, 8, 3],
    [2, 3, 2],
    [16, 16, 1],
    [6, 16, 2],
    [5, 0, 1],
    [16, 8, 1],
    [6, 18, 3],
    [11, 15, 2],
    [7, 18, 1],
    [1, 16, 1],
    [6, 7, 2],
    [5, 13, 3],
    [1, 11, 1],
    [13, 1, 1],
  ],
  [
    [12, 8, 1],
    [2, 19, 3],
    [17, 17, 1],
    [7, 16, 2],
    [3, 12, 1],
    [4, 15, 1],
    [6, 19, 2],
    [16, 5, 2],
    [15, 1, 3],
    [14, 0, 1],
    [15, 4, 1],
    [17, 14, 1],
    [9, 16, 3],
    [11, 9, 3],
    [19, 2, 2],
    [8, 16, 1],
    [2, 3, 2],
    [19, 16, 3],
    [18, 19, 1],
    [18, 0, 3],
    [15, 5, 2],
    [4, 11, 1],
  ],
  [
    [2, 13, 2],
    [17, 19, 3],
    [12, 19, 2],
    [3, 17, 3],
    [1, 15, 3],
    [9, 3, 1],
    [19, 2, 2],
    [9, 18, 2],
    [5, 2, 3],
    [0, 0, 1],
    [14, 9, 1],
    [9, 2, 1],
    [2, 0, 3],
    [8, 4, 1],
    [19, 9, 3],
    [10, 3, 1],
    [11, 11, 2],
    [0, 19, 2],
    [13, 11, 2],
    [3, 18, 3],
    [16, 10, 2],
    [7, 19, 1],
    [7, 12, 2],
  ],
  [
    [9, 0, 3],
    [12, 6, 2],
    [1, 14, 2],
    [7, 16, 2],
    [2, 15, 1],
    [5, 1, 1],
    [15, 16, 3],
    [1, 3, 1],
    [13, 10, 2],
    [11, 18, 1],
    [0, 17, 3],
    [11, 9, 2],
    [2, 0, 1],
    [10, 9, 1],
    [19, 17, 2],
    [5, 17, 2],
    [2, 7, 1],
    [11, 13, 2],
    [13, 6, 3],
    [0, 4, 3],
    [14, 5, 1],
    [9, 0, 2],
    [10, 7, 1],
    [5, 14, 3],
    [15, 16, 3],
    [5, 5, 3],
    [10, 11, 3],
    [2, 7, 3],
    [14, 2, 1],
    [1, 15, 2],
    [7, 9, 3],
    [7, 1, 1],
    [5, 18, 2],
  ],
  [
    [8, 15, 1],
    [18, 8, 1],
    [6, 17, 1],
    [1, 14, 2],
    [2, 5, 3],
    [9, 0, 1],
    [5, 2, 3],
    [12, 9, 2],
    [4, 3, 2],
    [8, 9, 2],
    [16, 1, 2],
    [13, 7, 3],
    [19, 3, 2],
    [5, 12, 1],
    [12, 7, 1],
    [15, 0, 2],
    [14, 6, 2],
    [5, 9, 2],
    [1, 8, 2],
    [1, 11, 3],
    [10, 5, 1],
  ],
  [
    [0, 18, 3],
    [11, 2, 1],
    [0, 17, 2],
    [15, 19, 3],
    [9, 4, 3],
    [0, 3, 3],
    [12, 17, 3],
    [15, 4, 1],
    [2, 5, 1],
    [12, 10, 3],
    [19, 8, 1],
    [15, 9, 3],
    [2, 2, 2],
    [7, 4, 3],
    [17, 7, 3],
    [0, 9, 3],
    [12, 3, 3],
    [2, 4, 3],
    [2, 4, 1],
    [1, 8, 3],
    [17, 3, 2],
  ],
  [
    [14, 11, 3],
    [6, 9, 3],
    [9, 0, 1],
    [12, 19, 2],
    [18, 16, 1],
    [19, 12, 3],
    [17, 6, 1],
    [6, 10, 3],
    [19, 5, 1],
    [3, 9, 2],
    [4, 13, 1],
    [11, 18, 3],
    [7, 6, 1],
    [3, 16, 3],
    [0, 18, 3],
    [9, 12, 3],
    [0, 18, 2],
    [14, 4, 3],
    [17, 3, 2],
    [0, 14, 2],
    [5, 8, 1],
  ],
  [
    [8, 11, 1],
    [0, 4, 3],
    [4, 17, 1],
    [9, 6, 2],
    [1, 18, 1],
    [6, 15, 1],
    [14, 4, 3],
    [2, 10, 3],
    [15, 8, 2],
    [7, 17, 3],
    [19, 13, 3],
    [3, 8, 2],
    [0, 3, 1],
    [18, 9, 3],
    [19, 7, 2],
    [14, 12, 3],
    [5, 4, 3],
    [10, 0, 2],
    [12, 3, 2],
    [13, 9, 3],
    [0, 3, 3],
    [4, 0, 1],
    [1, 13, 2],
    [9, 9, 3],
    [3, 0, 1],
    [11, 19, 2],
    [12, 18, 2],
    [12, 11, 1],
    [0, 7, 2],
    [13, 19, 3],
    [2, 10, 2],
    [4, 11, 3],
    [6, 19, 2],
  ],
  [
    [15, 6, 1],
    [1, 4, 3],
    [11, 9, 3],
    [1, 14, 3],
    [5, 16, 3],
    [15, 7, 1],
    [9, 17, 3],
    [8, 0, 2],
    [19, 19, 1],
    [9, 3, 2],
    [6, 16, 2],
    [11, 15, 1],
    [6, 19, 3],
    [10, 11, 2],
    [6, 4, 2],
    [17, 6, 1],
    [3, 11, 2],
    [8, 9, 2],
    [6, 16, 2],
    [4, 5, 3],
    [5, 16, 1],
    [2, 15, 3],
    [15, 3, 2],
    [3, 11, 3],
    [12, 13, 3],
    [4, 18, 2],
    [6, 4, 2],
    [10, 5, 1],
    [17, 11, 2],
    [0, 12, 1],
    [2, 5, 3],
    [17, 12, 2],
    [14, 6, 2],
  ],
  [
    [17, 8, 3],
    [18, 18, 1],
    [6, 12, 3],
    [16, 5, 3],
    [0, 9, 1],
    [15, 10, 1],
    [12, 17, 2],
    [15, 12, 1],
    [9, 2, 1],
    [8, 18, 1],
    [19, 17, 1],
    [12, 7, 1],
    [17, 10, 2],
    [3, 17, 1],
    [0, 9, 2],
    [9, 12, 1],
    [2, 13, 1],
    [15, 9, 2],
    [10, 4, 1],
    [18, 9, 2],
    [2, 9, 3],
    [4, 17, 2],
    [12, 9, 1],
    [8, 1, 3],
    [2, 11, 3],
    [11, 2, 3],
    [14, 16, 2],
    [1, 0, 1],
    [10, 14, 2],
    [9, 5, 1],
    [12, 11, 2],
    [16, 15, 1],
  ],
  [
    [2, 4, 2],
    [11, 4, 3],
    [6, 18, 2],
    [15, 6, 2],
    [1, 1, 1],
    [1, 12, 2],
    [7, 0, 2],
    [6, 13, 2],
    [7, 6, 2],
    [17, 19, 1],
    [7, 3, 1],
    [12, 4, 2],
    [19, 15, 3],
    [0, 1, 1],
    [15, 4, 3],
    [19, 0, 2],
    [4, 17, 1],
    [15, 5, 2],
    [11, 1, 3],
    [17, 18, 1],
    [15, 10, 1],
    [6, 15, 3],
    [0, 3, 2],
  ],
  [
    [0, 12, 2],
    [7, 7, 2],
    [9, 17, 3],
    [10, 14, 2],
    [7, 18, 2],
    [10, 14, 1],
    [9, 8, 2],
    [3, 3, 3],
    [18, 12, 1],
    [9, 12, 1],
    [4, 4, 2],
    [12, 0, 2],
    [7, 4, 2],
    [16, 6, 1],
    [14, 8, 1],
    [0, 9, 1],
    [2, 8, 2],
    [8, 12, 1],
    [4, 3, 2],
    [13, 0, 2],
    [17, 2, 2],
    [0, 19, 3],
    [5, 2, 1],
    [18, 6, 2],
    [2, 4, 3],
    [9, 10, 2],
    [16, 16, 2],
    [13, 16, 2],
    [14, 10, 3],
    [13, 16, 2],
    [14, 10, 2],
  ],
  [
    [1, 18, 1],
    [16, 1, 3],
    [9, 3, 3],
    [12, 0, 1],
    [5, 16, 1],
    [13, 12, 1],
    [9, 15, 1],
    [16, 5, 2],
    [1, 15, 1],
    [5, 2, 3],
    [16, 2, 1],
    [10, 19, 3],
    [6, 13, 1],
    [3, 2, 2],
    [15, 4, 3],
    [15, 8, 3],
    [11, 17, 2],
    [18, 3, 2],
    [19, 5, 3],
    [4, 13, 3],
    [9, 15, 1],
    [3, 19, 3],
    [12, 8, 3],
    [6, 3, 2],
    [4, 8, 3],
    [7, 5, 3],
    [7, 2, 2],
    [17, 13, 2],
    [9, 7, 3],
  ],
  [
    [17, 11, 3],
    [13, 9, 3],
    [14, 7, 1],
    [17, 9, 2],
    [14, 3, 3],
    [2, 18, 1],
    [4, 8, 1],
    [13, 9, 2],
    [10, 14, 1],
    [6, 12, 1],
    [9, 17, 2],
    [12, 15, 2],
    [4, 13, 2],
    [17, 12, 2],
    [15, 17, 3],
    [16, 8, 2],
    [19, 12, 1],
    [3, 10, 2],
    [18, 0, 2],
    [15, 0, 1],
    [5, 0, 2],
    [5, 12, 3],
    [15, 10, 1],
    [3, 18, 1],
    [1, 1, 1],
    [18, 14, 1],
    [1, 3, 3],
    [2, 6, 3],
  ],
  [
    [8, 15, 3],
    [5, 14, 1],
    [12, 17, 3],
    [19, 13, 3],
    [6, 6, 1],
    [9, 12, 2],
    [19, 19, 1],
    [12, 14, 1],
    [16, 8, 2],
    [8, 6, 2],
    [4, 17, 2],
    [14, 18, 2],
    [9, 1, 3],
    [18, 6, 3],
    [19, 1, 3],
    [2, 18, 1],
    [18, 1, 2],
    [16, 2, 3],
    [1, 1, 2],
    [15, 6, 1],
    [3, 14, 2],
    [1, 9, 2],
    [4, 2, 3],
    [14, 5, 2],
    [10, 9, 3],
    [9, 0, 2],
    [14, 13, 3],
    [19, 10, 1],
  ],
  [
    [17, 12, 3],
    [13, 1, 1],
    [2, 3, 3],
    [2, 17, 1],
    [9, 16, 2],
    [1, 13, 3],
    [7, 13, 2],
    [19, 19, 3],
    [0, 2, 2],
    [8, 16, 3],
    [16, 5, 3],
    [19, 9, 3],
    [18, 14, 1],
    [7, 0, 1],
    [10, 3, 1],
    [12, 4, 1],
    [1, 9, 3],
    [3, 19, 1],
    [18, 0, 1],
    [6, 18, 3],
    [6, 17, 2],
    [9, 6, 2],
    [15, 2, 3],
    [11, 3, 2],
    [13, 10, 3],
    [3, 4, 1],
    [9, 17, 1],
    [16, 17, 1],
    [6, 19, 3],
    [13, 6, 3],
  ],
  [
    [15, 19, 1],
    [0, 4, 2],
    [19, 19, 2],
    [11, 2, 2],
    [15, 1, 3],
    [6, 12, 1],
    [19, 5, 2],
    [12, 15, 1],
    [2, 2, 3],
    [3, 1, 3],
    [19, 17, 3],
    [13, 16, 2],
    [2, 1, 3],
    [5, 7, 1],
    [13, 7, 3],
    [15, 1, 2],
    [2, 1, 3],
    [4, 18, 3],
    [5, 0, 3],
    [1, 10, 1],
    [15, 11, 3],
    [5, 3, 2],
    [14, 17, 1],
    [14, 3, 1],
    [12, 5, 2],
    [4, 7, 3],
  ],
  [
    [2, 7, 3],
    [8, 18, 3],
    [19, 16, 3],
    [17, 8, 3],
    [17, 17, 3],
    [14, 7, 1],
    [13, 13, 2],
    [9, 15, 1],
    [10, 19, 2],
    [15, 4, 2],
    [7, 12, 1],
    [15, 14, 1],
    [8, 4, 2],
    [19, 8, 3],
    [5, 4, 3],
    [1, 9, 1],
    [14, 17, 1],
    [5, 18, 3],
    [8, 1, 2],
    [6, 2, 1],
    [10, 18, 1],
    [15, 9, 1],
  ],
  [
    [8, 16, 2],
    [9, 10, 3],
    [3, 11, 1],
    [6, 0, 1],
    [0, 3, 3],
    [9, 10, 1],
    [4, 14, 3],
    [10, 18, 3],
    [10, 6, 1],
    [12, 9, 3],
    [18, 2, 2],
    [16, 1, 1],
    [0, 7, 3],
    [19, 8, 1],
    [16, 16, 1],
    [4, 8, 2],
    [12, 1, 3],
    [13, 6, 2],
    [14, 18, 2],
    [19, 18, 3],
    [1, 13, 1],
    [4, 1, 1],
    [11, 3, 3],
    [0, 5, 3],
  ],
  [
    [0, 14, 3],
    [5, 15, 1],
    [3, 19, 3],
    [18, 5, 2],
    [15, 18, 2],
    [13, 19, 2],
    [8, 5, 1],
    [11, 1, 3],
    [19, 11, 1],
    [19, 15, 1],
    [18, 3, 2],
    [3, 2, 2],
    [18, 13, 3],
    [3, 18, 1],
    [4, 3, 3],
    [8, 7, 3],
    [18, 12, 2],
    [14, 12, 1],
    [1, 3, 3],
    [3, 10, 2],
    [0, 19, 3],
    [19, 14, 2],
    [10, 11, 1],
    [19, 11, 2],
    [16, 4, 3],
    [5, 10, 1],
    [0, 11, 3],
  ],
  [
    [19, 8, 2],
    [14, 11, 2],
    [5, 11, 2],
    [13, 1, 3],
    [17, 5, 1],
    [5, 16, 1],
    [19, 4, 1],
    [11, 17, 3],
    [14, 10, 3],
    [15, 16, 2],
    [10, 3, 2],
    [3, 15, 3],
    [1, 11, 3],
    [10, 17, 3],
    [11, 9, 3],
    [3, 15, 2],
    [8, 1, 2],
    [15, 13, 1],
    [3, 13, 1],
    [6, 8, 2],
    [18, 15, 1],
    [14, 16, 1],
    [16, 13, 3],
    [10, 18, 1],
    [1, 14, 3],
    [17, 13, 3],
    [4, 2, 3],
    [14, 13, 2],
    [1, 17, 3],
    [9, 8, 3],
    [13, 9, 3],
  ],
  [
    [8, 18, 2],
    [11, 13, 2],
    [4, 14, 3],
    [15, 15, 3],
    [9, 12, 2],
    [4, 5, 1],
    [15, 14, 1],
    [9, 18, 1],
    [15, 9, 3],
    [14, 13, 2],
    [14, 18, 3],
    [18, 1, 3],
    [2, 1, 1],
    [12, 13, 1],
    [17, 12, 2],
    [19, 0, 3],
    [4, 13, 2],
    [15, 5, 3],
    [15, 12, 2],
    [8, 17, 1],
    [18, 15, 1],
    [2, 9, 2],
    [14, 0, 2],
    [16, 8, 2],
    [8, 0, 1],
  ],
  [
    [16, 1, 3],
    [11, 4, 2],
    [15, 19, 3],
    [5, 14, 2],
    [10, 17, 3],
    [11, 5, 1],
    [10, 12, 3],
    [2, 10, 3],
    [6, 7, 1],
    [2, 12, 2],
    [18, 7, 3],
    [1, 2, 1],
    [11, 5, 1],
    [12, 11, 3],
    [4, 9, 2],
    [9, 18, 1],
    [1, 10, 2],
    [18, 0, 3],
    [19, 18, 3],
    [15, 3, 1],
    [19, 2, 2],
    [16, 19, 2],
    [13, 9, 1],
    [11, 15, 2],
  ],
  [
    [11, 19, 2],
    [7, 6, 2],
    [4, 12, 3],
    [6, 10, 3],
    [9, 7, 2],
    [3, 8, 1],
    [6, 8, 1],
    [9, 13, 1],
    [11, 9, 1],
    [12, 8, 1],
    [0, 19, 2],
    [13, 13, 3],
    [19, 2, 1],
    [16, 5, 1],
    [16, 7, 1],
    [12, 12, 1],
    [16, 16, 1],
    [19, 0, 2],
    [14, 1, 2],
    [1, 4, 2],
    [9, 9, 3],
    [0, 15, 1],
    [1, 0, 1],
    [10, 12, 3],
    [10, 19, 3],
    [5, 3, 2],
  ],
  [
    [8, 17, 3],
    [8, 13, 1],
    [2, 9, 1],
    [18, 2, 3],
    [13, 5, 2],
    [13, 2, 1],
    [19, 0, 2],
    [13, 4, 3],
    [18, 17, 1],
    [7, 15, 1],
    [5, 15, 2],
    [4, 13, 2],
    [1, 11, 1],
    [19, 9, 3],
    [3, 0, 3],
    [7, 16, 3],
    [4, 16, 3],
    [0, 9, 1],
    [17, 17, 3],
    [4, 5, 1],
    [17, 16, 3],
    [15, 16, 2],
    [5, 0, 1],
  ],
  [
    [17, 19, 1],
    [7, 18, 2],
    [19, 5, 3],
    [16, 15, 1],
    [15, 13, 1],
    [12, 19, 1],
    [8, 15, 2],
    [6, 5, 3],
    [8, 16, 1],
    [11, 10, 3],
    [16, 10, 2],
    [8, 10, 3],
    [18, 15, 3],
    [1, 14, 2],
    [16, 9, 3],
    [15, 11, 1],
    [14, 10, 1],
    [8, 11, 2],
    [18, 17, 2],
    [12, 0, 1],
    [18, 2, 3],
    [11, 8, 1],
    [12, 9, 1],
    [5, 1, 1],
    [17, 7, 2],
    [7, 15, 1],
    [9, 13, 1],
    [14, 19, 3],
    [2, 11, 2],
    [7, 2, 1],
    [17, 0, 3],
    [11, 14, 3],
    [5, 16, 1],
    [16, 10, 3],
  ],
  [
    [2, 16, 1],
    [12, 17, 2],
    [18, 3, 1],
    [9, 7, 3],
    [17, 15, 1],
    [16, 1, 1],
    [1, 6, 1],
    [8, 5, 3],
    [8, 13, 2],
    [1, 19, 3],
    [3, 11, 3],
    [3, 6, 3],
    [19, 15, 1],
    [14, 1, 3],
    [15, 5, 1],
    [2, 7, 3],
    [4, 15, 3],
    [0, 3, 1],
    [9, 9, 3],
    [3, 19, 1],
    [5, 18, 2],
    [6, 2, 1],
    [10, 14, 1],
    [19, 13, 2],
    [11, 10, 3],
    [3, 2, 3],
  ],
  [
    [1, 3, 2],
    [4, 11, 1],
    [9, 19, 2],
    [3, 8, 3],
    [7, 4, 2],
    [8, 18, 3],
    [2, 11, 2],
    [10, 2, 2],
    [2, 10, 2],
    [3, 0, 3],
    [14, 12, 2],
    [16, 3, 1],
    [14, 11, 1],
    [17, 17, 2],
    [9, 14, 2],
    [17, 13, 3],
    [10, 12, 3],
    [2, 14, 1],
    [13, 8, 1],
    [8, 9, 3],
    [13, 5, 3],
    [15, 12, 2],
    [12, 15, 1],
    [16, 12, 2],
    [16, 11, 1],
    [19, 12, 3],
  ],
  [
    [11, 5, 3],
    [1, 19, 1],
    [0, 5, 2],
    [4, 10, 1],
    [11, 15, 2],
    [14, 14, 3],
    [0, 7, 1],
    [2, 19, 2],
    [2, 5, 3],
    [10, 3, 2],
    [8, 3, 3],
    [18, 10, 1],
    [2, 13, 3],
    [10, 4, 2],
    [2, 19, 3],
    [18, 4, 3],
    [16, 11, 1],
    [7, 3, 2],
    [17, 15, 1],
    [4, 15, 2],
    [2, 10, 2],
    [6, 9, 2],
    [1, 16, 2],
    [12, 14, 1],
    [9, 16, 1],
  ],
  [
    [2, 6, 1],
    [17, 18, 1],
    [15, 6, 2],
    [2, 3, 3],
    [8, 8, 2],
    [1, 19, 1],
    [6, 5, 1],
    [14, 17, 1],
    [7, 3, 2],
    [17, 11, 1],
    [1, 10, 1],
    [18, 0, 2],
    [0, 6, 1],
    [19, 0, 3],
    [19, 19, 2],
    [14, 10, 3],
    [12, 11, 2],
    [12, 6, 3],
    [8, 5, 2],
    [0, 12, 1],
    [6, 1, 3],
    [16, 17, 2],
    [7, 12, 3],
    [8, 10, 3],
    [1, 1, 3],
    [7, 11, 2],
    [19, 4, 2],
    [11, 7, 2],
  ],
  [
    [9, 3, 3],
    [8, 7, 1],
    [15, 0, 1],
    [15, 7, 3],
    [15, 13, 1],
    [4, 17, 1],
    [18, 1, 1],
    [18, 10, 2],
    [8, 6, 3],
    [7, 0, 2],
    [14, 3, 3],
    [14, 8, 1],
    [6, 17, 2],
    [16, 1, 1],
    [1, 15, 2],
    [19, 9, 3],
    [14, 7, 1],
    [13, 3, 2],
    [0, 5, 3],
    [13, 6, 3],
    [0, 6, 3],
    [3, 18, 3],
  ],
  [
    [4, 1, 3],
    [17, 4, 3],
    [7, 1, 3],
    [1, 12, 2],
    [7, 12, 3],
    [18, 4, 2],
    [7, 3, 2],
    [15, 16, 2],
    [11, 14, 3],
    [19, 18, 3],
    [0, 19, 1],
    [10, 11, 2],
    [2, 9, 2],
    [18, 15, 1],
    [16, 8, 3],
    [13, 6, 3],
    [8, 2, 1],
    [12, 3, 3],
    [16, 17, 2],
    [3, 8, 1],
    [3, 8, 3],
  ],
];
const meths = [groupFindMin];

console.time("timer");
test(tests);
console.timeEnd("timer");

//
// Display Zone
//
function display(coor, i, max, n, meth) {
  const parent = document.createElement("div");
  parent.style.display = "flex";

  const { groups, travels } = meth(coor, max, n);
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

  const groupArr = Array.from({ length: x + 1 }, () =>
    new Array(y + 1).fill(0)
  );
  const weightArr = Array.from({ length: x + 1 }, () =>
    new Array(y + 1).fill(0)
  );

  coordinates.forEach((coordinate) => {
    groupArr[coordinate[1]][coordinate[0]] = 1;
    weightArr[coordinate[1]][coordinate[0]] = coordinate[2];
  });

  groups.forEach((group, i) => {
    group.forEach((location) => {
      groupArr[location[1]][location[0]] = i === groups.length - 1 ? 1 : i + 3;
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
      cell.textContent = `${j}, ${i}, ${weightArr[i][j]}`;
      cell.style.textAlign = "center";
      cell.style.backgroundColor = colors[groupArr[i][j]];
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
      let z = Math.floor(Math.random() * 3) + 1;
      coordinates.push([x, y, z]);
    }
    tests.push("[" + coordinates.join("], [") + "]");
  }
  console.log("[" + tests.join("], [") + "]");
}
function test(tests) {
  tests.forEach((test, i) => {
    meths.map((meth) => display(test, i, maxWeight, n, meth));
    document.body.appendChild(document.createElement("br"));
  });
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
      curLocation: [Math.floor(y / 2), Math.floor(x / 2)],
      travel: 0,
      weight: 0,
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
function getDistance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}
function getRandomJob(coordinates, added) {
  let rand = Math.floor(Math.random() * coordinates.length);
  if (added.every((el) => el)) return -1;
  while (added[rand]) {
    rand = Math.floor(Math.random() * coordinates.length);
  }
  added[rand] = true;
  return rand;
}

// K means clustering with x iterations with randomly chosen coordinates
// RUNTIME: O(number of iterations * number of jobs * number of technicians)

// Iterating multiple times to find the best K-means cluster
function groupFindMin(coordinates, max, n) {
  let res;
  let minTravel = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < numIterations; i++) {
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
    technicians[i].weight += coordinates[rand][2];
  }

  coordinates.forEach((coor, i) => {
    if (added[i]) return;
    const index = closestTech(coordinates, i, startPoints, technicians);
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
    travels: technicians.map((tech) => tech.travel),
  };
}

function closestTech(coordinates, x, startPoints, technicians) {
  const inits = startPoints.map((el) => coordinates[el]);
  let minDistance = Number.MAX_SAFE_INTEGER;
  const closest = inits.reduce((minIndex, init, i) => {
    if (technicians[i].weight + coordinates[x][2] > maxWeight) return minIndex;

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
