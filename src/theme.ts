import type { Grid, Theme, Word, Position } from './types';

/**
 * Extract all theme words from the grid
 */
export function findThemeWords(grid: Grid, themes: Theme[]): Word[] {
  const foundWords: Word[] = [];
  const foundSet = new Set<string>();
  
  for (const theme of themes) {
    for (const word of theme.words) {
      const positions = findWordInGrid(grid, word);
      if (positions) {
        foundWords.push({
          id: word,
          text: word,
          positions,
          isSpangram: word === theme.spangram,
          theme: theme.name,
        });
        foundSet.add(word);
      }
    }
  }
  
  return foundWords;
}

/**
 * Find a specific word in the grid and return its positions
 */
export function findWordInGrid(grid: Grid, word: string): Position[] | null {
  const rows = grid.length;
  const cols = grid[0].length;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === word[0]) {
        // Try all 8 directions
        const directions = [
          [0, 1], [0, -1], [1, 0], [-1, 0],  // cardinal
          [1, 1], [1, -1], [-1, 1], [-1, -1] // diagonals
        ];
        
        for (const [dRow, dCol] of directions) {
          const positions = findWordInDirection(grid, word, row, col, dRow, dCol);
          if (positions) {
            return positions;
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Try to find a word in a specific direction from a starting position
 */
function findWordInDirection(
  grid: Grid,
  word: string,
  startRow: number,
  startCol: number,
  dRow: number,
  dCol: number
): Position[] | null {
  const positions: Position[] = [];
  
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * dRow;
    const col = startCol + i * dCol;
    
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return null;
    }
    
    if (grid[row][col] !== word[i]) {
      return null;
    }
    
    positions.push({ row, col });
  }
  
  return positions;
}

/**
 * Check if a word is a spangram (touches two opposite sides)
 */
export function isSpangram(word: string, positions: Position[], rows: number, cols: number): boolean {
  if (positions.length === 0) return false;
  
  const first = positions[0];
  const last = positions[positions.length - 1];
  
  // Check if first touches one side and last touches opposite side
  const firstTouchesTop = first.row === 0;
  const firstTouchesBottom = first.row === rows - 1;
  const firstTouchesLeft = first.col === 0;
  const firstTouchesRight = first.col === cols - 1;
  
  const lastTouchesTop = last.row === 0;
  const lastTouchesBottom = last.row === rows - 1;
  const lastTouchesLeft = last.col === 0;
  const lastTouchesRight = last.col === cols - 1;
  
  // Check all opposite side combinations
  return (
    (firstTouchesTop && lastTouchesBottom) ||
    (firstTouchesBottom && lastTouchesTop) ||
    (firstTouchesLeft && lastTouchesRight) ||
    (firstTouchesRight && lastTouchesLeft) ||
    // Diagonal: top-left to bottom-right
    (firstTouchesTop && firstTouchesLeft && lastTouchesBottom && lastTouchesRight) ||
    // Diagonal: top-right to bottom-left
    (firstTouchesTop && firstTouchesRight && lastTouchesBottom && lastTouchesLeft) ||
    // Diagonal: bottom-left to top-right
    (firstTouchesBottom && firstTouchesLeft && lastTouchesTop && lastTouchesRight) ||
    // Diagonal: bottom-right to top-left
    (firstTouchesBottom && firstTouchesRight && lastTouchesTop && lastTouchesLeft)
  );
}

/**
 * Get the spangram word for a theme
 */
export function getSpangramForTheme(theme: Theme): string {
  return theme.spangram;
}

/**
 * Find all themes that have their words in the grid
 */
export function findCompletedThemes(themes: Theme[], foundWords: Word[]): string[] {
  const foundWordsSet = new Set(foundWords.map(w => w.text));
  return themes.filter(t => 
    t.words.every(word => foundWordsSet.has(word)) && foundWordsSet.has(t.spangram)
  ).map(t => t.name);
}
