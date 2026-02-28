## 2024-10-24 - Closure Reassignment Narrowing with TypeScript
**Learning:** When passing synchronous callbacks to hot-path iterators (like `forEachTarget`) in TypeScript, modifying locally scoped primitive/reference variables from the outer scope within the callback can cause control flow analysis to incorrectly narrow types (e.g., throwing TS errors about assigning to `null`).
**Action:** Use mutable object wrappers (e.g., `const state = { target: null as Targetable | null, dist: Infinity }`) for variables captured and modified inside these synchronous callbacks to sidestep compiler limitations.

## 2024-10-24 - Zero Allocation Iteration Over Multiple Collections
**Learning:** `EntityManager` was allocating temporary arrays every frame using spread syntax `[...this.tieFighters, ...this.additionalTargets]` to provide iterators for `checkTargets`. This caused excessive GC pressure in hot paths.
**Action:** Implement `forEachTarget(callback)` directly on the manager class which runs individual `for...of` loops over each internal collection sequentially, passing each element to the callback without ever allocating intermediate array structures.
