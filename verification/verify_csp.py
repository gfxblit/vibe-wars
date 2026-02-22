import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_errors = []
        def handle_console(msg):
            if msg.type == "error":
                console_errors.append(msg.text)

        page.on("console", handle_console)

        print("Navigating to http://localhost:5173/")
        try:
            response = page.goto("http://localhost:5173/")
            print(f"Response status: {response.status}")
        except Exception as e:
            print(f"Navigation failed: {e}")
            browser.close()
            return

        # Wait for the HUD to appear, indicating the game loaded
        try:
            page.wait_for_selector("#hud", timeout=5000)
            print("HUD element found.")
        except Exception as e:
            print(f"HUD not found: {e}")

        # Wait for potential CSP errors to log
        time.sleep(2)

        # Check for CSP violations
        csp_errors = [err for err in console_errors if "Content Security Policy" in err or "refused to load" in err.lower()]

        if csp_errors:
            print("❌ CSP Errors found:")
            for err in csp_errors:
                print(f"  - {err}")
        else:
            print("✅ No CSP errors found.")

        # Take screenshot
        page.screenshot(path="verification/csp_check.png")
        print("Screenshot saved to verification/csp_check.png")

        browser.close()

if __name__ == "__main__":
    run()
