import type { GameState, Grid, Theme, Word } from './types';
import { HINT_INTERVAL } from './hint';

/**
 * Create a new game state with initial values
 */
export function createGameState(themes: Theme[]): GameState {
  const grid: Grid = Array(6).fill(null).map(() => Array(8).fill(''));
  
  return {
    grid,
    foundWords: [],
    foundWordsSet: new Set<string>(),
    foundThemeWords: [],
    foundNonThemeWords: [],
    hintsUnlocked: 0,
    gameOver: false,
  };
}

/**
 * Update the game state after finding a word
 */
export function handleWordFound(gameState: GameState, word: Word, themes: Theme[]): GameState {
  const newFoundWords = [...gameState.foundWords];
  const newFoundWordsSet = new Set(gameState.foundWordsSet);
  
  // Add word if not already found
  if (!newFoundWordsSet.has(word.text)) {
    newFoundWords.push(word);
    newFoundWordsSet.add(word.text);
  }
  
  // Update grid with found positions
  const newGrid = gameState.grid.map(row => [...row]);
  
  for (const pos of word.positions) {
    // Mark cell as found
    if (newGrid[pos.row][pos.col] !== '') {
      // Grid cell already has letter - keep it
    }
  }
  
  return {
    ...gameState,
    grid: newGrid,
    foundWords: newFoundWords,
    foundWordsSet: newFoundWordsSet,
  };
}

/**
 * Check if the game is completed
 */
export function isGameCompleted(gameState: GameState, themes: Theme[]): boolean {
  // Check if all theme words are found
  const foundWordsSet = gameState.foundWordsSet;
  
  for (const theme of themes) {
    // All words in theme must be found
    const allWordsFound = theme.words.every(word => foundWordsSet.has(word));
    if (!allWordsFound) {
      return false;
    }
    
    // Spangram must be found
    if (!foundWordsSet.has(theme.spangram)) {
      return false;
    }
  }
  
  // Check if board is filled (no empty cells)
  for (let row = 0; row < gameState.grid.length; row++) {
    for (let col = 0; col < gameState.grid[row].length; col++) {
      if (gameState.grid[row][col] === '') {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Fill empty cells in the grid with random letters
 */
export function fillEmptyCells(gameState: GameState): GameState {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const newGrid = gameState.grid.map(row => 
    row.map(cell => cell === '' ? letters[Math.floor(Math.random() * letters.length)] : cell)
  );
  
  return {
    ...gameState,
    grid: newGrid,
  };
}

/**
 * Get the number of words remaining to complete the puzzle
 */
export function getWordsRemaining(gameState: GameState, themes: Theme[]): number {
  let remaining = 0;
  
  for (const theme of themes) {
    for (const word of theme.words) {
      if (!gameState.foundWordsSet.has(word)) {
        remaining++;
      }
    }
    
    if (!gameState.foundWordsSet.has(theme.spangram)) {
      remaining++;
    }
  }
  
  return remaining;
}

/**
 * Reset the game state for a new game
 */
export function resetGameState(themes: Theme[]): GameState {
  return createGameState(themes);
}

/**
 * Get progress percentage
 */
export function getProgressPercentage(gameState: GameState, themes: Theme[]): number {
  const totalWords = themes.reduce((acc, theme) => acc + theme.words.length + 1, 0); // +1 for spangram
  const foundCount = gameState.foundWords.length;
  
  return Math.round((foundCount / totalWords) * 100);
}
