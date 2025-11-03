// playwright/tests/login.domain.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

test.describe('Login - Domain Testing (JS)', () => {
  test('Valid: standard_user / secret_sauce → inventory', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Valid: problem_user / secret_sauce → inventory', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('problem_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Locked account → message locked', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('locked_out_user', 'secret_sauce');
    await expect(lp.error()).toContainText('locked out');
  });

  test('Empty username & password → required', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('', '');
    await expect(lp.error()).toContainText('Username is required');
  });

  test('Empty username only → required', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('', 'secret_sauce');
    await expect(lp.error()).toContainText('Username is required');
  });

  test('Empty password only → required', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('standard_user', '');
    await expect(lp.error()).toContainText('Password is required');
  });

  test('Invalid creds → do not match', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('wrong_user', 'wrong_pass');
    await expect(lp.error()).toContainText(/do not match/i);
  });

  // Biên thường gặp: khoảng trắng 2 đầu
  test('Whitespace padded username → expected fail', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('  standard_user  ', 'secret_sauce');
    await expect(lp.error()).toContainText(/do not match/i); // app không trim
  });

  // Biên: phân biệt HOA/thường
  test('Uppercase username → expected fail', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('STANDARD_USER', 'secret_sauce');
    await expect(lp.error()).toContainText(/do not match/i);
  });

  // Biên xấu: ký tự đặc biệt
  test('Weird chars in username → expected fail', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await lp.login('/?+-)(', 'secret_sauce');
    await expect(lp.error()).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});

// SQL Injection
test('SQL Injection in username → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login("' OR '1'='1", 'any_password');
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// XSS Injection
test('XSS Injection in username → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login('<script>alert("XSS")</script>', 'any_password');
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Username extremely long
test('Extremely long username → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  const longUsername = 'a'.repeat(1000);
  await lp.login(longUsername, 'any_password');
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Password extremely long
test('Extremely long password → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  const longPassword = 'a'.repeat(1000);
  await lp.login('standard_user', longPassword);
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Unicode chars in username
test('Unicode chars in username → expected fail', async ({ page }) => {
  const lp = new LoginPage(page); 
  await lp.goto();
  await lp.login('用戶名', 'any_password'); 
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Unicode chars in password
test('Unicode chars in password → expected fail', async ({ page }) => {
  const lp = new LoginPage(page); 
  await lp.goto();
  await lp.login('standard_user', '密碼'); 
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// SQL Injection in password
test('SQL Injection in password → expected fail', async ({ page }) => {
  const lp = new LoginPage(page); 
  await lp.goto();
  await lp.login('standard_user', "' OR '1'='1"); 
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
}); 
// XSS Injection in password
test('XSS Injection in password → expected fail', async ({ page }) => {
  const lp = new LoginPage(page); 
  await lp.goto();
  await lp.login('standard_user', '<script>alert("XSS")</script>'); 
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});

// Both fields empty with spaces
test('Both fields empty with spaces → required', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login('   ', '   ');
  await expect(lp.error()).toContainText('Username is required');
});

// Both fields with special chars
test('Both fields with special chars → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  await lp.login('!@#$%', '^&*()');
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
}
);

// Extremely long creds
test('Extremely long creds → expected fail', async ({ page }) => {
  const lp = new LoginPage(page);
  await lp.goto();
  const longString = 'a'.repeat(1000);
  await lp.login(longString, longString);
  await expect(lp.error()).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
});


