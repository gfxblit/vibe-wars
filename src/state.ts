export interface GameState {
  score: number;
  lives: number;
  wave: number;
}

export const state: GameState = {
  score: 0,
  lives: 6,
  wave: 1,
};

export function initGame() {
  console.log('Game initialized');
}
