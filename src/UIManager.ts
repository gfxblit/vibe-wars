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
    
    const scoreRow = document.createElement('div');
    scoreRow.className = 'flex space-x-2';
    const scoreLabel = document.createElement('span');
    scoreLabel.className = 'text-vector-red';
    scoreLabel.textContent = 'SCORE';
    this.scoreValue = document.createElement('span');
    this.scoreValue.id = 'score-value';
    this.scoreValue.className = 'text-vector-green';
    this.scoreValue.textContent = '0';
    scoreRow.appendChild(scoreLabel);
    scoreRow.appendChild(this.scoreValue);
    scoreBlock.appendChild(scoreRow);

    const hiScoreRow = document.createElement('div');
    hiScoreRow.className = 'flex space-x-2 text-sm';
    const hiScoreLabel = document.createElement('span');
    hiScoreLabel.className = 'text-vector-yellow';
    hiScoreLabel.textContent = 'HI-SCORE';
    const hiScoreValue = document.createElement('span');
    hiScoreValue.id = 'high-score-value';
    hiScoreValue.className = 'text-vector-yellow';
    hiScoreValue.textContent = GameConfig.ui.highScore.toString();
    hiScoreRow.appendChild(hiScoreLabel);
    hiScoreRow.appendChild(hiScoreValue);
    scoreBlock.appendChild(hiScoreRow);

    // Center: Shield
    const shieldBlock = document.createElement('div');
    shieldBlock.className = 'flex flex-col items-center';
    
    const shieldRow = document.createElement('div');
    shieldRow.className = 'flex space-x-2';
    const shieldLabel = document.createElement('span');
    shieldLabel.className = 'text-vector-green';
    shieldLabel.textContent = 'SHIELD';
    this.shieldValue = document.createElement('span');
    this.shieldValue.id = 'shield-value';
    this.shieldValue.className = 'text-vector-green';
    this.shieldValue.textContent = GameConfig.player.maxShields.toString();
    shieldRow.appendChild(shieldLabel);
    shieldRow.appendChild(this.shieldValue);
    shieldBlock.appendChild(shieldRow);

    const shieldBarContainer = document.createElement('div');
    shieldBarContainer.className = 'w-48 h-4 border border-vector-green mt-1';
    this.shieldBar = document.createElement('div');
    this.shieldBar.id = 'shield-bar';
    this.shieldBar.className = 'h-full bg-vector-green transition-all duration-300';
    this.shieldBar.style.width = '100%';
    shieldBarContainer.appendChild(this.shieldBar);
    shieldBlock.appendChild(shieldBarContainer);

    // Right: Wave
    const waveBlock = document.createElement('div');
    waveBlock.className = 'flex space-x-2';
    const waveLabel = document.createElement('span');
    waveLabel.className = 'text-vector-red';
    waveLabel.textContent = 'WAVE';
    this.waveValue = document.createElement('span');
    this.waveValue.id = 'wave-value';
    this.waveValue.className = 'text-vector-green';
    this.waveValue.textContent = '1';
    waveBlock.appendChild(waveLabel);
    waveBlock.appendChild(this.waveValue);

    topBar.appendChild(scoreBlock);
    topBar.appendChild(shieldBlock);
    topBar.appendChild(waveBlock);
    this.hud.appendChild(topBar);

    // Game Over Overlay
    this.gameOver = document.createElement('div');
    this.gameOver.id = 'game-over';
    this.gameOver.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden';
    const gameOverText = document.createElement('div');
    gameOverText.className = 'text-vector-red text-6xl font-retro animate-pulse';
    gameOverText.textContent = 'GAME OVER';
    this.gameOver.appendChild(gameOverText);
    this.hud.appendChild(this.gameOver);

    document.body.appendChild(this.hud);
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