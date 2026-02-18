import { test, expect } from '@playwright/test';

test.describe('검색 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('초기 화면이 정상 렌더링된다', async ({ page }) => {
    await expect(page).toHaveTitle('버스 예약하기');
    await expect(page.getByText('출발 터미널', { exact: true })).toBeVisible();
    await expect(page.getByText('도착 터미널', { exact: true })).toBeVisible();
    await expect(page.getByText('버스 보기')).toBeVisible();
  });

  test('출발 터미널을 선택할 수 있다', async ({ page }) => {
    await page.getByText('출발 터미널을 선택해주세요').click();
    await page.waitForURL('**/station**');

    const stationItems = page.locator('[role="option"]');
    await expect(stationItems.first()).toBeVisible({ timeout: 5000 });
    await stationItems.first().click();

    await page.waitForURL('**/search**');
  });

  test('도착 터미널을 선택할 수 있다', async ({ page }) => {
    await page.getByText('도착 터미널을 선택해주세요').click();
    await page.waitForURL('**/station**');

    const stationItems = page.locator('[role="option"]');
    await expect(stationItems.first()).toBeVisible({ timeout: 5000 });
    await stationItems.first().click();

    await page.waitForURL('**/search**');
  });
});
