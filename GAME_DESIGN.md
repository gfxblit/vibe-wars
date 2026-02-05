# Game Design Document: Star Wars (Arcade Port)

## 1. Game Overview

### 1.1 High Concept
A first-person space combat simulator that puts the player in the role of Luke Skywalker piloting an X-Wing fighter. The goal is to survive waves of enemy attacks and destroy the Death Star, recreating the climax of *Star Wars: A New Hope*.

### 1.2 Genre
* Space Combat Simulator / Rail Shooter
* Arcade Action

---

## 2. Gameplay Mechanics

### 2.1 Core Loop
1.  **Pilot:** Steer the X-Wing through space and trench environments.
2.  **Combat:** Aim the crosshairs to shoot down TIE Fighters, fireballs, and towers.
3.  **Survive:** Avoid incoming fire and collisions (Shield Management).
4.  **Destroy:** Fire proton torpedoes into the Death Star exhaust port.
5.  **Repeat:** Game difficulty increases with each successful Death Star destruction.

### 2.2 Controls

The control scheme simulates the original flight yoke using modern input methods. The ship's nose "chases" the crosshair, meaning the crosshair moves slightly faster than the ship to allow for precision targeting.

**A. PC / Desktop (Mouse)**
* **Steering (Mouse - Pointer Lock):**
    * Clicking anywhere enters Pointer Lock mode.
    * Moving the mouse controls a virtual cursor that dictates the ship's turning direction (Pitch and Yaw).
    * The further the virtual cursor is from the center, the faster the ship turns.
    * The virtual cursor is visible on-screen to indicate current steering input.
* **Combat:**
    * **Left Click:** Fire Laser Cannons (Quad-link fire).
    * **Right Click / Spacebar:** Fire Proton Torpedo (Only active during the final Trench Run moment).
* **Inverted Option:** Toggle available in settings to invert Y-Axis (Mouse Up = Ship Down) to mimic real flight controls.

**B. Mobile (Touch Screen)**
* **Steering (Virtual Yoke - Left Side):**
    * A floating virtual joystick on the left side of the screen controls Pitch and Yaw.
    * Dragging up/down controls the ship's vertical movement.
    * Dragging left/right controls the ship's horizontal movement.
* **Combat (Action Buttons - Right Side):**
    * **Large Button:** Fire Laser Cannons (Hold for continuous fire).
    * **Context Button:** "Launch Torpedo" button appears only when the exhaust port is in range.

### 2.3 Health System (Shields)
* The player starts with **6 Shields**.
* **Damage:** One shield is lost upon collision with an enemy ship, a fireball, or a tower.
* **Game Over:** Occurs when shields reach 0 and the ship takes damage.
* **Bonus:** Every time the Death Star is destroyed, the player earns a shield bonus (up to the starting max).

---

## 3. Level Design (The 3 Phases)

The game loops through three distinct phases of increasing difficulty.

### Phase 1: Dogfight in Deep Space
* **Objective:** Destroy incoming TIE Fighters and Darth Vader’s TIE Advanced.
* **Hazards:** Enemy ships fire "fireballs" (slow-moving projectiles) that the player must shoot or dodge.
* **Transition:** Once a set number of enemies are defeated or time elapses, the player approaches the Death Star surface.

### Phase 2: The Surface
* **Objective:** Destroy defensive bunkers and laser towers on the surface of the Death Star.
* **Hazards:**
    * **Towers:** The tops of towers must be shot off to prevent them from firing.
    * **Collision:** Flying too low results in crashing into the surface.
* **Visuals:** A grid-like floor moves beneath the player to simulate speed.

### Phase 3: The Trench Run
* **Objective:** Navigate the narrow trench and fire a proton torpedo into the exhaust port.
* **Mechanics:**
    * **Obstacles:** Catwalks and wall turrets appear in the trench. The player must weave over and under catwalks.
    * **The Shot:** As the exhaust port approaches, a distance countdown begins. At the correct moment, the player must fire.
    * **Success:** A cutscene of the Death Star exploding plays.
    * **Failure:** If the player misses the port or hits the wall, they lose a shield and must restart the Trench Run phase.

---

## 4. Visual & Audio Style

### 4.1 Visuals (Vector Graphics)
* **Wireframe Aesthetics:** Vectors use lines drawn directly between points to create 3D shapes.
* **Color Palette:**
    * **Green:** Friendly/Neutral (X-Wing nose, Trench walls).
    * **Red:** Enemy fire, TIE Fighters targeting lines.
    * **Yellow/Orange:** Explosions and text.
    * **Blue:** Death Star surface lines.

### 4.2 Audio
* **Music:** Chiptune/synthesized renditions of John Williams' *Star Wars Theme*.
* **Sound Effects:** Iconic sounds including blaster fire, R2-D2 beeps, and TIE fighter screams.
* **Voice Synthesis:** Digital samples of Luke, Obi-Wan, Vader, and Han Solo.

---

## 5. Progression & Difficulty

The game uses an **infinite loop** system. After destroying the Death Star, the game restarts at Phase 1 with increased difficulty settings:

* **Wave 1:** Standard difficulty.
* **Wave 2:** TIE Fighters shoot more frequently; Trench catwalks are more dense.
* **Wave 3+:** Enemies are more aggressive; Towers on the surface require more hits to destroy; The "window" to fire the proton torpedo becomes smaller.

---

## 6. Scoring System

| Action | Points Awarded |
| :--- | :--- |
| Destroy TIE Fighter | 1,000 |
| Destroy Fireball | 33 |
| Destroy Laser Tower | 200 |
| Destroy Tower Top | 50 |
| **Destroy Death Star** | **25,000 / 50,000 / 100,000** (Scales by wave) |
| Remaining Shields Bonus | Variable based on wave |
