import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify():
    # Start the server
    server = subprocess.Popen(["python3", "-m", "http.server", "8000", "--directory", "out"])
    time.sleep(2) # Give it a second to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Test Home Page
            print("Verifying Home Page...")
            await page.goto("http://localhost:8000/index.html")
            await page.wait_for_timeout(2000)

            html_class = await page.evaluate("document.documentElement.className")
            print(f"Initial HTML class: '{html_class}'")
            await page.screenshot(path="jules-scratch/stage1_home_dark.png")

            # Test Theme Toggle (Dark to Light)
            print("Testing Theme Toggle...")
            await page.click('button[aria-label="Toggle theme"]')
            await page.wait_for_timeout(1000)

            html_class = await page.evaluate("document.documentElement.className")
            print(f"HTML class after toggle: '{html_class}'")
            await page.screenshot(path="jules-scratch/stage1_home_light.png")

            # Test Sidebar Collapse
            print("Testing Sidebar Collapse...")
            await page.click('aside button')
            await page.wait_for_timeout(1000)
            await page.screenshot(path="jules-scratch/stage1_sidebar_collapsed.png")

            # Test Introduction Page
            print("Verifying Introduction Page...")
            await page.goto("http://localhost:8000/introduction.html")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="jules-scratch/stage1_introduction_final.png")

            await browser.close()
            print("Verification complete.")
    finally:
        server.terminate()

if __name__ == "__main__":
    if not os.path.exists("jules-scratch"):
        os.makedirs("jules-scratch")
    asyncio.run(verify())
