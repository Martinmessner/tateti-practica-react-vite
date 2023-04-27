export const winningCombinations = [
    [0, 1, 2],  // horizontal wins
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],  // vertical wins
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],  // diagonal wins
    [2, 4, 6]
];


export const PLAYERS = {
    X: "X",
    O: "O"
  }
  
export const STATUS = {
    PLAYING: "playing",
    X_WIN: "X",
    O_WIN: "O",
    DRAW: "draw"
  }