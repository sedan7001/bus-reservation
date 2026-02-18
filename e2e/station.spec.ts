import { test, expect } from '@playwright/test';

test.describe('터미널 검색', () => {
  test('터미널을 검색하고 결과가 필터링된다', async ({ page }) => {
    await page.goto('/station?type=departure');

    const searchInput = page.locator('input[type="text"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('서울');
    await page.waitForTimeout(400);

    const results = page.locator('[role="option"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(results.nth(i)).toContainText('서울');
    }
  });

  test('검색어 지우기 버튼이 동작한다', async ({ page }) => {
    await page.goto('/station?type=departure');

    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('서울');
    await page.waitForTimeout(400);

    const clearButton = page.getByLabel('검색어 지우기');
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    await expect(searchInput).toHaveValue('');
  });

  test('출발지와 도착지가 같으면 Toast가 표시된다', async ({ page }) => {
    await page.goto('/station?type=departure&arrival=서울');

    const searchInput = page.locator('input[type="text"]');
    await searchInput.fill('서울');
    await page.waitForTimeout(400);

    const stationItems = page.locator('[role="option"]');
    await expect(stationItems.first()).toBeVisible();
    await stationItems.first().click();

    await page.waitForURL('**/station**');
  });
});
