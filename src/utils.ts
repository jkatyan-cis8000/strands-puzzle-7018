import type { Position, Direction } from './types';

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < 6 && col >= 0 && col < 8;
};

export const getDirection = (start: Position, end: Position): Direction => {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  if (rowDiff === 0 && colDiff > 0) return Direction.RIGHT;
  if (rowDiff === 0 && colDiff < 0) return Direction.LEFT;
  if (rowDiff > 0 && colDiff === 0) return Direction.DOWN;
  if (rowDiff < 0 && colDiff === 0) return Direction.UP;
  if (rowDiff > 0 && colDiff > 0) return Direction.DOWN_RIGHT;
  if (rowDiff > 0 && colDiff < 0) return Direction.DOWN_LEFT;
  if (rowDiff < 0 && colDiff > 0) return Direction.UP_RIGHT;
  if (rowDiff < 0 && colDiff < 0) return Direction.UP_LEFT;

  throw new Error('Invalid direction: start and end positions are not aligned');
};

export const formatPosition = (row: number, col: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return `${letters[row]}${col + 1}`;
};
