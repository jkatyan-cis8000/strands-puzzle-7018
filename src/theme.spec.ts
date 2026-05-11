import { describe, it, expect } from 'vitest';
import { createGrid, setLetter } from './grid';
import { findThemeWords, isSpangram, validateWordOnGrid, getThemeBySpangram } from './theme';
import { THEMES } from './types';

describe('theme', () => {
  describe('findThemeWords', () => {
    it('should find words in the grid', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 0, 1, 'P');
      setLetter(grid, 0, 2, 'P');
      setLetter(grid, 0, 3, 'L');
      setLetter(grid, 0, 4, 'E');

      const theme = THEMES[0];
      const found = findThemeWords(grid, theme);

      const appleMatch = found.find((f) => f.word === 'APPLE');
      expect(appleMatch).toBeDefined();
      expect(appleMatch?.positions).toHaveLength(5);
    });

    it('should find multiple words in the grid', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 0, 1, 'P');
      setLetter(grid, 0, 2, 'P');
      setLetter(grid, 0, 3, 'L');
      setLetter(grid, 0, 4, 'E');
      setLetter(grid, 1, 0, 'B');
      setLetter(grid, 1, 1, 'A');
      setLetter(grid, 1, 2, 'N');
      setLetter(grid, 1, 3, 'A');
      setLetter(grid, 1, 4, 'N');
      setLetter(grid, 1, 5, 'A');

      const theme = THEMES[0];
      const found = findThemeWords(grid, theme);

      expect(found).toHaveLength(2);
    });

    it('should not find words that are not in the grid', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'X');
      setLetter(grid, 0, 1, 'X');
      setLetter(grid, 0, 2, 'X');

      const theme = THEMES[0];
      const found = findThemeWords(grid, theme);

      const appleMatch = found.find((f) => f.word === 'APPLE');
      expect(appleMatch).toBeUndefined();
    });

    it('should find words in vertical direction', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 1, 0, 'P');
      setLetter(grid, 2, 0, 'P');
      setLetter(grid, 3, 0, 'L');
      setLetter(grid, 4, 0, 'E');

      const theme = THEMES[0];
      const found = findThemeWords(grid, theme);

      const appleMatch = found.find((f) => f.word === 'APPLE');
      expect(appleMatch).toBeDefined();
    });

    it('should find words in diagonal direction', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 1, 1, 'P');
      setLetter(grid, 2, 2, 'P');
      setLetter(grid, 3, 3, 'L');
      setLetter(grid, 4, 4, 'E');

      const theme = THEMES[0];
      const found = findThemeWords(grid, theme);

      const appleMatch = found.find((f) => f.word === 'APPLE');
      expect(appleMatch).toBeDefined();
    });
  });

  describe('isSpangram', () => {
    it('should return true for top-to-bottom spangram', () => {
      const positions = [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 3, col: 2 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });

    it('should return true for left-to-right spangram', () => {
      const positions = [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });

    it('should return true for diagonal spangram (top-left to bottom-right)', () => {
      const positions = [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 3, col: 3 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });

    it('should return true for diagonal spangram (top-right to bottom-left)', () => {
      const positions = [
        { row: 0, col: 7 },
        { row: 1, col: 6 },
        { row: 2, col: 5 },
        { row: 3, col: 4 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });

    it('should return false for word not touching opposite sides', () => {
      const positions = [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(false);
    });

    it('should return false for single cell', () => {
      const positions = [{ row: 0, col: 0 }];
      expect(isSpangram(positions, 6, 8)).toBe(false);
    });

    it('should return false for empty positions', () => {
      const positions: Position[] = [];
      expect(isSpangram(positions, 6, 8)).toBe(false);
    });

    it('should return true for spangram ending at top', () => {
      const positions = [
        { row: 5, col: 3 },
        { row: 4, col: 3 },
        { row: 3, col: 3 },
        { row: 2, col: 3 },
        { row: 1, col: 3 },
        { row: 0, col: 3 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });

    it('should return true for spangram ending at left', () => {
      const positions = [
        { row: 3, col: 7 },
        { row: 3, col: 6 },
        { row: 3, col: 5 },
        { row: 3, col: 4 },
        { row: 3, col: 3 },
        { row: 3, col: 2 },
        { row: 3, col: 1 },
        { row: 3, col: 0 },
      ];
      expect(isSpangram(positions, 6, 8)).toBe(true);
    });
  });

  describe('validateWordOnGrid', () => {
    it('should find a word in the grid', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 0, 1, 'P');
      setLetter(grid, 0, 2, 'P');
      setLetter(grid, 0, 3, 'L');
      setLetter(grid, 0, 4, 'E');

      const result = validateWordOnGrid(grid, 'APPLE');
      expect(result.found).toBe(true);
      expect(result.positions).toHaveLength(5);
    });

    it('should return not found for missing word', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'X');
      setLetter(grid, 0, 1, 'X');
      setLetter(grid, 0, 2, 'X');

      const result = validateWordOnGrid(grid, 'APPLE');
      expect(result.found).toBe(false);
      expect(result.positions).toHaveLength(0);
    });

    it('should find word in vertical direction', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 1, 0, 'P');
      setLetter(grid, 2, 0, 'P');
      setLetter(grid, 3, 0, 'L');
      setLetter(grid, 4, 0, 'E');

      const result = validateWordOnGrid(grid, 'APPLE');
      expect(result.found).toBe(true);
      expect(result.positions[0]).toEqual({ row: 0, col: 0 });
      expect(result.positions[4]).toEqual({ row: 4, col: 0 });
    });

    it('should find word in diagonal direction', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'A');
      setLetter(grid, 1, 1, 'P');
      setLetter(grid, 2, 2, 'P');
      setLetter(grid, 3, 3, 'L');
      setLetter(grid, 4, 4, 'E');

      const result = validateWordOnGrid(grid, 'APPLE');
      expect(result.found).toBe(true);
      expect(result.positions[4]).toEqual({ row: 4, col: 4 });
    });

    it('should handle word not matching at starting position', () => {
      const grid = createGrid();
      setLetter(grid, 0, 0, 'X');
      setLetter(grid, 0, 1, 'P');
      setLetter(grid, 0, 2, 'P');
      setLetter(grid, 0, 3, 'L');
      setLetter(grid, 0, 4, 'E');

      const result = validateWordOnGrid(grid, 'APPLE');
      expect(result.found).toBe(false);
    });
  });

  describe('getThemeBySpangram', () => {
    it('should find theme by spangram', () => {
      const theme = getThemeBySpangram(THEMES, 'APPLEBAN');
      expect(theme).toBeDefined();
      expect(theme?.name).toBe('Fruits');
    });

    it('should return null for non-existent spangram', () => {
      const theme = getThemeBySpangram(THEMES, 'INVALID');
      expect(theme).toBeNull();
    });

    it('should match exact spangram', () => {
      const theme = getThemeBySpangram(THEMES, 'TIGERSLO');
      expect(theme?.name).toBe('Animals');
    });
  });
});
