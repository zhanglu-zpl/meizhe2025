import re
from playwright.sync_api import Playwright, sync_playwright, expect

def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://login.taobao.com/")
    page.get_by_placeholder("账号名/邮箱/手机号").click()
    page.get_by_placeholder("账号名/邮箱/手机号").fill("寒茜璐")
    page.get_by_placeholder("请输入登录密码").click()
    page.get_by_placeholder("请输入登录密码").fill("23127zhanglu222")
    slider = page.locator('#baxia-dialog-content').bounding_box()
    page.mouse.move(x=slider['x'], y=slider['y']+slider['height']/2)
    page.mouse.down()
    page.mouse.move(x=slider['x']+240, y=slider['y']+slider['height']/2) 
    page.mouse.up()
    page.pause()
    page.get_by_role("button", name="登录").click()
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://meizhe.meideng.net/home")
    

def test_get_started_link(page: Page):
    page.goto("http://meizhe.meideng.net/")

    # Click the get started link.
    page.get_by_role("link", name="Get started").click()

    # Expects page to have a heading with the name of Installation.
    expect(page.get_by_role("heading", name="Installation")).to_be_visible()