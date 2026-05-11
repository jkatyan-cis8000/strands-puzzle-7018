import { describe, it, expect, beforeEach } from 'vitest';
import { createGrid, getLetter, setLetter, isValidGridPosition, cloneGrid } from './grid';

describe('grid', () => {
  describe('createGrid', () => {
    it('creates a 6x8 grid', () => {
      const grid = createGrid();
      expect(grid.length).toBe(6);
      grid.forEach(row => {
        expect(row.length).toBe(8);
      });
    });

    it('fills grid with uppercase letters', () => {
      const grid = createGrid();
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      grid.forEach(row => {
        row.forEach(cell => {
          expect(letters).toContain(cell);
        });
      });
    });
  });

  describe('isValidGridPosition', () => {
    it('returns true for valid positions', () => {
      expect(isValidGridPosition(0, 0)).toBe(true);
      expect(isValidGridPosition(5, 7)).toBe(true);
      expect(isValidGridPosition(2, 3)).toBe(true);
    });

    it('returns false for invalid positions', () => {
      expect(isValidGridPosition(-1, 0)).toBe(false);
      expect(isValidGridPosition(0, -1)).toBe(false);
      expect(isValidGridPosition(6, 0)).toBe(false);
      expect(isValidGridPosition(0, 8)).toBe(false);
      expect(isValidGridPosition(10, 10)).toBe(false);
    });
  });

  describe('getLetter', () => {
    let grid: string[][];

    beforeEach(() => {
      grid = createGrid();
    });

    it('returns letter at valid position', () => {
      const letter = getLetter(grid, 0, 0);
      expect(letter).toMatch(/[A-Z]/);
    });

    it('throws error for invalid position', () => {
      expect(() => getLetter(grid, -1, 0)).toThrow();
      expect(() => getLetter(grid, 6, 0)).toThrow();
    });
  });

  describe('setLetter', () => {
    let grid: string[][];

    beforeEach(() => {
      grid = createGrid();
    });

    it('sets letter at valid position', () => {
      setLetter(grid, 0, 0, 'X');
      expect(getLetter(grid, 0, 0)).toBe('X');
    });

    it('throws error for invalid position', () => {
      expect(() => setLetter(grid, -1, 0, 'A')).toThrow();
      expect(() => setLetter(grid, 6, 0, 'A')).toThrow();
    });

    it('validates letter is a single uppercase character', () => {
      expect(() => setLetter(grid, 0, 0, 'AB')).toThrow();
      expect(() => setLetter(grid, 0, 0, 'a')).toThrow();
      expect(() => setLetter(grid, 0, 0, '')).toThrow();
    });
  });

  describe('cloneGrid', () => {
    let grid: string[][];

    beforeEach(() => {
      grid = createGrid();
    });

    it('creates a deep copy of the grid', () => {
      const clone = cloneGrid(grid);
      expect(clone).toEqual(grid);
      expect(clone).not.toBe(grid);
    });

    it('modifying clone does not affect original', () => {
      const clone = cloneGrid(grid);
      setLetter(clone, 0, 0, 'X');
      expect(getLetter(grid, 0, 0)).not.toBe('X');
    });
  });
});
