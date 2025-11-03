// playwright/tests/pages/LoginPage.js
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.errorBox = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(u, p) {
    await this.page.pause();
    await this.username.fill(u);
    await this.password.fill(p);
    await this.loginBtn.click();
  }

  error() {
    return this.errorBox;
  }
}

module.exports = { LoginPage };
