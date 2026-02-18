import { test, expect } from '@playwright/test';

test.describe('에러 처리', () => {
  test('존재하지 않는 페이지는 홈으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await page.waitForURL('**/', { timeout: 5000 });
    await expect(page.getByText('출발 터미널', { exact: true })).toBeVisible();
  });
});
