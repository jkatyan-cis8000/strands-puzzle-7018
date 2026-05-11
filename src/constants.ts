export const GRID_ROWS = 6;
export const GRID_COLS = 8;
export const HINT_INTERVAL = 3;

export interface Theme {
  name: string;
  words: string[];
  spangram: string;
}

export const THEMES: Theme[] = [
  {
    name: 'Fruits',
    spangram: 'APPLEBAN',
    words: [
      'APPLE',
      'BANANA',
      'CHERRY',
      'DATE',
      'ELDERBERRY',
      'FIG',
      'GRAPE',
      'HONEYDEW',
    ],
  },
  {
    name: 'Animals',
    spangram: 'TIGERSLO',
    words: [
      'TIGER',
      'LION',
      'BEAR',
      'ZEBRA',
      'GIRAFFE',
      'ELEPHANT',
      'CROCODILE',
      'WOLF',
    ],
  },
  {
    name: 'Planets',
    spangram: 'MERCURYV',
    words: [
      'MERCURY',
      'VENUS',
      'EARTH',
      'MARS',
      'JUPITER',
      'SATURN',
      'URANUS',
      'NEPTUNE',
    ],
  },
  {
    name: 'Colors',
    spangram: 'REDBLUEX',
    words: [
      'RED',
      'BLUE',
      'GREEN',
      'YELLOW',
      'ORANGE',
      'PURPLE',
      'PINK',
      'BLACK',
    ],
  },
];
