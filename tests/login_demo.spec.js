import { test, expect } from '@playwright/test'

test('Demo Login Test 1', async ({ page }) => {
    await page.goto('https://demo.applitools.com/')
    //await page.pause();
    await page.getByRole('textbox', { name: 'Enter your username' }).fill('TuNgoc');
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');

    await page.waitForSelector('id=log-in', { timeout: 5000 });
    await page.getByRole('link', { name: 'Sign in' }).click();
})

test('Demo Login Test 2', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/')
    await page.pause();

    // await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    // await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // await page.getByRole('button', { name: 'Login' }).click;

    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
})

test('Demo Login Test 3', async ({ page }) => {
    await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F')
    await page.pause();

    await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
    await page.getByRole('textbox', { name: 'Password:' }).fill('admin');

    await page.locator('id=RememberMe').check();

    await page.getByRole('button', { name: 'Log in' }).click();
})

test('Demo Login Test 4', async ({ page }) => {
    await page.goto('https://review.hqsoft.vn/DAOTAO_eSales2023/')
    await page.pause();

    await page.locator('#ext-gen1058').click();
    await page.getByRole('option', { name: 'English' }).click();

    await page.locator('id=txtUserName-inputEl').fill('Admin');
    await page.locator('id=txtPassword-inputEl').fill('Admin@2024');

    await page.locator('id=btnLogin-btnIconEl').click();
})