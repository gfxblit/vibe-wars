import * as THREE from 'three';
import { state } from './state';
import { GameConfig } from './config';

export class InputManager {
  private input: THREE.Vector2 = new THREE.Vector2(0, 0);
  private virtualCursor: THREE.Vector2 = new THREE.Vector2(0, 0);
  private isDragging: boolean = false; // Kept for touch
  private useRelativeInput: boolean = false;
  private pointerAnchor: THREE.Vector2 = new THREE.Vector2(0, 0);
  
  private handleClick = () => {
    document.body.requestPointerLock();
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    // For touch, we reset. For pointer lock, we might not want to reset on click release?
    // Pointer lock is persistent until ESC.
    // So this mainly affects touch now.
    if (this.useRelativeInput) {
        this.virtualCursor.set(0, 0);
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (document.pointerLockElement === document.body) {
      this.updatePointerLockInput(event.movementX, event.movementY);
    }
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.isDragging = true;
    this.useRelativeInput = true;
    if (event.touches.length > 0) {
      this.pointerAnchor.set(event.touches[0].clientX, event.touches[0].clientY);
      this.virtualCursor.set(0, 0);
    }
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging) return;
    if (event.touches.length > 0) {
      this.updateTouchInput(event.touches[0].clientX, event.touches[0].clientY);
    }
    event.preventDefault(); // Prevent scrolling while playing
  };

  private updatePointerLockInput(movementX: number, movementY: number) {
    const { width, height } = state.viewport;
    
    // Scale factor: movement / screenDim * sensitivity
    // We use a separate constant or the existing one? Existing is 5.0.
    const sensitivity = GameConfig.input.sensitivity; 
    
    const dx = (movementX / width) * sensitivity;
    const dy = (movementY / height) * sensitivity;

    // Accumulate
    // Note: movementY is positive down.
    // Screen coords: Top is 0, Bottom is Height.
    // Game coords: Top is 1 (usually), Bottom is -1.
    // So moving mouse down (positive Y) should decrease the cursor Y?
    // Let's verify standard pitch controls. Mouse Down -> Pitch Up (Pilot)? Or Mouse Down -> Cursor Down?
    // "Visual Feedback: The DOM cursor must track this virtual position."
    // If I move mouse down, cursor should go down.
    // In CSS/Screen, Down is positive.
    // In our WebGL/ThreeJS logic (from previous code):
    // y = (centerY - clientY) / centerY; -> Top (0) gives 1. Bottom (Height) gives -1.
    // So standard Cartesian: Up is Positive.
    // Mouse Move Down (+Y) -> Should reduce Y in Cartesian.
    
    this.virtualCursor.x += dx;
    this.virtualCursor.y -= dy; 

    // Clamp
    this.virtualCursor.x = THREE.MathUtils.clamp(this.virtualCursor.x, -1, 1);
    this.virtualCursor.y = THREE.MathUtils.clamp(this.virtualCursor.y, -1, 1);
  }

  private updateTouchInput(clientX: number, clientY: number) {
     const dx = clientX - this.pointerAnchor.x;
     const dy = this.pointerAnchor.y - clientY; // Invert Y: up is positive
     
     const x = dx / GameConfig.input.touchRadius;
     const y = dy / GameConfig.input.touchRadius;
     
     this.virtualCursor.set(
       THREE.MathUtils.clamp(x, -1, 1),
       THREE.MathUtils.clamp(y, -1, 1)
     );
  }

  public setup(): void {
    document.body.addEventListener('click', this.handleClick);
    window.addEventListener('mouseup', this.handleMouseUp); // For touch end mainly
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
  }

  public teardown(): void {
    document.body.removeEventListener('click', this.handleClick);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
  }

  public update(_dt: number): void {
    // Just copy virtualCursor to input
    this.input.copy(this.virtualCursor);
  }

  public getInput(): THREE.Vector2 {
    return this.input;
  }
}