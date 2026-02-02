
## Architectural Review

**Git Diff:**
```diff
diff --git a/index.html b/index.html
index 03ce7de..2c9da0a 100644
--- a/index.html
+++ b/index.html
@@ -6,7 +6,7 @@
     <title>Vibe Wars</title>
   </head>
   <body>
-    <div id="cursor" style="position: absolute; width: 20px; height: 20px; border: 2px solid white; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); display: none;"></div>
+    <div id="cursor"></div>
     <script type="module" src="/src/main.ts"></script>
   </body>
 </html>
diff --git a/src/entities/Player.ts b/src/entities/Player.ts
index e47257d..0e139a3 100644
--- a/src/entities/Player.ts
+++ b/src/entities/Player.ts
@@ -36,8 +36,8 @@ export class Player extends Entity {
     this.position.y += input.y * this.VERTICAL_SPEED * deltaTime;
 
     // Clamp within bounds
-    this.position.x = Math.max(-this.BOUNDS_X, Math.min(this.BOUNDS_X, this.position.x));
-    this.position.y = Math.max(-this.BOUNDS_Y, Math.min(this.BOUNDS_Y, this.position.y));
+    this.position.x = THREE.MathUtils.clamp(this.position.x, -this.BOUNDS_X, this.BOUNDS_X);
+    this.position.y = THREE.MathUtils.clamp(this.position.y, -this.BOUNDS_Y, this.BOUNDS_Y);
 
     // Rotation (Banking and Pitching)
     // Bank (Roll around Z) based on X input.
diff --git a/src/input.test.ts b/src/input.test.ts
index 1468ee9..d6540f7 100644
--- a/src/input.test.ts
+++ b/src/input.test.ts
@@ -7,6 +7,8 @@ describe('InputManager', () => {
 
   beforeEach(() => {
     listeners = {};
+    vi.stubGlobal('innerWidth', 1000);
+    vi.stubGlobal('innerHeight', 1000);
     vi.spyOn(window, 'addEventListener').mockImplementation((event, listener) => {
         listeners[event] = listener;
     });
@@ -156,4 +158,26 @@ describe('InputManager', () => {
     listeners['touchend'](new TouchEvent('touchend'));
     expect(inputManager.getInput().x).toBe(0);
   });
+
+  it('updates target input based on cached window size after resize', () => {
+    vi.stubGlobal('innerWidth', 1000);
+    vi.stubGlobal('innerHeight', 1000);
+    
+    // Initial setup (done in beforeEach)
+    
+    // Trigger resize
+    vi.stubGlobal('innerWidth', 2000);
+    vi.stubGlobal('innerHeight', 2000);
+    listeners['resize']();
+    
+    listeners['mousedown'](new MouseEvent('mousedown'));
+    // (500, 500) in 2000x2000 should be (-0.5, 0.5)
+    // centerX = 1000, centerY = 1000
+    // x = (500 - 1000) / 1000 = -0.5
+    // y = (1000 - 500) / 1000 = 0.5
+    listeners['mousemove'](new MouseEvent('mousemove', { clientX: 500, clientY: 500 }));
+    
+    expect(inputManager.getInput().x).toBe(-0.5);
+    expect(inputManager.getInput().y).toBe(0.5);
+  });
 });
diff --git a/src/input.ts b/src/input.ts
index 6a9420e..24e5e43 100644
--- a/src/input.ts
+++ b/src/input.ts
@@ -5,6 +5,8 @@ export class InputManager {
   private targetInput: THREE.Vector2 = new THREE.Vector2(0, 0);
   private keys: Set<string> = new Set();
   private isDragging: boolean = false;
+  private width: number = window.innerWidth;
+  private height: number = window.innerHeight;
   
   private readonly SENSITIVITY = 5.0; // Units per second
 
@@ -48,9 +50,14 @@ export class InputManager {
     event.preventDefault(); // Prevent scrolling while playing
   };
 
+  private handleResize = () => {
+    this.width = window.innerWidth;
+    this.height = window.innerHeight;
+  };
+
   private updatePointerInput(clientX: number, clientY: number) {
-    const centerX = window.innerWidth / 2;
-    const centerY = window.innerHeight / 2;
+    const centerX = this.width / 2;
+    const centerY = this.height / 2;
     
     // Normalize to [-1, 1]
     const x = (clientX - centerX) / centerX;
@@ -86,6 +93,7 @@ export class InputManager {
     window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
     window.addEventListener('touchend', this.handleMouseUp);
     window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
+    window.addEventListener('resize', this.handleResize);
   }
 
   public teardown(): void {
@@ -97,34 +105,28 @@ export class InputManager {
     window.removeEventListener('touchstart', this.handleTouchStart);
     window.removeEventListener('touchend', this.handleMouseUp);
     window.removeEventListener('touchmove', this.handleTouchMove);
+    window.removeEventListener('resize', this.handleResize);
   }
 
   public update(dt: number): void {
     // Keyboard input still uses gradual movement
     if (this.keys.size > 0 || (this.input.lengthSq() > 0 && \!this.isDragging)) {
-      // Move x towards targetX
-      if (this.input.x < this.targetInput.x) {
-        this.input.x = Math.min(this.targetInput.x, this.input.x + this.SENSITIVITY * dt);
-      } else if (this.input.x > this.targetInput.x) {
-        this.input.x = Math.max(this.targetInput.x, this.input.x - this.SENSITIVITY * dt);
-      }
-
-      // Move y towards targetY
-      if (this.input.y < this.targetInput.y) {
-        this.input.y = Math.min(this.targetInput.y, this.input.y + this.SENSITIVITY * dt);
-      } else if (this.input.y > this.targetInput.y) {
-        this.input.y = Math.max(this.targetInput.y, this.input.y - this.SENSITIVITY * dt);
-      }
+      const step = this.SENSITIVITY * dt;
+      this.input.x = this.moveTowards(this.input.x, this.targetInput.x, step);
+      this.input.y = this.moveTowards(this.input.y, this.targetInput.y, step);
     }
     // If dragging, pointer input already set this.input immediately in updatePointerInput
   }
 
-    public getInput(): THREE.Vector2 {
-
-      return this.input;
-
-    }
+  private moveTowards(current: number, target: number, maxDelta: number): number {
+    if (Math.abs(target - current) <= maxDelta) return target;
+    return current + Math.sign(target - current) * maxDelta;
+  }
 
+  public getInput(): THREE.Vector2 {
+    return this.input;
+  }
 }
+
 
   
\ No newline at end of file
diff --git a/src/main.ts b/src/main.ts
index 64a0b23..3d3a868 100644
--- a/src/main.ts
+++ b/src/main.ts
@@ -17,6 +17,14 @@ scene.add(starField.points)
 
 const cursorElement = document.getElementById('cursor');
 
+let width = window.innerWidth;
+let height = window.innerHeight;
+
+window.addEventListener('resize', () => {
+  width = window.innerWidth;
+  height = window.innerHeight;
+});
+
 if (state.player) {
   scene.add(state.player.mesh)
 }
@@ -33,8 +41,8 @@ function animate(time: number) {
   
   // Update visual cursor
   if (cursorElement) {
-    const centerX = window.innerWidth / 2;
-    const centerY = window.innerHeight / 2;
+    const centerX = width / 2;
+    const centerY = height / 2;
     const cursorX = centerX + input.x * centerX;
     const cursorY = centerY - input.y * centerY; // Invert Y back to screen space
     
diff --git a/src/style.css b/src/style.css
index ade0143..9c09aa4 100644
--- a/src/style.css
+++ b/src/style.css
@@ -1,12 +1,12 @@
-body { margin: 0; overflow: hidden; background-color: black; }
\ No newline at end of file
+body { margin: 0; overflow: hidden; background-color: black; }
+
+#cursor {
+  position: absolute;
+  width: 20px;
+  height: 20px;
+  border: 2px solid white;
+  border-radius: 50%;
+  pointer-events: none;
+  transform: translate(-50%, -50%);
+  display: none;
+}
\ No newline at end of file
```

**Architectural Evaluation Request:**
Evaluate the provided git diff for adherence to the following architectural principles:
1.  **Single Responsibility Principle (SRP):** Each module/class should have one reason to change.
2.  **Modularity:** The code should be well-organized and modular.
3.  **Open/Closed Principle (OCP):** Entities should be open for extension but closed for modification.
4.  **File Size:** Ensure files are not becoming too large and unwieldy.

Provide a verdict of 'OK' or 'REFACTOR' based on your evaluation.
