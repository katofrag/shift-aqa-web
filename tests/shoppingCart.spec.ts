import {test, expect} from '@playwright/test'

test('Корзина с товаром', async({page}) =>{

    await page.goto('/catalog')
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click();
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click();
    await page.getByTestId('header-cart-button').click();
    await expect.soft(page).toHaveScreenshot({
            fullPage: true,
            mask: [   
                page.getByTestId('cart-total-price'),
                page.getByTestId('cart-captcha-image'),                            //Добавил маскировку капчи
                page.locator('[data-testid^="cart-item-prod-"]')                   //Добавил динамическую маскировку самого товара, так как они могут тоже отличатся
            ]
        })
})

