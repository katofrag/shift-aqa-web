import {test, expect} from '@playwright/test'

test('FAQ с раскрытым бургером', async({page}) =>{
    await page.goto('faq')
    await page.getByTestId('faq-question-1').click();
    await expect.soft(page).toHaveScreenshot({
        fullPage: true
    });
})
