export type Row = number;
export type Col = number;

export interface Position {
  row: Row;
  col: Col;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP_LEFT = 'UP_LEFT',
  UP_RIGHT = 'UP_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
  DOWN_RIGHT = 'DOWN_RIGHT',
}

export interface Cell {
  letter: string;
  state: 'hidden' | 'revealed' | 'found';
}

export type Grid = Cell[][];

export interface Word {
  id: string;
  text: string;
  letters: string[];
  positions: Position[];
  start: Position;
  end: Position;
  direction: Direction;
  isThemeWord: boolean;
  isSpangram?: boolean;
  theme?: string;
}

export interface GameState {
  grid: Grid;
  foundWords: Word[];
  themeWords: Word[];
  foundThemeWords: Word[];
  foundNonThemeWords: Word[];
  hintsUnlocked: number;
  gameOver: boolean;
}
