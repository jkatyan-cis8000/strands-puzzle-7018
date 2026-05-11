import type { Grid } from './types';

export function createGrid(): Grid {
  const grid: Grid = [];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < 6; row++) {
    const rowArray: string[] = [];
    for (let col = 0; col < 8; col++) {
      rowArray.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    grid.push(rowArray);
  }
  return grid;
}

export function getLetter(grid: Grid, row: number, col: number): string {
  if (!isValidGridPosition(row, col)) {
    throw new Error(`Invalid grid position: (${row}, ${col})`);
  }
  return grid[row][col];
}

export function setLetter(grid: Grid, row: number, col: number, letter: string): void {
  if (!isValidGridPosition(row, col)) {
    throw new Error(`Invalid grid position: (${row}, ${col})`);
  }
  if (letter.length !== 1 || !/[A-Z]/.test(letter)) {
    throw new Error(`Invalid letter: ${letter}`);
  }
  grid[row][col] = letter;
}

export function isValidGridPosition(row: number, col: number): boolean {
  return row >= 0 && row < 6 && col >= 0 && col < 8;
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map(row => [...row]);
}
