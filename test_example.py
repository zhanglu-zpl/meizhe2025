import re
from playwright.sync_api import Playwright, sync_playwright, expect
 
 
def set_token_to_local_storage(url, token):
    with sync_playwright() as p:
        browser = p.webkit.launch(headless=False, slow_mo=1000)
        page = browser.new_page()
        page.goto('https://login.taobao.com/')
 
        # 将 token 存储到 Local Storage 中
        page.evaluate('''(token) => {
            localStorage.setItem('token', token);
        }''', token)
        # 检查 Local Storage 中的 token 是否正确设置
        stored_token = page.evaluate('''() => {
            return localStorage.getItem('token');
        }''')
        print("Stored token:", stored_token)  # 打印存储在 Local Storage 中的 token
 
        # 刷新页面，这一步必须要有，不然页面空白
        page.reload()
        for name, path_url in path_url_list:
            page.goto(url + path_url)
            page.wait_for_timeout(3000)
            page.screenshot(path=f'file/{name}.png',
                            full_page=True)
 
 
url = "https://login.taobao.com/"
token = "……"
# 需要截图的路径
path_url_list = [
    ("主页", "#/workboard"),
    ("列表", "#/list"),
]
set_token_to_local_storage(url, token)

