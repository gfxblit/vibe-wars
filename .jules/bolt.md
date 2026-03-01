## 2024-03-01 - [EntityManager Array Iteration]
**Learning:** Spread syntax `[...arr1, ...arr2]` inside hot update loops (like `EntityManager.getTargets()`) creates new arrays on every frame, generating garbage and triggering garbage collection pauses, which degrades performance in a 60fps game loop.
**Action:** Replace `[...arr1, ...arr2]` with a zero-allocation iterator pattern like `forEachTarget` that iterates over internal arrays directly and invokes a callback, bypassing temporary array creation entirely.
