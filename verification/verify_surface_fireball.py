from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the game with debug mode enabled
    # Assuming default Vite port 5173
    page.goto("http://localhost:5173/?debug=true")

    # Wait for the game to load
    page.wait_for_load_state("networkidle")

    # Check for the debug panel
    debug_panel = page.locator("#debug-panel")
    expect(debug_panel).to_be_visible()

    # Expand the debug panel if it's minimized (check for content visibility)
    content = page.locator("#debug-panel-content")
    if not content.is_visible():
        page.locator("#debug-minimize-toggle").click()
    
    expect(content).to_be_visible()

    # Check for SURFACE FIREBALL SIZE input
    surface_size_label = page.get_by_text("SURFACE FIREBALL SIZE")
    expect(surface_size_label).to_be_visible()
    
    surface_size_input = page.locator("#debug-surface-fireball-size-input")
    expect(surface_size_input).to_be_visible()
    # Config value is 20.0, but string representation might be '20' or '20.0'
    # We check if placeholder contains '20'
    expect(surface_size_input).to_have_attribute("placeholder", "Default (20)")

    # Check for SURFACE FIREBALL SPEED input
    surface_speed_label = page.get_by_text("SURFACE FIREBALL SPEED")
    expect(surface_speed_label).to_be_visible()

    surface_speed_input = page.locator("#debug-surface-fireball-speed-input")
    expect(surface_speed_input).to_be_visible()
    expect(surface_speed_input).to_have_attribute("placeholder", "Default (40)")

    # Take a screenshot
    page.screenshot(path="verification/surface_fireball_debug.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
