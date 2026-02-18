# Architecture Design: Vibe Wars

## 1. Overview
Vibe Wars is a state-driven, 3D space combat simulator inspired by the 1983 *Star Wars* arcade game. The architecture prioritizes a clean separation between game logic (state) and presentation (rendering), utilizing a vector graphics aesthetic.

## 2. Technology Stack
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Package Manager:** `pnpm`
*   **Rendering:** Three.js (specifically `LineSegments` for vector aesthetics)
*   **Styling:** TailwindCSS (for HUD and UI overlays)
*   **Testing:** Vitest

## 3. Core Components

### 3.1 State Management (`src/state.ts`)
*   **Source of Truth:** Holds the entire game state (player position, health/shields, score, active entities).
*   **Physics Logic:** Handles movement, collision detection, and "chase" physics (where the ship follows the crosshair).
*   **Scoring:** Updates scores based on game events.
*   **Pure Logic:** Ideally, this module should have minimal dependencies on Three.js-specific objects to facilitate unit testing.

### 3.2 Renderer (`src/renderer.ts`)
*   **Three.js Lifecycle:** Manages the scene, camera, and render loop.
*   **Vector Pipeline:** Implements the 1983 arcade look using `LineBasicMaterial` and `LineSegments`.
*   **Entity Mapping:** Maps game state entities to their visual representations.

### 3.3 Input Abstraction (`src/input.ts`)
*   **Input Handling:** Normalizes mouse, keyboard, and touch events into a unified control scheme.
*   **Virtual Yoke:** Implements the logic for virtual joystick controls on mobile.

### 3.4 Stage Management (`src/StageManager.ts`)
*   **Transitions:** Manages the flow between different game stages (Dogfight, Surface, Trench, Explosion).
*   **Wave Logic:** Handles difficulty progression and stage skipping (e.g. skipping Surface in Wave 1).
*   **Delegation:** Instantiates and updates the specific `Stage` classes located in `src/stages/`.

### 3.5 Combat System (`src/CombatSystem.ts`)
*   **Aiming:** Handles crosshair targeting logic.
*   **Hit Detection:** Manages logic for raycasting and collision for combat events.

### 3.6 Game Loop (`src/GameSystem.ts`)
*   **Orchestration:** The main game loop that coordinates state updates, combat, and rendering.

### 3.7 Entities (`src/entities/`)
*   **Modular Actors:** Classes for X-Wings, TIE Fighters, fireballs, and towers.
*   **Definition:** Entities define their geometry (as lines) and behavior.

## 4. Architectural Patterns

### 4.1 State-Driven Design
The game follows a unidirectional data flow:
1.  **Input** updates the desired intent (e.g., target crosshair position).
2.  **State Logic** updates positions, checks collisions, and increments scores.
3.  **Renderer** reads the current state and updates the visual scene.

### 4.2 Modular Rendering
Entities provide line-based geometry data. The renderer batches these into `LineSegments` for performance and to maintain the "vector" aesthetic.

## 5. Testing Strategy

### 5.1 Unit Testing (Vitest)
*   **`state.ts`:** Comprehensive tests for scoring logic, health reduction, and physics calculations.
*   **Physics Verification:** Mathematical verification for crosshair "chase" behavior and collision bounds.

### 5.2 Manual Verification
*   **Visual Performance:** Monitoring frame rates and rendering consistency.
*   **Input Latency:** Subjective testing of control responsiveness.

## 6. Directory Structure
```text
src/
├── main.ts          # Entry point and loop orchestration
├── state.ts         # Game state and physics logic
├── renderer.ts      # Three.js lifecycle and vector rendering
├── input.ts         # Input abstraction
├── StageManager.ts  # Stage transition logic
├── CombatSystem.ts  # Combat logic
├── GameSystem.ts    # Main game system
├── stages/          # Stage implementations (Dogfight, Surface, Trench)
└── entities/        # Modular game actor classes
    └── Entity.ts    # Base class for all entities
```
