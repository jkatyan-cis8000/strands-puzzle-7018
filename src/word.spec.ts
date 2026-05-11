import { isValidPath, extractWord, getNeighbors, isAdjacent, calculatePathLength } from './word';

describe('word', () => {
  const grid: string[][] = [
    ['H', 'E', 'L', 'L', 'O'],
    ['W', 'O', 'R', 'L', 'D'],
    ['F', 'O', 'O', 'D', 'E'],
  ];

  describe('getNeighbors', () => {
    it('should return 8 neighbors for a cell in the middle', () => {
      const neighbors = getNeighbors(1, 2);
      expect(neighbors).toHaveLength(8);
    });

    it('should return correct neighbors for a corner cell', () => {
      const neighbors = getNeighbors(0, 0);
      expect(neighbors).toHaveLength(3);
      expect(neighbors).toEqual([
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ]);
    });

    it('should return correct neighbors for an edge cell', () => {
      const neighbors = getNeighbors(0, 2);
      expect(neighbors).toHaveLength(5);
    });
  });

  describe('isAdjacent', () => {
    it('should return true for adjacent cells (horizontal)', () => {
      expect(isAdjacent({ row: 0, col: 0 }, { row: 0, col: 1 })).toBe(true);
    });

    it('should return true for adjacent cells (vertical)', () => {
      expect(isAdjacent({ row: 0, col: 0 }, { row: 1, col: 0 })).toBe(true);
    });

    it('should return true for adjacent cells (diagonal)', () => {
      expect(isAdjacent({ row: 0, col: 0 }, { row: 1, col: 1 })).toBe(true);
    });

    it('should return false for non-adjacent cells', () => {
      expect(isAdjacent({ row: 0, col: 0 }, { row: 2, col: 2 })).toBe(false);
    });

    it('should return false for the same cell', () => {
      expect(isAdjacent({ row: 0, col: 0 }, { row: 0, col: 0 })).toBe(false);
    });
  });

  describe('extractWord', () => {
    it('should extract word from positions', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ];
      const word = extractWord(grid, positions);
      expect(word).toBe('HEL');
    });

    it('should work with diagonal paths', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ];
      const word = extractWord(grid, positions);
      expect(word).toBe('HRR');
    });
  });

  describe('isValidPath', () => {
    it('should return true for valid horizontal path', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ];
      expect(isValidPath(grid, positions)).toBe(true);
    });

    it('should return true for valid vertical path', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
      ];
      expect(isValidPath(grid, positions)).toBe(true);
    });

    it('should return true for valid diagonal path', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
      ];
      expect(isValidPath(grid, positions)).toBe(true);
    });

    it('should return true for changing direction', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 1 },
      ];
      expect(isValidPath(grid, positions)).toBe(true);
    });

    it('should return false for non-adjacent cells', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 2 },
      ];
      expect(isValidPath(grid, positions)).toBe(false);
    });

    it('should return false for repeated cells', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 0 },
      ];
      expect(isValidPath(grid, positions)).toBe(false);
    });

    it('should return false for empty path', () => {
      expect(isValidPath(grid, [])).toBe(false);
    });

    it('should return false for out of bounds positions', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: -1, col: 0 },
      ];
      expect(isValidPath(grid, positions)).toBe(false);
    });
  });

  describe('calculatePathLength', () => {
    it('should return the number of positions', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
      ];
      expect(calculatePathLength(grid, positions)).toBe(3);
    });

    it('should return 0 for empty path', () => {
      expect(calculatePathLength(grid, [])).toBe(0);
    });
  });
});
