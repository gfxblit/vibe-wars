import { GameState, state, setStage } from './state';
import { GameConfig } from './config';

export class DebugUIManager {
  private static readonly BUTTON_CLASSES = 'px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors font-retro';

  private debugPanel?: HTMLElement;
  private tieFighterCountValue?: HTMLElement;
  private stageButtons?: Map<string, HTMLElement>;

  constructor() {
    this.createDebugPanel();
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
    toggleBtn.setAttribute('aria-label', 'Minimize Debug Console');
    toggleBtn.setAttribute('aria-expanded', 'true');

    const content = this.createEl('div', 'flex flex-col space-y-2', this.debugPanel);
    content.id = 'debug-panel-content';

    toggleBtn.onclick = () => {
      const isMinimized = content.classList.toggle('hidden');
      toggleBtn.textContent = isMinimized ? '[+]' : '[-]';
      toggleBtn.setAttribute('aria-label', isMinimized ? 'Expand Debug Console' : 'Minimize Debug Console');
      toggleBtn.setAttribute('aria-expanded', isMinimized ? 'false' : 'true');
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
      content,
      () => state.isSmartAI
    );

    this.createToggleButton(
      'mode-coloring-toggle',
      () => `COLORS: ${state.isModeColoring ? 'ON' : 'OFF'}`,
      () => { state.isModeColoring = !state.isModeColoring; },
      content,
      () => state.isModeColoring
    );

    this.createToggleButton(
      'chassis-toggle',
      () => `CHASSIS: ${state.showChassis ? 'ON' : 'OFF'}`,
      () => { state.showChassis = !state.showChassis; },
      content,
      () => state.showChassis
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
    killsInput.setAttribute('aria-label', 'Kills to Advance');
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
    turretSizeInput.setAttribute('aria-label', 'Turret Size');
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
    fireballSizeInput.setAttribute('aria-label', 'Fireball Size');
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

    // TIE Fighter Size
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'TIE FIGHTER SIZE';
    const tieFighterSizeInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    tieFighterSizeInput.id = 'debug-tiefighter-size-input';
    tieFighterSizeInput.setAttribute('aria-label', 'TIE Fighter Size');
    tieFighterSizeInput.type = 'number';
    tieFighterSizeInput.min = '0.1';
    tieFighterSizeInput.step = '0.1';
    tieFighterSizeInput.placeholder = `Default (${GameConfig.tieFighter.meshSize})`;
    if (state.debugTieFighterSize !== undefined) {
      tieFighterSizeInput.value = state.debugTieFighterSize.toString();
    }
    tieFighterSizeInput.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugTieFighterSize = Math.max(0.1, val);
      } else {
        state.debugTieFighterSize = undefined;
      }
    };

    // TIE Fighter Color
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'TIE FIGHTER COLOR';
    const tieFighterColorInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    tieFighterColorInput.id = 'debug-tiefighter-color-input';
    tieFighterColorInput.setAttribute('aria-label', 'TIE Fighter Color');
    tieFighterColorInput.type = 'text';
    tieFighterColorInput.placeholder = `Hex (e.g. 0xFF0000)`;
    if (state.debugTieFighterColor !== undefined) {
      tieFighterColorInput.value = '0x' + state.debugTieFighterColor.toString(16).toUpperCase();
    }
    tieFighterColorInput.onchange = (e) => {
      const valStr = (e.target as HTMLInputElement).value.trim();
      if (valStr) {
          let cleanStr = valStr;
          if (cleanStr.startsWith('0x')) cleanStr = cleanStr.substring(2);
          else if (cleanStr.startsWith('#')) cleanStr = cleanStr.substring(1);
          
          const val = parseInt(cleanStr, 16);
          if (!isNaN(val)) {
              state.debugTieFighterColor = val;
          } else {
              state.debugTieFighterColor = undefined;
          }
      } else {
          state.debugTieFighterColor = undefined;
      }
    };

    // Surface Fireball Size
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'SURFACE FIREBALL SIZE';
    const surfaceFireballSizeInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    surfaceFireballSizeInput.id = 'debug-surface-fireball-size-input';
    surfaceFireballSizeInput.setAttribute('aria-label', 'Surface Fireball Size');
    surfaceFireballSizeInput.type = 'number';
    surfaceFireballSizeInput.min = '1';
    surfaceFireballSizeInput.step = '1';
    surfaceFireballSizeInput.placeholder = `Default (${GameConfig.stages.surface.fireballSize})`;
    if (state.debugSurfaceFireballSize !== undefined) {
      surfaceFireballSizeInput.value = state.debugSurfaceFireballSize.toString();
    }
    surfaceFireballSizeInput.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugSurfaceFireballSize = Math.max(1, val);
      } else {
        state.debugSurfaceFireballSize = undefined;
      }
    };

    // Surface Fireball Speed
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'SURFACE FIREBALL SPEED';
    const surfaceFireballSpeedInput = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', content) as HTMLInputElement;
    surfaceFireballSpeedInput.id = 'debug-surface-fireball-speed-input';
    surfaceFireballSpeedInput.setAttribute('aria-label', 'Surface Fireball Speed');
    surfaceFireballSpeedInput.type = 'number';
    surfaceFireballSpeedInput.min = '1';
    surfaceFireballSpeedInput.step = '1';
    surfaceFireballSpeedInput.placeholder = `Default (${GameConfig.stages.surface.fireballSpeed})`;
    if (state.debugSurfaceFireballSpeed !== undefined) {
      surfaceFireballSpeedInput.value = state.debugSurfaceFireballSpeed.toString();
    }
    surfaceFireballSpeedInput.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        state.debugSurfaceFireballSpeed = Math.max(1, val);
      } else {
        state.debugSurfaceFireballSpeed = undefined;
      }
    };
  }

  private createToggleButton(id: string, getText: () => string, onClick: () => void, parent: HTMLElement, isPressed?: () => boolean) {
    const btn = this.createEl('button', DebugUIManager.BUTTON_CLASSES, parent);
    btn.id = id;
    btn.textContent = getText();
    if (isPressed) {
      btn.setAttribute('aria-pressed', isPressed().toString());
    }
    btn.onclick = () => {
      onClick();
      btn.textContent = getText();
      if (isPressed) {
        btn.setAttribute('aria-pressed', isPressed().toString());
      }
    };
    return btn;
  }

  private createActionButton(id: string, text: string, onClick: () => void, parent: HTMLElement) {
    const btn = this.createEl('button', DebugUIManager.BUTTON_CLASSES, parent);
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

  public update(state: GameState) {
    if (this.stageButtons) {
      this.updateStageButtons(state.stage);
    }

    if (this.tieFighterCountValue && state.entityManager) {
      this.tieFighterCountValue.textContent = state.entityManager.getTieFighters().length.toString();
    }
  }

  public destroy() {
    this.debugPanel?.remove();
  }
}
