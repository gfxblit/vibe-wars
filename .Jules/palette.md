## 2024-05-22 - Manual DOM Manipulation Risks
**Learning:** The `UIManager` constructs UI elements via direct DOM manipulation (`document.createElement`), which makes it easy to forget accessibility attributes like `aria-label` and `aria-expanded` on interactive elements.
**Action:** When working on `UIManager`, explicitly check for and add ARIA attributes to any interactive elements created.
