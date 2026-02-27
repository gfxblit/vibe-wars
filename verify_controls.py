from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the app (assuming default Vite port 5173, but I should check.
    # Usually it's 5173. If not, I'll find out.)
    try:
        page.goto("http://localhost:5173")

        # Wait for the HUD to load. The controls hint is part of the HUD.
        # It has id 'controls-hint'.
        page.wait_for_selector("#controls-hint")

        # Take a screenshot of the whole page
        page.screenshot(path="verification_controls_hint.png")

        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
