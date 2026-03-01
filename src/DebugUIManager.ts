import { GameState, state, setStage } from './state';
import { GameConfig } from './config';

export class DebugUIManager {
  private static readonly BUTTON_CLASSES = 'px-2 py-1 border border-vector-green hover:bg-vector-green hover:text-black transition-colors font-retro text-[9px] focus:outline-none focus:ring-2 focus:ring-vector-green focus:ring-offset-1 focus:ring-offset-black';

  private debugPanel?: HTMLElement;
  private tieFighterCountValue?: HTMLElement;
  private stageButtons?: Map<string, HTMLElement>;
  private lastStage?: string;

  constructor() {
    this.createDebugPanel();
  }

  private createDebugPanel() {
    this.debugPanel = this.createPanelContainer();
    const content = this.createContentContainer(this.debugPanel);
    this.createHeader(this.debugPanel, content);

    this.createStatsSection(content);
    this.createControlsSection(content);
    this.createStageSwitcherSection(content);
    this.createGameplayParamsSection(content);
    this.createEntityParamsSection(content);
    this.createSurfaceParamsSection(content);
  }

  private createStatsSection(parent: HTMLElement) {
    this.createDebugSection('STATS', parent, false);
    this.tieFighterCountValue = this.createDebugStat('TIE FIGHTERS:', 'debug-tie-fighter-count', parent);
  }

  private createControlsSection(parent: HTMLElement) {
    this.createDebugSection('CONTROLS', parent);
    this.createToggleButton('ai-mode-toggle', () => `AI: ${state.isSmartAI ? 'SMART' : 'DUMB'}`, () => { state.isSmartAI = !state.isSmartAI; }, parent, () => state.isSmartAI);
    this.createToggleButton('mode-coloring-toggle', () => `COLORS: ${state.isModeColoring ? 'ON' : 'OFF'}`, () => { state.isModeColoring = !state.isModeColoring; }, parent, () => state.isModeColoring);
    this.createToggleButton('chassis-toggle', () => `CHASSIS: ${state.showChassis ? 'ON' : 'OFF'}`, () => { state.showChassis = !state.showChassis; }, parent, () => state.showChassis);
  }

  private createStageSwitcherSection(parent: HTMLElement) {
    this.createDebugSection('STAGE SWITCHER', parent);
    const stageRow = this.createEl('div', 'grid grid-cols-3 gap-1', parent);
    this.stageButtons = new Map();
    this.stageButtons.set('DOGFIGHT', this.createActionButton('stage-dogfight', 'DOG', () => setStage('DOGFIGHT'), stageRow));
    this.stageButtons.set('SURFACE', this.createActionButton('stage-surface', 'SURF', () => setStage('SURFACE'), stageRow));
    this.stageButtons.set('TRENCH', this.createActionButton('stage-trench', 'TRNCH', () => setStage('TRENCH'), stageRow));
    this.updateStageButtons(state.stage);
    this.lastStage = state.stage;
  }

  private createGameplayParamsSection(parent: HTMLElement) {
    this.createDebugSection('GAMEPLAY PARAMETERS', parent);
    this.createDebugNumericInput('KILLS TO ADVANCE', 'debug-kills-input', state.debugKillsThreshold, 0, 1, `Default (${GameConfig.stages.dogfight.killsThreshold})`, (val) => { state.debugKillsThreshold = val; }, parent, 'Kills to Advance');
  }

  private createEntityParamsSection(parent: HTMLElement) {
    this.createDebugSection('ENTITY PARAMETERS', parent);
    this.createDebugNumericInput('TURRET SIZE', 'debug-turret-size-input', state.debugTurretSize, 1, 1, `Default (${GameConfig.turret.meshSize})`, (val) => { state.debugTurretSize = val; }, parent, 'Turret Size');
    this.createDebugNumericInput('FIREBALL SIZE', 'debug-fireball-size-input', state.debugFireballSize, 1, 1, `Default (${GameConfig.fireball.sparkleSize})`, (val) => { state.debugFireballSize = val; }, parent, 'Fireball Size');
    this.createDebugNumericInput('TIE FIGHTER SIZE', 'debug-tiefighter-size-input', state.debugTieFighterSize, 0.1, 0.1, `Default (${GameConfig.tieFighter.meshSize})`, (val) => { state.debugTieFighterSize = val; }, parent, 'TIE Fighter Size');
    this.createDebugHexInput('TIE FIGHTER COLOR', 'debug-tiefighter-color-input', state.debugTieFighterColor, `Hex (e.g. 0xFF0000)`, (val) => { state.debugTieFighterColor = val; }, parent, 'TIE Fighter Color');
    
    this.createActionButton('debug-reset-entity-params', 'RESET ALL', () => {
      state.debugTurretSize = state.debugFireballSize = state.debugTieFighterSize = state.debugTieFighterColor = state.debugSurfaceTurretDensity = undefined;
      ['debug-turret-size-input', 'debug-fireball-size-input', 'debug-tiefighter-size-input', 'debug-tiefighter-color-input', 'debug-surface-turret-density-input'].forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el) el.value = '';
      });
    }, parent);
  }

  private createSurfaceParamsSection(parent: HTMLElement) {
    this.createDebugSection('SURFACE PARAMETERS', parent);
    this.createDebugNumericInput('FIREBALL SIZE', 'debug-surface-fireball-size-input', state.debugSurfaceFireballSize, 1, 1, `Default (${GameConfig.stages.surface.fireballSize})`, (val) => { state.debugSurfaceFireballSize = val; }, parent, 'Surface Fireball Size');
    this.createDebugNumericInput('FIREBALL SPEED', 'debug-surface-fireball-speed-input', state.debugSurfaceFireballSpeed, 1, 1, `Default (${GameConfig.stages.surface.fireballSpeed})`, (val) => { state.debugSurfaceFireballSpeed = val; }, parent, 'Surface Fireball Speed');
    
    this.createDebugNumericInput('VERT LINE HEIGHT', 'debug-surface-height-input', state.debugSurfaceVerticalLineHeight, 1, 1, `Default (${GameConfig.stages.surface.verticalLineHeight})`, (val) => { 
      state.debugSurfaceVerticalLineHeight = val;
      this.notifySurfaceStage();
    }, parent, 'Surface Vertical Line Height');

    this.createDebugNumericInput('VERT LINE NOISE', 'debug-surface-noise-input', state.debugSurfaceVerticalLineNoise, 0, 1, `Default (${GameConfig.stages.surface.verticalLineNoise})`, (val) => { 
      state.debugSurfaceVerticalLineNoise = val;
      this.notifySurfaceStage();
    }, parent, 'Surface Vertical Line Noise');

    this.createDebugNumericInput('VERT LINE DENSITY', 'debug-surface-density-input', state.debugSurfaceVerticalLineDensity, 0, 0.1, `Default (${GameConfig.stages.surface.verticalLineDensity})`, (val) => { 
      state.debugSurfaceVerticalLineDensity = val;
      this.notifySurfaceStage();
    }, parent, 'Surface Vertical Line Density');

    this.createDebugNumericInput('TURRET DENSITY', 'debug-surface-turret-density-input', state.debugSurfaceTurretDensity, 0, 0.1, `Default (${GameConfig.stages.surface.turretDensity})`, (val) => {
      state.debugSurfaceTurretDensity = val !== undefined ? Math.min(1.0, val) : undefined;
    }, parent, 'Surface Turret Density');
  }

  private notifySurfaceStage() {
    const stage = state.stageManager?.getStage() as any;
    if (stage && stage.surface && typeof stage.surface.updateGridSettings === 'function') {
      const height = state.debugSurfaceVerticalLineHeight ?? GameConfig.stages.surface.verticalLineHeight;
      const noise = state.debugSurfaceVerticalLineNoise ?? GameConfig.stages.surface.verticalLineNoise;
      const density = state.debugSurfaceVerticalLineDensity ?? GameConfig.stages.surface.verticalLineDensity;
      stage.surface.updateGridSettings(height, noise, density);
    }
  }

  private createPanelContainer(): HTMLElement {
    const panel = this.createEl('div', 'fixed bottom-4 left-4 pointer-events-auto bg-black bg-opacity-70 border border-vector-green p-3 flex flex-col space-y-2 text-vector-green font-retro font-bold text-[10px] z-20 w-48', document.body);
    panel.id = 'debug-panel';
    return panel;
  }

  private createContentContainer(parent: HTMLElement): HTMLElement {
    const content = this.createEl('div', 'flex flex-col space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar', parent);
    content.id = 'debug-panel-content';
    return content;
  }

  private createHeader(parent: HTMLElement, content: HTMLElement) {
    const header = this.createEl('div', 'flex justify-between items-center mb-1 border-b border-vector-green pb-1', parent);
    const title = this.createEl('div', '', header);
    title.textContent = 'DEBUG CONSOLE';

    const toggleBtn = this.createEl('button', 'ml-4 hover:text-white transition-colors font-retro focus:outline-none focus:ring-2 focus:ring-vector-green focus:ring-offset-1 focus:ring-offset-black', header);
    toggleBtn.id = 'debug-minimize-toggle';
    toggleBtn.textContent = '[-]';
    toggleBtn.setAttribute('aria-label', 'Minimize Debug Console');
    toggleBtn.setAttribute('aria-expanded', 'true');

    toggleBtn.onclick = () => {
      const isMinimized = content.classList.toggle('hidden');
      toggleBtn.textContent = isMinimized ? '[+]' : '[-]';
      toggleBtn.setAttribute('aria-label', isMinimized ? 'Expand Debug Console' : 'Minimize Debug Console');
      toggleBtn.setAttribute('aria-expanded', isMinimized ? 'false' : 'true');
      this.debugPanel?.classList.toggle('debug-minimized', isMinimized);
      
      header.classList.toggle('mb-1', !isMinimized);
      header.classList.toggle('border-b', !isMinimized);
      header.classList.toggle('pb-1', !isMinimized);
    };
  }

  private createDebugStat(label: string, id: string, parent: HTMLElement) {
    const row = this.createDebugRow(label, parent);
    const valueEl = this.createEl('span', '', row);
    valueEl.id = id;
    valueEl.textContent = '0';
    return valueEl;
  }

  private createDebugSection(title: string, parent: HTMLElement, marginTop = true) {
    const el = this.createEl('div', `${marginTop ? 'mt-4 ' : ''}mb-2 border-b border-vector-green pb-1`, parent);
    el.textContent = title;
    return el;
  }

  private createDebugRow(label: string, parent: HTMLElement) {
    const row = this.createEl('div', 'flex justify-between items-center mb-1', parent);
    const labelEl = this.createEl('span', 'mr-2', row);
    labelEl.textContent = label;
    return row;
  }

  private createDebugNumericInput(label: string, id: string, value: number | undefined, min: number, step: number, placeholder: string, onChange: (val: number | undefined) => void, parent: HTMLElement, ariaLabel?: string) {
    const input = this.createLabeledInput(label, id, 'number', value !== undefined ? value.toString() : '', placeholder, (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      onChange(!isNaN(val) ? Math.max(min, val) : undefined);
    }, parent, ariaLabel);
    input.min = min.toString();
    input.step = step.toString();
    return input;
  }

  private createDebugHexInput(label: string, id: string, value: number | undefined, placeholder: string, onChange: (val: number | undefined) => void, parent: HTMLElement, ariaLabel?: string) {
    let valueStr = '';
    if (value !== undefined) {
      valueStr = '0x' + value.toString(16).toUpperCase();
    }
    return this.createDebugTextInput(label, id, valueStr, placeholder, (valStr) => {
      if (valStr) {
        const cleanStr = valStr.startsWith('0x') ? valStr.substring(2) : (valStr.startsWith('#') ? valStr.substring(1) : valStr);
        const val = parseInt(cleanStr, 16);
        onChange(!isNaN(val) ? val : undefined);
      } else {
        onChange(undefined);
      }
    }, parent, ariaLabel);
  }

  private createDebugTextInput(label: string, id: string, value: string, placeholder: string, onChange: (val: string) => void, parent: HTMLElement, ariaLabel?: string) {
    return this.createLabeledInput(label, id, 'text', value, placeholder, (e) => onChange((e.target as HTMLInputElement).value.trim()), parent, ariaLabel);
  }

  private createLabeledInput(label: string, id: string, type: string, value: string, placeholder: string, onChange: (e: Event) => void, parent: HTMLElement, ariaLabel?: string) {
    const row = this.createDebugRow(label, parent);
    const input = this.createEl('input', 'w-24 bg-black text-vector-green border border-vector-green px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-vector-green', row) as HTMLInputElement;
    input.id = id;
    
    let effectiveAriaLabel = label;
    if (ariaLabel) {
      effectiveAriaLabel = ariaLabel;
    }
    input.setAttribute('aria-label', effectiveAriaLabel);

    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    input.onchange = onChange;
    return input;
  }

  private createToggleButton(id: string, getText: () => string, onClick: () => void, parent: HTMLElement, isPressed?: () => boolean) {
    const btn = this.createEl('button', DebugUIManager.BUTTON_CLASSES, parent);
    btn.id = id;
    btn.textContent = getText();
    const update = () => {
        if (isPressed) btn.setAttribute('aria-pressed', isPressed().toString());
    };
    update();
    btn.onclick = () => { onClick(); btn.textContent = getText(); update(); };
    return btn;
  }

  private createActionButton(id: string, text: string, onClick: () => void, parent: HTMLElement) {
    const btn = this.createEl('button', DebugUIManager.BUTTON_CLASSES, parent);
    btn.id = id;
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
  }

  private updateStageButtons(currentStage: string) {
    this.stageButtons!.forEach((button, stage) => {
      const active = stage === currentStage;
      button.classList.toggle('bg-vector-green', active);
      button.classList.toggle('text-black', active);
      button.classList.toggle('hover:bg-vector-green', !active);
      button.classList.toggle('hover:text-black', !active);
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
