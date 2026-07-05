import {test, expect} from '@playwright/test'

test('Пользовательское соглашение', async({page}) =>{
    await page.goto('')
    await page.getByTestId('footer-link-terms').click();
    await expect.soft(page).toHaveScreenshot({
        fullPage: true
    });
})
