import { GameState } from './state';
import { GameConfig } from './config';

export class UIManager {
  private hud: HTMLElement;
  private scoreValue!: HTMLElement;
  private shieldValue!: HTMLElement;
  private shieldBar!: HTMLElement;
  private waveValue!: HTMLElement;
  private gameOver!: HTMLElement;

  constructor() {
    this.hud = this.createHUD();
    document.body.appendChild(this.hud);
    this.cacheElements();
  }

  private createHUD(): HTMLElement {
    const hud = document.createElement('div');
    hud.id = 'hud';
    hud.className = 'fixed inset-0 pointer-events-none z-10 font-retro flex flex-col justify-between p-4';
    
    hud.innerHTML = `
      <div class="flex justify-between items-start w-full">
        <!-- Left: Score -->
        <div class="flex flex-col">
          <div class="flex space-x-2">
            <span class="text-vector-red">SCORE</span>
            <span id="score-value" class="text-vector-green">0</span>
          </div>
          <div class="flex space-x-2 text-sm">
            <span class="text-vector-yellow">HI-SCORE</span>
            <span id="high-score-value" class="text-vector-yellow">${GameConfig.ui.highScore}</span>
          </div>
        </div>

        <!-- Center: Shield -->
        <div class="flex flex-col items-center">
          <div class="flex space-x-2">
            <span class="text-vector-green">SHIELD</span>
            <span id="shield-value" class="text-vector-green">${GameConfig.player.maxShields}</span>
          </div>
          <div class="w-48 h-4 border border-vector-green mt-1">
            <div id="shield-bar" class="h-full bg-vector-green transition-all duration-300" style="width: 100%"></div>
          </div>
        </div>

        <!-- Right: Wave -->
        <div class="flex space-x-2">
          <span class="text-vector-red">WAVE</span>
          <span id="wave-value" class="text-vector-green">1</span>
        </div>
      </div>

      <!-- Game Over Overlay -->
      <div id="game-over" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="text-vector-red text-6xl font-retro animate-pulse">GAME OVER</div>
      </div>
    `;

    return hud;
  }

  private cacheElements() {
    this.scoreValue = document.getElementById('score-value')!;
    this.shieldValue = document.getElementById('shield-value')!;
    this.shieldBar = document.getElementById('shield-bar')!;
    this.waveValue = document.getElementById('wave-value')!;
    this.gameOver = document.getElementById('game-over')!;
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