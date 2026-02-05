import { state } from './state';

export class Cursor {
  private element: HTMLElement | null;

  constructor() {
    this.element = document.getElementById('cursor');
  }

  public update(input: { x: number, y: number }): void {
    if (!this.element) return;

    const { centerX, centerY } = state.viewport;
    const cursorX = centerX + input.x * centerX;
    const cursorY = centerY - input.y * centerY; // Invert Y back to screen space
    
    // Use transform for better performance
    this.element.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
    
    // Only set display once
    if (this.element.style.display !== 'block') {
      this.element.style.display = 'block';
    }
  }
}
