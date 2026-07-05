import {test, expect} from '@playwright/test'

test('Политика конфиденциальности', async({page}) =>{
    await page.goto('')
    await page.getByTestId('footer-link-privacy').click();
    await expect.soft(page).toHaveScreenshot({
        fullPage: true
    });
})
