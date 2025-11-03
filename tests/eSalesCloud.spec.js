import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.locator('#ext-gen1058').click();
    await page.getByRole('option', { name: 'English' }).click();

    await page.locator('#txtUserName-inputEl').fill('Admin');
    await page.locator('#txtPassword-inputEl').fill('Admin@2024');
    await page.locator('#btnLogin-btnIconEl').click();
});

test('Login → User Maintenance', async ({ page }) => {
    // mở header
    await page.locator('#ADM_header_hd').click();

    // expand Setup
    await page.getByRole('row', { name: 'Setup' }).click();
    // đợi row User Maintenance render và visible
    const userMaintenanceRow = page.locator('tr[data-recordid="module-group-screenSA03001"] span.x-tree-node-text');
    await expect(userMaintenanceRow).toBeVisible();
    // dừng 2 giây rồi chạy tiếp
    await page.waitForTimeout(3000);
    // click vào row
    await userMaintenanceRow.click();

    await page.waitForTimeout(3000);
    // Add new trong iframe
    await page.locator('iframe[name="tabSA03001_IFrame"]').contentFrame().locator('#menuClickbtnNew').click();
    await page.waitForTimeout(3000);
});

test('Login → User Maintenance → Add New', async ({ page }) => {
  // mở header
  await page.locator('#ADM_header_hd').click();

  // expand Setup
  await page.getByRole('row', { name: 'Setup' }).click();

  // đợi User Maintenance hiển thị
  const userMaintenanceRow = page.locator('tr[data-recordid="module-group-screenSA03001"] span.x-tree-node-text');
  await expect(userMaintenanceRow).toBeVisible();

  // click vào User Maintenance
  await userMaintenanceRow.click();

  // lấy frame
  const frame = await page.frame({ name: 'tabSA03001_IFrame' });

  // click Add New
  await frame?.locator('#menuClickbtnNew').click();

  // fill form Add New (ví dụ: username, fullname, email,…)
  await frame?.locator('#txtUserName-inputEl').fill('NDTest01');
  await frame?.locator('#txtFullName-inputEl').fill('Test User 01');
  await frame?.locator('#txtEmail-inputEl').fill('test01@example.com');
  await frame?.locator('#txtPassword-inputEl').fill('P@ssword123');
  await frame?.locator('#txtConfirmPassword-inputEl').fill('P@ssword123');

  // chọn role (ví dụ combo box)
  await frame?.locator('#cboRole-inputEl').click();
  await frame?.getByRole('option', { name: 'Administrator' }).click();

  // lưu
  await frame?.locator('#btnSave-btnIconEl').click();

  // xác nhận thông báo (nếu có)
  // await frame?.getByText('Save successful').waitFor({ state: 'visible', timeout: 5000 });

  await page.waitForTimeout(2000);
});



