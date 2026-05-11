import type { Position, Grid } from './types';

export function getNeighbors(row: number, col: number): Position[] {
  const neighbors: Position[] = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (const [dRow, dCol] of directions) {
    neighbors.push({ row: row + dRow, col: col + dCol });
  }

  return neighbors;
}

export function isAdjacent(pos1: Position, pos2: Position): boolean {
  const dRow = Math.abs(pos1.row - pos2.row);
  const dCol = Math.abs(pos1.col - pos2.col);
  return dRow <= 1 && dCol <= 1 && (dRow > 0 || dCol > 0);
}

export function extractWord(grid: Grid, positions: Position[]): string {
  return positions.map((pos) => grid[pos.row][pos.col]).join('');
}

export function isValidPath(grid: Grid, positions: Position[]): boolean {
  if (positions.length === 0) {
    return false;
  }

  const visited = new Set<string>();

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];

    if (pos.row < 0 || pos.row >= grid.length) {
      return false;
    }
    if (pos.col < 0 || pos.col >= grid[0].length) {
      return false;
    }

    const posKey = `${pos.row},${pos.col}`;
    if (visited.has(posKey)) {
      return false;
    }
    visited.add(posKey);

    if (i > 0) {
      const prevPos = positions[i - 1];
      if (!isAdjacent(prevPos, pos)) {
        return false;
      }
    }
  }

  return true;
}

export function calculatePathLength(grid: Grid, positions: Position[]): number {
  return positions.length;
}
