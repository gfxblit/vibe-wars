import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

    try:
        page.goto("http://localhost:3000")
        page.wait_for_selector("canvas", timeout=10000)

        # Check for CSP violations in console
        csp_errors = [err for err in console_errors if "Content Security Policy" in err]

        if csp_errors:
            print(f"CSP Errors found: {csp_errors}")
        else:
            print("No CSP errors found.")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/csp_verification.png"
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
