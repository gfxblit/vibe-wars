## 2024-05-24 - Focus Indicators on Custom Interactive Elements
**Learning:** When building custom interactive UI components (like the standalone toggle buttons or dynamically generated inputs in the Debug panel), native focus indicators might be absent or insufficient against a complex background (like space).
**Action:** Always ensure that any element designed to be interacted with via keyboard includes explicit focus utility classes (`focus:outline-none`, `focus:ring-2`, `focus:ring-vector-green`) to guarantee accessibility and navigability.
