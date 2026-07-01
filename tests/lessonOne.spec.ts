import {test, expect, errors} from '@playwright/test'
import config from '../playwright.config'

const baseURL = config.use?.baseURL
if(!baseURL) {
    throw new Error('baseURL не задан в конфигурации')
}

test('Проверка перехода на главную страницу', async ({page}) => {
    await page.goto('')                                             //автоматически подставляет url с конфига
    await expect.soft(page).toHaveTitle('Главная')                  //если мы хотим, чтобы после падения 1 теста выполнился 2й, нужно использовать soft
    await expect.soft(page).toHaveURL(baseURL)
})

test('Проверка перехода на страницу каталог', async ({page}) => {
    await page.goto('catalog')                                             
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')                  
    await expect.soft(page).toHaveURL(`${baseURL}catalog`)
})

test('Проверка URL на странице каталог (регулярное выражение)', async ({page}) => {
    await page.goto('catalog')                                             
    await expect.soft(page).toHaveURL(/.*catalog/)
})

test('Проверка текста в кнопке перейти в каталог', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('home-hero-catalog-button')).toHaveText('Перейти в каталог')  
    await expect.soft(page.getByTestId('home-hero-catalog-button')).toContainText('каталог')                                  
})

test('Проверка ссылки в логотипе (Хедер)', async ({page}) => {
    await page.goto('catalog')
    await expect(page.getByTestId('header-logo')).toHaveAttribute('href', '/')                              
})

test('Проверка ссылки в логотипе (Хедер) переход по ссылке', async ({page}) => {
    await page.goto('catalog')
    await page.getByTestId('header-logo').click()
    await expect.soft(page).toHaveTitle('Главная') 
    await expect.soft(page).toHaveURL(baseURL)                            
})

test('Проверка перехода в каталог по кнопке Конфеты', async ({page}) => {                                     //test.skip чтобы исключить тест
    await page.goto('')
    await page.getByTestId('home-category-candy').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')                  
    await expect.soft(page).toHaveURL(`${baseURL}catalog?category=candy`)
//    await page.waitForTimeout(1000)                                                                         //полохая практика, но иногда можно
    await page.waitForSelector('[data-testid^="catalog-product-category-prod-"]')
    const categoryItems = page.locator('[data-testid^="catalog-product-category-prod-"]')   
    const count = await categoryItems.count()

    console
    for(let i = 0; i < count; i++){
        const categoryText = await categoryItems.nth(i).textContent()
        expect.soft(categoryText).toBe('Конфеты')
    }                       
})

test('Проверка закрытия плашки кук', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()                                  //в expect заложен по дефолту таймаут
    await page.getByTestId('cookie-accept-button').click()
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()              
})