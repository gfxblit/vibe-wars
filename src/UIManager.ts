import { GameState } from './state';
import { GameConfig } from './config';

export class UIManager {
  private hud: HTMLElement;
  private scoreValue: HTMLElement;
  private shieldValue: HTMLElement;
  private shieldBar: HTMLElement;
  private waveValue: HTMLElement;
  private gameOver: HTMLElement;

  constructor() {
    this.hud = document.createElement('div');
    this.hud.id = 'hud';
    this.hud.className = 'fixed inset-0 pointer-events-none z-10 font-retro flex flex-col justify-between p-4';
    
    // Top bar
    const topBar = document.createElement('div');
    topBar.className = 'flex justify-between items-start w-full';

    // Left: Score
    const scoreBlock = document.createElement('div');
    scoreBlock.className = 'flex flex-col';
    scoreBlock.innerHTML = `
      <div class="flex space-x-2">
        <span class="text-vector-red">SCORE</span>
        <span id="score-value" class="text-vector-green">0</span>
      </div>
      <div class="flex space-x-2 text-sm">
        <span class="text-vector-yellow">HI-SCORE</span>
        <span id="high-score-value" class="text-vector-yellow">${GameConfig.ui.highScore}</span>
      </div>
    `;

    // Center: Shield
    const shieldBlock = document.createElement('div');
    shieldBlock.className = 'flex flex-col items-center';
    shieldBlock.innerHTML = `
      <div class="flex space-x-2">
        <span class="text-vector-green">SHIELD</span>
        <span id="shield-value" class="text-vector-green">6</span>
      </div>
      <div class="w-48 h-4 border border-vector-green mt-1">
        <div id="shield-bar" class="h-full bg-vector-green transition-all duration-300" style="width: 100%"></div>
      </div>
    `;

    // Right: Wave
    const waveBlock = document.createElement('div');
    waveBlock.className = 'flex space-x-2';
    waveBlock.innerHTML = `
      <span class="text-vector-red">WAVE</span>
      <span id="wave-value" class="text-vector-green">1</span>
    `;

    topBar.appendChild(scoreBlock);
    topBar.appendChild(shieldBlock);
    topBar.appendChild(waveBlock);
    this.hud.appendChild(topBar);

    // Game Over Overlay
    this.gameOver = document.createElement('div');
    this.gameOver.id = 'game-over';
    this.gameOver.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden';
    this.gameOver.innerHTML = `
      <div class="text-vector-red text-6xl font-retro animate-pulse">GAME OVER</div>
    `;
    this.hud.appendChild(this.gameOver);

    document.body.appendChild(this.hud);

    this.scoreValue = document.getElementById('score-value')!;
    this.shieldValue = document.getElementById('shield-value')!;
    this.shieldBar = document.getElementById('shield-bar')!;
    this.waveValue = document.getElementById('wave-value')!;
  }

  update(state: GameState) {
    if (this.scoreValue.textContent !== state.score.toString()) {
      this.scoreValue.textContent = state.score.toString();
    }
    
    if (this.shieldValue.textContent !== state.shields.toString()) {
      this.shieldValue.textContent = state.shields.toString();
      const shieldPercent = (state.shields / GameConfig.player.maxShields) * 100;
      this.shieldBar.style.width = `${Math.max(0, shieldPercent)}%`;
    }

    if (this.waveValue.textContent !== state.wave.toString()) {
      this.waveValue.textContent = state.wave.toString();
    }

    if (state.isGameOver) {
      this.gameOver.classList.remove('hidden');
    } else {
      this.gameOver.classList.add('hidden');
    }
  }
}
