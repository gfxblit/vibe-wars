import { GameState, state, setStage } from './state';
import { GameConfig } from './config';

export class DebugUIManager {
  private static readonly BUTTON_CLASSES = 'px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors font-retro';

  private debugPanel?: HTMLElement;
  private tieFighterCountValue?: HTMLElement;
  private stageButtons?: Map<string, HTMLElement>;
  private lastStage?: string;

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
    this.createStatsSection(content);

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
    this.lastStage = state.stage;

    // Kills Threshold
    this.createNumericInput(
      'Kills to Advance',
      'debug-kills-input',
      0,
      1,
      `Default (${GameConfig.stages.dogfight.killsThreshold})`,
      state.debugKillsThreshold,
      (val) => { state.debugKillsThreshold = val; },
      content
    );

    // Turret Size
    this.createNumericInput(
      'Turret Size',
      'debug-turret-size-input',
      1,
      1,
      `Default (${GameConfig.turret.meshSize})`,
      state.debugTurretSize,
      (val) => { state.debugTurretSize = val; },
      content
    );

    // Fireball Size
    this.createNumericInput(
      'Fireball Size',
      'debug-fireball-size-input',
      1,
      1,
      `Default (${GameConfig.fireball.sparkleSize})`,
      state.debugFireballSize,
      (val) => { state.debugFireballSize = val; },
      content
    );

    // TIE Fighter Size
    this.createNumericInput(
      'TIE Fighter Size',
      'debug-tiefighter-size-input',
      0.1,
      0.1,
      `Default (${GameConfig.tieFighter.meshSize})`,
      state.debugTieFighterSize,
      (val) => { state.debugTieFighterSize = val; },
      content
    );

    // TIE Fighter Color
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', content).textContent = 'TIE Fighter Color';
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
    this.createNumericInput(
      'Surface Fireball Size',
      'debug-surface-fireball-size-input',
      1,
      1,
      `Default (${GameConfig.stages.surface.fireballSize})`,
      state.debugSurfaceFireballSize,
      (val) => { state.debugSurfaceFireballSize = val; },
      content
    );

    // Surface Fireball Speed
    this.createNumericInput(
      'Surface Fireball Speed',
      'debug-surface-fireball-speed-input',
      1,
      1,
      `Default (${GameConfig.stages.surface.fireballSpeed})`,
      state.debugSurfaceFireballSpeed,
      (val) => { state.debugSurfaceFireballSpeed = val; },
      content
    );
  }

  private createStatsSection(parent: HTMLElement) {
    const statsTitle = this.createEl('div', 'mb-2 border-b border-vector-green pb-1', parent);
    statsTitle.textContent = 'STATS';
    const tfRow = this.createEl('div', 'flex justify-between', parent);
    this.createEl('span', '', tfRow).textContent = 'TIE FIGHTERS:';
    this.tieFighterCountValue = this.createEl('span', '', tfRow);
    this.tieFighterCountValue.id = 'debug-tie-fighter-count';
    this.tieFighterCountValue.textContent = '0';
  }

  private createNumericInput(
    label: string,
    id: string,
    min: number,
    step: number,
    placeholder: string,
    initialValue: number | undefined,
    onValueChange: (val: number | undefined) => void,
    parent: HTMLElement
  ) {
    this.createEl('div', 'mt-4 mb-2 border-b border-vector-green pb-1', parent).textContent = label;
    const input = this.createEl('input', 'w-full bg-black text-vector-green border border-vector-green px-2 py-1', parent) as HTMLInputElement;
    input.id = id;
    input.setAttribute('aria-label', label);
    input.type = 'number';
    input.min = min.toString();
    input.step = step.toString();
    input.placeholder = placeholder;
    if (initialValue !== undefined) {
      input.value = initialValue.toString();
    }
    input.onchange = (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      if (!isNaN(val)) {
        onValueChange(Math.max(min, val));
      } else {
        onValueChange(undefined);
      }
    };
    return input;
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
    if (this.stageButtons && state.stage !== this.lastStage) {
      this.updateStageButtons(state.stage);
      this.lastStage = state.stage;
    }

    if (this.tieFighterCountValue && state.entityManager) {
      this.tieFighterCountValue.textContent = state.entityManager.getTieFighters().length.toString();
    }
  }

  public destroy() {
    this.debugPanel?.remove();
  }
}
