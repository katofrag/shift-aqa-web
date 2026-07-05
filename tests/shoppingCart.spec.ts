import {test, expect} from '@playwright/test'

test('Пустая корзина', async({page}) =>{
    await page.goto('/catalog')
    await page.getByTestId('header-cart-button').click();
    await expect.soft(page).toHaveScreenshot({
        fullPage: true
    });
})

test('Корзина с товаром', async({page}) =>{

    await page.goto('/catalog')
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click();
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click();
    await page.getByTestId('header-cart-button').click();
    await expect.soft(page).toHaveScreenshot({
            fullPage: true,
            mask: [   
                page.getByTestId('cart-total-price')
            ]
        })
})

