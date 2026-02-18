# vibe-wars

Vibe coding the classic Star Wars arcade game! A first-person space combat simulator recreating the climax of *Star Wars: A New Hope*.

## Game Design

### High Concept
A first-person space combat simulator that puts the player in the role of Luke Skywalker piloting an X-Wing fighter. The goal is to survive waves of enemy attacks and destroy the Death Star.

### Core Loop
1.  **Pilot:** Steer the X-Wing through space and trench environments.
2.  **Combat:** Aim the crosshairs to shoot down TIE Fighters, fireballs, and towers.
3.  **Survive:** Avoid incoming fire and collisions (Shield Management).
4.  **Destroy:** Aim at the Death Star exhaust port while firing to auto-launch a proton torpedo.
5.  **Repeat:** Game difficulty increases with each successful Death Star destruction.

### Controls
The control scheme simulates the original flight yoke. The ship's nose "chases" the crosshair.

*   **PC (Mouse):** Mouse moves crosshair; edges pitch/yaw ship. Left Click/Space for Laser. Torpedoes auto-fire when aiming at the exhaust port while firing.
*   **Mobile (Touch):** Virtual yoke (left) for steering, Action button (right) for fire. Torpedoes auto-fire when aiming at the exhaust port while firing.

### Level Stages
1.  **Dogfight:** Destroy TIE Fighters and avoid fireballs.
2.  **Surface:** Destroy bunkers and towers on the Death Star surface. (Skipped in Wave 1)
3.  **Trench Run:** Navigate obstacles and auto-fire the proton torpedo into the exhaust port by aiming while firing.

### Scoring System
| Action | Points Awarded |
| :--- | :--- |
| Destroy TIE Fighter | 100 |
| Destroy Fireball | 100 |
| Destroy Laser Tower | 200 |
| **Destroy Death Star** | **10,000** |
| Remaining Shields Bonus | +1 Shield (up to max) |

### Visual Style
*   **1983 Arcade Aesthetic:** Vector graphics using colored lines (Green, Red, Yellow, Blue).

---

## Architecture

This project follows a state-driven modular design, leveraging modern web technologies to recreate the retro vector graphics aesthetic.

### Tech Stack
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Package Manager:** pnpm
*   **Rendering:** Three.js (using `LineBasicMaterial` and `LineSegments` for vector aesthetics)
*   **Styling:** TailwindCSS (for HUD/UI overlay)
*   **Testing:** Vitest

### Directory Structure
The project structure is designed for modularity and clarity:

*   `src/main.ts`: Application entry point. Initializes the game loop.
*   `src/state.ts`: Source of truth for game state, scoring, physics logic, and difficulty scaling.
*   `src/renderer.ts`: Handles Three.js scene lifecycle and vector rendering.
*   `src/input.ts`: Abstraction for Mouse/Touch events and control mapping.
*   `src/entities/`: Modular classes for game actors (Player, Enemy, Projectile).

### Rendering Strategy
To achieve the 1983 arcade look, we utilize Three.js `LineSegments` with `LineBasicMaterial`. Models are constructed from simple geometric primitives rather than textured meshes.

### State Management
Game state is centralized in `src/state.ts`. This module handles:
*   Health/Shield reduction
*   Score increments
*   State transitions (e.g., Stage 1 -> Stage 2)
*   Collision math and bounds checking

---

## Development

### Setup
```bash
pnpm install
```

### Commands
*   `pnpm dev`: Start the development server.
*   `pnpm build`: Build for production.
*   `pnpm test`: Run Vitest unit tests.

### Testing Strategy
*   **Logic Validation:** Vitest unit tests for `state.ts` to verify health reduction, score increments, and difficulty scaling.
*   **Physics Testing:** Mathematical verification of crosshair "chase" logic and collision bounds.
*   **Visual/UX:** Manual verification of Three.js rendering performance.