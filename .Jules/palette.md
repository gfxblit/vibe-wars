## 2024-05-22 - Accessibility for Game HUDs
**Learning:** Game HUDs update dynamic text (instructions, alerts) frequently, but without `aria-live` regions, these updates are invisible to screen readers. Adding `role="status"` and `aria-live="polite"` makes these updates accessible without disrupting gameplay flow.
**Action:** Always audit dynamic text containers in game UIs for `aria-live` attributes to ensure critical game information is announced.
