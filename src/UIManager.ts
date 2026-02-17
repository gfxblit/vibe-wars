import { GameState, state, setStage } from './state';
import { GameConfig } from './config';

type TimerHandle = number;

export class UIManager {
  private static readonly BUTTON_CLASSES = 'px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors font-retro';

  private hud: HTMLElement;
  private scoreValue!: HTMLElement;
  private shieldValue!: HTMLElement;
  private shieldBar!: HTMLElement;
  private waveValue!: HTMLElement;
  private stageValue!: HTMLElement;
  private distanceValue!: HTMLElement;
  private instructionValue!: HTMLElement;
  private destructionValue!: HTMLElement;
  private greatShotValue!: HTMLElement;
  private torpedoReadyValue!: HTMLElement;
  private gameOver!: HTMLElement;
  private debugPanel?: HTMLElement;
  private damageOverlay!: HTMLElement;
  private restartButton!: HTMLButtonElement;
  private stageButtons?: Map<string, HTMLElement>;
  private lastShields: number;
  private lastIsGameOver: boolean = false;
  private lastStage: string = '';
  private lastIsDeathStarDestroyed: boolean = false;
  private damageTimeout: TimerHandle | null = null;
  private shieldTimeout: TimerHandle | null = null;
  private destructionTimeout: TimerHandle | null = null;
  private stageTimeout: TimerHandle | null = null;
  private instructionTimeout: TimerHandle | null = null;
  private greatShotTimeout: TimerHandle | null = null;

  private firstUpdate = true;
  private tieFighterCountValue?: HTMLElement;

  constructor() {
    this.lastShields = GameConfig.player.maxShields;

    // Set CSS variables from config (convert ms to s)
    document.documentElement.style.setProperty('--ui-damage-flash-duration', `${GameConfig.ui.damageFlashDuration / 1000}s`);

    // Root HUD container
    this.hud = this.createEl('div', 'fixed inset-0 pointer-events-none z-10 font-retro font-bold flex flex-col justify-between p-4');
    this.hud.id = 'hud';

    const topBar = this.createEl('div', 'flex justify-between items-start w-full relative z-10', this.hud);

    this.createScoreSection(topBar);
    this.createShieldSection(topBar);
    this.createWaveSection(topBar);

    // Central info area
    const centerArea = this.createEl('div', 'fixed top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 pointer-events-none', this.hud);
    this.stageValue = this.createEl('div', 'text-vector-yellow text-4xl animate-pulse hidden', centerArea);
    this.distanceValue = this.createEl('div', 'text-vector-red text-2xl font-bold hidden', centerArea);
    this.distanceValue.id = 'distance-value';
    this.destructionValue = this.createEl('div', 'text-vector-red text-3xl font-bold text-center hidden animate-pulse', centerArea);
    this.destructionValue.id = 'destruction-value';
    this.destructionValue.textContent = 'DEATH STAR DESTROYED';
    this.greatShotValue = this.createEl('div', 'text-vector-yellow text-2xl font-bold text-center hidden', centerArea);
    this.greatShotValue.id = 'great-shot-value';
    this.greatShotValue.textContent = 'GREAT SHOT KID!';
    this.instructionValue = this.createEl('div', 'text-vector-green text-xl text-center hidden', centerArea);
    this.torpedoReadyValue = this.createEl('div', 'text-vector-red text-2xl font-bold hidden animate-pulse', centerArea);
    this.torpedoReadyValue.textContent = 'TORPEDO READY';

    this.createGameOverOverlay();

    // Damage overlay should be on top of other HUD elements for maximum impact
    this.damageOverlay = this.createEl('div', 'fixed inset-0 bg-vector-red opacity-0 pointer-events-none z-50', this.hud);
    this.damageOverlay.id = 'damage-overlay';

    if (state.debug) {
      this.createDebugPanel();
    }

    document.body.appendChild(this.hud);
  }

  private createDebugPanel() {
    this.debugPanel = this.createEl('div', 'fixed bottom-4 left-4 pointer-events-auto bg-black bg-opacity-70 border border-vector-green p-4 flex flex-col space-y-2 text-vector-green font-retro font-bold text-xs z-20', document.body);
    this.debugPanel.id = 'debug-panel';

    const header = this.createEl('div', 'flex justify-between items-center mb-2 border-b border-vector-green pb-1', this.debugPanel);
    const title = this.createEl('div', '', header);
    title.textContent = 'DEBUG CONSOLE';

    const toggleBtn = this.createEl('button', 'ml-4 hover:text-white transition-colors font-retro', header);
    toggleBtn.id = 'debug-minimize-toggle';
    toggleBtn.textContent = '[-]';

    const content = this.createEl('div', 'flex flex-col space-y-2', this.debugPanel);
    content.id = 'debug-panel-content';

    toggleBtn.onclick = () => {
      const isMinimized = content.classList.toggle('hidden');
      toggleBtn.textContent = isMinimized ? '[+]' : '[-]';
      this.debugPanel?.classList.toggle('debug-minimized', isMinimized);
      
      // Clean up header when minimized
      header.classList.toggle('mb-2', !isMinimized);
      header.classList.toggle('border-b', !isMinimized);
      header.classList.toggle('pb-1', !isMinimized);
    };

    // Stats
    const statsTitle = this.createEl('div', 'mb-2 border-b border-vector-green pb-1', content);
    statsTitle.textContent = 'STATS';
    const tfRow = this.createEl('div', 'flex justify-between', content);
    this.createEl('span', '', tfRow).textContent = 'TIE FIGHTERS:';
    this.tieFighterCountValue = this.createEl('span', '', tfRow);
    this.tieFighterCountValue.id = 'debug-tie-fighter-count';
    this.tieFighterCountValue.textContent = '0';

    this.createToggleButton(
      'ai-mode-toggle',
      () => `AI: ${state.isSmartAI ? 'SMART' : 'DUMB'}`,
      () => { state.isSmartAI = !state.isSmartAI; },
      content
    );

    this.createToggleButton(
      'mode-coloring-toggle',
      () => `COLORS: ${state.isModeColoring ? 'ON' : 'OFF'}`,
      () => { state.isModeColoring = !state.isModeColoring; },
      content
    );

    this.createToggleButton(
      'chassis-toggle',
      () => `CHASSIS: ${state.showChassis ? 'ON' : 'OFF'}`,
      () => { state.showChassis = !state.showChassis; },
      content
    );

    // Stage Switcher
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'STAGE SWITCHER';
    const stageRow = this.createEl('div', 'flex space-x-2', content);
    this.stageButtons = new Map();

    const dogfightBtn = this.createActionButton('stage-dogfight', 'DOGFIGHT', () => { setStage('DOGFIGHT'); }, stageRow);
    this.stageButtons.set('DOGFIGHT', dogfightBtn);

    const surfaceBtn = this.createActionButton('stage-surface', 'SURFACE', () => { setStage('SURFACE'); }, stageRow);
    this.stageButtons.set('SURFACE', surfaceBtn);

    const trenchBtn = this.createActionButton('stage-trench', 'TRENCH', () => { setStage('TRENCH'); }, stageRow);
    this.stageButtons.set('TRENCH', trenchBtn);

    this.updateStageButtons(state.stage);

    // Kills Threshold
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'KILLS TO ADVANCE';
    const killsInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    killsInput.id = 'debug-kills-input';
    killsInput.type = 'number';
    killsInput.min = '0';
    killsInput.placeholder = `Default (${GameConfig.stages.dogfight.killsThreshold})`;
    if (state.debugKillsThreshold !== undefined) {
      killsInput.value = state.debugKillsThreshold.toString();
    }
    killsInput.onchange = (e) => {
      const val = parseInt((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugKillsThreshold = Math.max(0, val);
      } else {
        state.debugKillsThreshold = undefined;
      }
    };

    // Turret Size
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'TURRET SIZE';
    const turretSizeInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    turretSizeInput.id = 'debug-turret-size-input';
    turretSizeInput.type = 'number';
    turretSizeInput.min = '1';
    turretSizeInput.step = '1';
    turretSizeInput.placeholder = `Default (${GameConfig.turret.meshSize})`;
    if (state.debugTurretSize !== undefined) {
      turretSizeInput.value = state.debugTurretSize.toString();
    }
    turretSizeInput.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugTurretSize = Math.max(1, val);
      } else {
        state.debugTurretSize = undefined;
      }
    };

    // Fireball Size
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'FIREBALL SIZE';
    const fireballSizeInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    fireballSizeInput.id = 'debug-fireball-size-input';
    fireballSizeInput.type = 'number';
    fireballSizeInput.min = '1';
    fireballSizeInput.step = '1';
    fireballSizeInput.placeholder = `Default (${GameConfig.fireball.sparkleSize})`;
    if (state.debugFireballSize !== undefined) {
      fireballSizeInput.value = state.debugFireballSize.toString();
    }
    fireballSizeInput.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugFireballSize = Math.max(1, val);
      } else {
        state.debugFireballSize = undefined;
      }
    };
  }

  private createToggleButton(id: string, getText: () => string, onClick: () => void, parent: HTMLElement) {
    const btn = this.createEl('button', UIManager.BUTTON_CLASSES, parent);
    btn.id = id;
    btn.textContent = getText();
    btn.onclick = () => {
      onClick();
      btn.textContent = getText();
    };
    return btn;
  }

  private createActionButton(id: string, text: string, onClick: () => void, parent: HTMLElement) {
    const btn = this.createEl('button', UIManager.BUTTON_CLASSES, parent);
    btn.id = id;
    btn.textContent = text;
    btn.onclick = () => {
      onClick();
    };
    return btn;
  }

  private updateStageButtons(currentStage: string) {
    if (!this.stageButtons) return;

    this.stageButtons.forEach((button, stage) => {
      if (stage === currentStage) {
        // Active stage: green background, black text
        button.classList.add('bg-vector-green', 'text-black');
        button.classList.remove('hover:bg-vector-green', 'hover:text-black');
      } else {
        // Inactive stage: default styling
        button.classList.remove('bg-vector-green', 'text-black');
        button.classList.add('hover:bg-vector-green', 'hover:text-black');
      }
    });
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
    this.gameOver = this.createEl('div', 'fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 hidden z-50 pointer-events-auto', this.hud);
    this.gameOver.id = 'game-over';

    const text = this.createEl('div', 'text-vector-red text-6xl font-retro animate-pulse mb-8', this.gameOver);
    text.textContent = 'GAME OVER';

    const restartBtn = this.createEl('button', 'px-8 py-3 border-2 border-vector-green text-vector-green hover:bg-vector-green hover:text-black font-retro text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-vector-green focus:ring-offset-2 focus:ring-offset-black', this.gameOver);
    restartBtn.textContent = 'RESTART MISSION';
    restartBtn.setAttribute('aria-label', 'Restart Game');
    restartBtn.onclick = () => window.location.reload();
    this.restartButton = restartBtn as HTMLButtonElement;
  }

  destroy() {
    this.hud.remove();
    this.debugPanel?.remove();
    if (this.damageTimeout) clearTimeout(this.damageTimeout);
    if (this.shieldTimeout) clearTimeout(this.shieldTimeout);
    if (this.destructionTimeout) clearTimeout(this.destructionTimeout);
    if (this.stageTimeout) clearTimeout(this.stageTimeout);
    if (this.instructionTimeout) clearTimeout(this.instructionTimeout);
    if (this.greatShotTimeout) clearTimeout(this.greatShotTimeout);
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

    if (state.isDeathStarDestroyed && !this.lastIsDeathStarDestroyed) {
      this.destructionValue.classList.remove('hidden');
      if (this.destructionTimeout) clearTimeout(this.destructionTimeout);
      this.destructionTimeout = window.setTimeout(() => {
        this.destructionValue.classList.add('hidden');
        this.destructionTimeout = null;
      }, 4000);
    }
    this.lastIsDeathStarDestroyed = state.isDeathStarDestroyed;

    // Handle Stage display and instructions
    if (this.lastStage !== state.stage) {
      this.lastStage = state.stage;
      
      const currentStage = state.stageManager?.getStage();
      if (currentStage?.showTitle ?? true) {
        this.stageValue.textContent = `STAGE: ${state.stage}`;
        this.stageValue.classList.remove('hidden');

        // Auto-hide stage title after 3 seconds
        if (this.stageTimeout) clearTimeout(this.stageTimeout);
        this.stageTimeout = window.setTimeout(() => {
          this.stageValue.classList.add('hidden');
          this.stageTimeout = null;
        }, 3000);
      }

      // Context-sensitive instructions
      if (this.instructionTimeout) clearTimeout(this.instructionTimeout);
      if (this.greatShotTimeout) {
        clearTimeout(this.greatShotTimeout);
        this.greatShotTimeout = null;
        this.greatShotValue.classList.add('hidden');
      }

      switch (state.stage) {
        case 'DOGFIGHT':
          this.instructionValue.textContent = 'CLEAR THE SECTOR OF TIE FIGHTERS';
          this.instructionValue.classList.remove('hidden');
          break;
        case 'SURFACE':
          this.instructionValue.textContent = 'FLY TO THE TRENCH';
          this.instructionValue.classList.remove('hidden');
          break;
        case 'TRENCH':
          this.instructionValue.textContent = 'STAY LOW AND AIM AT THE PORT TO AUTO-FIRE TORPEDOES';
          this.instructionValue.classList.remove('hidden');
          break;
        case 'EXPLOSION':
          this.greatShotValue.classList.remove('hidden');
          if (this.greatShotTimeout) clearTimeout(this.greatShotTimeout);
          this.greatShotTimeout = window.setTimeout(() => {
            this.greatShotValue.classList.add('hidden');
            this.greatShotTimeout = null;
          }, 3000);
          break;
      }

      // Auto-hide instructions after 5 seconds
      this.instructionTimeout = window.setTimeout(() => {
        this.instructionValue.classList.add('hidden');
        this.instructionTimeout = null;
      }, 5000);
    }

    // Distance countdown in TRENCH stage
    if (state.stage === 'TRENCH' && state.player) {
      const { catwalkEndZ, exhaustPortZOffset } = GameConfig.stages.trench;
      const portZ = catwalkEndZ - exhaustPortZOffset;
      const dist = Math.max(0, Math.floor(Math.abs(state.player.position.z - portZ)));
      
      // Show countdown when within range
      if (dist < 4000) {
        this.distanceValue.textContent = dist.toString().padStart(4, '0');
        this.distanceValue.classList.remove('hidden');
      } else {
        this.distanceValue.classList.add('hidden');
      }
    } else {
      this.distanceValue.classList.add('hidden');
    }

    if (state.isGameOver) {
      this.gameOver.classList.remove('hidden');
      if (!this.lastIsGameOver) {
        this.gameOver.classList.add('animate-fade-in');
        this.restartButton?.focus();
      }
    } else {
      this.gameOver.classList.add('hidden');
      this.gameOver.classList.remove('animate-fade-in');
    }
    this.lastIsGameOver = state.isGameOver;

    if (this.stageButtons) {
      this.updateStageButtons(state.stage);
    }

    if (this.tieFighterCountValue && state.entityManager) {
      this.tieFighterCountValue.textContent = state.entityManager.getTieFighters().length.toString();
    }

    // Torpedo Ready indicator
    if (state.stage === 'TRENCH' && state.canFireTorpedo) {
      this.torpedoReadyValue.classList.remove('hidden');
    } else {
      this.torpedoReadyValue.classList.add('hidden');
    }

    // Approach Death Star indicator
    if (state.isApproachingDeathStar) {
      this.instructionValue.textContent = 'APPROACH DEATH STAR';
      this.instructionValue.classList.remove('hidden');
    } else if (this.lastStage === state.stage && this.instructionValue.textContent === 'APPROACH DEATH STAR') {
      // If we were showing it but the flag cleared (or stage changed), hide it
      this.instructionValue.classList.add('hidden');
    }

    this.firstUpdate = false;
  }

  private retriggerAnimation(element: HTMLElement, className: string, existingTimeout: TimerHandle | null, onComplete: (timeout: TimerHandle) => void) {
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    element.classList.remove(className);
    // Force a reflow
    void element.offsetWidth;
    element.classList.add(className);

    const newTimeout = window.setTimeout(() => {
      element.classList.remove(className);
    }, GameConfig.ui.damageFlashDuration + 100);

    if (onComplete) {
      onComplete(newTimeout);
    }
  }



  private triggerDamageFX() {

    this.retriggerAnimation(

      this.damageOverlay,

      'animate-damage-flash',

      this.damageTimeout,

      (t) => this.damageTimeout = t

    );

    this.retriggerAnimation(

      this.shieldBar,

      'animate-shield-impact',

      this.shieldTimeout,

      (t) => this.shieldTimeout = t

    );

  }

}

