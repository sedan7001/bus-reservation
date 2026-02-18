import { test, expect } from '@playwright/test';

test.describe('예약 플로우 (편도)', () => {
  test('출발 터미널 → 도착 터미널 → 티켓 선택 → 좌석 선택 → 예약 완료', async ({ page }) => {
    await page.goto('/');

    await page.getByText('출발 터미널을 선택해주세요').click();
    await page.waitForURL('**/station**');
    const departureStations = page.locator('[role="option"]');
    await expect(departureStations.first()).toBeVisible({ timeout: 5000 });
    const departureName = await departureStations.first().textContent();
    await departureStations.first().click();
    await page.waitForURL('**/search**');

    await page.getByText('도착 터미널을 선택해주세요').click();
    await page.waitForURL('**/station**');
    const arrivalStations = page.locator('[role="option"]');
    await expect(arrivalStations.first()).toBeVisible({ timeout: 5000 });

    let arrivalIndex = 0;
    const firstArrival = await arrivalStations.first().textContent();
    if (firstArrival === departureName) {
      arrivalIndex = 1;
    }
    await arrivalStations.nth(arrivalIndex).click();
    await page.waitForURL('**/search**');

    await page.getByText('날짜를 선택해주세요').first().click();
    await page.waitForTimeout(500);

    const nextMonthBtn = page.locator('button', { hasText: '▶' });
    await nextMonthBtn.click();
    await page.waitForTimeout(300);

    const dateCells = page.locator('button').filter({ hasText: '15' });
    await dateCells.first().click();
    await page.waitForTimeout(300);

    const confirmBtn = page.getByRole('button', { name: '확인' });
    await expect(confirmBtn).toBeEnabled({ timeout: 2000 });
    await confirmBtn.click();
    await page.waitForTimeout(500);

    await page.getByText('인원 선택').click();
    await page.waitForTimeout(500);
    const plusButtons = page.locator('button').filter({ hasText: '+' });
    if (await plusButtons.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await plusButtons.first().click();
    }
    await page.waitForTimeout(300);
    const confirmCountBtn = page.getByRole('button', { name: '확인' });
    if (await confirmCountBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await confirmCountBtn.click();
    }
    await page.waitForTimeout(500);

    const searchButton = page.getByText('버스 보기');
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    await page.waitForURL('**/tickets**', { timeout: 5000 });

    const ticketButtons = page.locator('button').filter({ hasText: /선택/ });
    await expect(ticketButtons.first()).toBeVisible({ timeout: 5000 });
    await ticketButtons.first().click();

    await page.waitForURL('**/confirm**', { timeout: 5000 });

    const seatButtons = page.locator('button[aria-label*="선택 가능"]');
    await expect(seatButtons.first()).toBeVisible({ timeout: 5000 });

    await seatButtons.first().click();

    const selectedSeat = page.locator('button[aria-pressed="true"]');
    await expect(selectedSeat.first()).toBeVisible({ timeout: 3000 });

    const reserveButton = page.getByRole('button', { name: '예약하기' });
    await expect(reserveButton).toBeEnabled();
    await reserveButton.click();

    await page.waitForURL('**/complete**', { timeout: 10000 });
    await expect(page.locator('body')).toContainText(/예약/);
  });
});
