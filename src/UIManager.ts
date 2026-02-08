import { GameState, state } from './state';
import { GameConfig } from './config';

export class UIManager {
  private hud: HTMLElement;
  private scoreValue!: HTMLElement;
  private shieldValue!: HTMLElement;
  private shieldBar!: HTMLElement;
  private waveValue!: HTMLElement;
  private phaseValue!: HTMLElement;
  private instructionValue!: HTMLElement;
  private gameOver!: HTMLElement;
  private debugPanel?: HTMLElement;
  private damageOverlay!: HTMLElement;
  private lastShields: number;
  private lastPhase: string = '';

  private firstUpdate = true;

  constructor() {
    this.lastShields = GameConfig.player.maxShields;
    
    // Set CSS variables from config (convert ms to s)
    document.documentElement.style.setProperty('--ui-damage-flash-duration', `${GameConfig.ui.damageFlashDuration / 1000}s`);

    // Root HUD container
    this.hud = this.createEl('div', 'fixed inset-0 pointer-events-none z-10 font-retro flex flex-col justify-between p-4');
    this.hud.id = 'hud';

    this.damageOverlay = this.createEl('div', 'fixed inset-0 bg-vector-red opacity-0 pointer-events-none z-0', this.hud);
    this.damageOverlay.id = 'damage-overlay';

    const topBar = this.createEl('div', 'flex justify-between items-start w-full relative z-10', this.hud);

    this.createScoreSection(topBar);
    this.createShieldSection(topBar);
    this.createWaveSection(topBar);
    
    // Central info area
    const centerArea = this.createEl('div', 'fixed top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 pointer-events-none', this.hud);
    this.phaseValue = this.createEl('div', 'text-vector-yellow text-4xl animate-pulse hidden', centerArea);
    this.instructionValue = this.createEl('div', 'text-vector-green text-xl text-center hidden', centerArea);

    this.createGameOverOverlay();

    if (state.debug) {
      this.createDebugPanel();
    }

    document.body.appendChild(this.hud);
  }

  private createDebugPanel() {
    this.debugPanel = this.createEl('div', 'fixed bottom-4 left-4 pointer-events-auto bg-black bg-opacity-70 border border-vector-green p-4 flex flex-col space-y-2 text-vector-green font-retro text-xs z-20', document.body);
    this.debugPanel.id = 'debug-panel';
    
    const title = this.createEl('div', 'mb-2 border-b border-vector-green pb-1', this.debugPanel);
    title.textContent = 'DEBUG CONSOLE';

    this.createToggleButton(
      'ai-mode-toggle',
      () => `AI: ${state.isSmartAI ? 'SMART' : 'DUMB'}`,
      () => { state.isSmartAI = !state.isSmartAI; },
      this.debugPanel
    );

    this.createToggleButton(
      'mode-coloring-toggle',
      () => `COLORS: ${state.isModeColoring ? 'ON' : 'OFF'}`,
      () => { state.isModeColoring = !state.isModeColoring; },
      this.debugPanel
    );
  }

  private createToggleButton(id: string, getText: () => string, onClick: () => void, parent: HTMLElement) {
    const btn = this.createEl('button', 'px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors', parent);
    btn.id = id;
    btn.textContent = getText();
    btn.onclick = () => {
      onClick();
      btn.textContent = getText();
    };
    return btn;
  }

  private createEl(tag: string, className: string, parent?: HTMLElement): HTMLElement {
    const el = document.createElement(tag);
    el.className = className;
    if (parent) parent.appendChild(el);
    return el;
  }

  private createScoreSection(parent: HTMLElement) {
    const container = this.createEl('div', 'flex flex-col', parent);
    const currentRow = this.createEl('div', 'flex space-x-2', container);
    this.createEl('span', 'text-vector-red', currentRow).textContent = 'SCORE';
    this.scoreValue = this.createEl('span', 'text-vector-green', currentRow);
    this.scoreValue.id = 'score-value';
    this.scoreValue.textContent = '0';

    const highScoreRow = this.createEl('div', 'flex space-x-2 text-sm', container);
    this.createEl('span', 'text-vector-yellow', highScoreRow).textContent = 'HI-SCORE';
    const highScoreValue = this.createEl('span', 'text-vector-yellow', highScoreRow);
    highScoreValue.id = 'high-score-value';
    highScoreValue.textContent = GameConfig.ui.highScore.toString();
  }

  private createShieldSection(parent: HTMLElement) {
    const container = this.createEl('div', 'flex flex-col items-center', parent);
    const textRow = this.createEl('div', 'flex space-x-2', container);
    this.createEl('span', 'text-vector-green', textRow).textContent = 'SHIELD';
    this.shieldValue = this.createEl('span', 'text-vector-green', textRow);
    this.shieldValue.id = 'shield-value';
    this.shieldValue.textContent = GameConfig.player.maxShields.toString();

    const barContainer = this.createEl('div', 'w-48 h-4 border border-vector-green mt-1', container);
    this.shieldBar = this.createEl('div', 'h-full bg-vector-green transition-all duration-300', barContainer);
    this.shieldBar.id = 'shield-bar';
    this.shieldBar.style.width = '100%';
  }

  private createWaveSection(parent: HTMLElement) {
    const container = this.createEl('div', 'flex space-x-2', parent);
    this.createEl('span', 'text-vector-red', container).textContent = 'WAVE';
    this.waveValue = this.createEl('span', 'text-vector-green', container);
    this.waveValue.id = 'wave-value';
    this.waveValue.textContent = '1';
  }

  private createGameOverOverlay() {
    this.gameOver = this.createEl('div', 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50', this.hud);
    this.gameOver.id = 'game-over';
    const text = this.createEl('div', 'text-vector-red text-6xl font-retro animate-pulse', this.gameOver);
    text.textContent = 'GAME OVER';
  }

  destroy() {
    this.hud.remove();
    this.debugPanel?.remove();
  }

  update(state: GameState) {
    if (this.scoreValue.textContent !== state.score.toString()) {
      this.scoreValue.textContent = state.score.toString();
    }
    
    if (this.shieldValue.textContent !== state.shields.toString()) {
      // Trigger damage FX only if shields decreased AND it's not the first update
      if (!this.firstUpdate && state.shields < this.lastShields) {
        this.triggerDamageFX();
      }
      this.lastShields = state.shields;

      this.shieldValue.textContent = state.shields.toString();
      const shieldPercent = (state.shields / GameConfig.player.maxShields) * 100;
      this.shieldBar.style.width = `${Math.max(0, shieldPercent)}%`;
    }

    if (this.waveValue.textContent !== state.wave.toString()) {
      this.waveValue.textContent = state.wave.toString();
    }

    // Handle Phase display and instructions
    if (this.lastPhase !== state.phase) {
      this.lastPhase = state.phase;
      this.phaseValue.textContent = `PHASE: ${state.phase}`;
      this.phaseValue.classList.remove('hidden');
      
      // Auto-hide phase title after 3 seconds
      setTimeout(() => {
        this.phaseValue.classList.add('hidden');
      }, 3000);

      // Context-sensitive instructions
      switch (state.phase) {
        case 'DOGFIGHT':
          this.instructionValue.textContent = 'CLEAR THE SECTOR OF TIE FIGHTERS';
          this.instructionValue.classList.remove('hidden');
          break;
        case 'SURFACE':
          this.instructionValue.textContent = 'APPROACH THE DEATH STAR';
          this.instructionValue.classList.remove('hidden');
          break;
        case 'TRENCH':
          this.instructionValue.textContent = 'STAY LOW AND FIRE TORPEDOES INTO THE PORT (SPACE/RIGHT-CLICK)';
          this.instructionValue.classList.remove('hidden');
          break;
      }
      
      // Auto-hide instructions after 5 seconds
      setTimeout(() => {
        this.instructionValue.classList.add('hidden');
      }, 5000);
    }

    if (state.isGameOver) {
      this.gameOver.classList.remove('hidden');
    } else {
      this.gameOver.classList.add('hidden');
    }

    this.firstUpdate = false;
  }

  private retriggerAnimation(element: HTMLElement, className: string) {
    element.classList.remove(className);
    // Force a reflow to allow the animation to be re-triggered if it was already running
    void element.offsetWidth; 
    element.classList.add(className);

    // Robust cleanup: ensure classes are removed even if the animation is throttled
    // or the browser environment doesn't trigger animationend consistently.
    setTimeout(() => {
      element.classList.remove(className);
    }, GameConfig.ui.damageFlashDuration + 100);
  }

  private triggerDamageFX() {
    this.retriggerAnimation(this.damageOverlay, 'animate-damage-flash');
    this.retriggerAnimation(this.shieldBar, 'animate-shield-impact');
  }
}