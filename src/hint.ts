import type { GameState, Word } from './types';

export const HINT_INTERVAL = 3;

/**
 * Check if a hint should be unlocked after finding a non-theme word
 */
export function shouldUnlockHint(gameState: GameState): boolean {
  const nonThemeWordsCount = gameState.nonThemeWords.length;
  return nonThemeWordsCount > 0 && nonThemeWordsCount % HINT_INTERVAL === 0;
}

/**
 * Add a non-theme word to the game state and unlock a hint if needed
 */
export function addNonThemeWord(gameState: GameState, word: string): GameState {
  const newNonThemeWords = [...gameState.nonThemeWords, word];
  const newHintsUnlocked = Math.floor(newNonThemeWords.length / HINT_INTERVAL);
  
  return {
    ...gameState,
    nonThemeWords: newNonThemeWords,
    hintsUnlocked: newHintsUnlocked,
  };
}

/**
 * Get the number of hints that can be unlocked
 */
export function getAvailableHints(gameState: GameState): number {
  return gameState.hintsUnlocked;
}

/**
 * Reset hints when a new game starts
 */
export function resetHints(gameState: GameState): GameState {
  return {
    ...gameState,
    nonThemeWords: [],
    hintsUnlocked: 0,
  };
}

/**
 * Get hint text based on the current game state
 */
export function getHintText(gameState: GameState, themes: any[]): string {
  if (gameState.hintsUnlocked === 0) {
    return 'Find 3 more non-theme words to unlock a hint!';
  }
  
  const remainingThemes = themes.filter(t => 
    !gameState.foundWords.some(w => w.theme === t.name)
  );
  
  if (remainingThemes.length > 0) {
    return `Hint: Look for words related to ${remainingThemes[0].name}!`;
  }
  
  return 'All theme categories found! Just fill the remaining grid spaces.';
}
