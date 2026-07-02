import {test, expect, errors} from '@playwright/test'
import config from '../playwright.config'

const baseURL = config.use?.baseURL
if(!baseURL) {
    throw new Error('baseURL не задан в конфигурации')
}

test('Проверка кнопки СладкийДом', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-logo')).toContainText('СладкийДом')
    await expect.soft(page.getByTestId('header-logo')).toHaveAttribute('href', '/')     
    await page.getByTestId('header-logo').click()
    await expect.soft(page).toHaveTitle('Главная')  // мне кажется логичннее было бы привести на всём сайте к единому формату тайтлов 'Главная | СладкийДом'  и т.д
    await expect.soft(page).toHaveURL(baseURL)                            
})                         


test('Проверка кнопки Главная', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveText('Главная')    
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveAttribute('href', '/')    
    await page.getByTestId('header-nav-link-home').click()
    await expect.soft(page).toHaveTitle('Главная') 
    await expect.soft(page).toHaveURL(baseURL)  
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveText('Главная')                           
})                          

test('Проверка кнопки Каталог', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveText('Каталог')  
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveAttribute('href', '/catalog')   
    await page.getByTestId('header-nav-link-catalog').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей') 
    await expect.soft(page).toHaveURL(`${baseURL}catalog`)                                                    
})

test('Проверка кнопки Акции', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveText('Акции')  
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveAttribute('href', '/promotions')   
    await page.getByTestId('header-nav-link-promotions').click()
    await expect.soft(page).toHaveTitle('Акции | СладкийДом') 
    await expect.soft(page).toHaveURL(`${baseURL}promotions`)                                                    
})

test('Проверка кнопки Доставка', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveText('Доставка')  
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveAttribute('href', '/delivery')   
    await page.getByTestId('header-nav-link-delivery').click()
    await expect.soft(page).toHaveTitle('Доставка и оплата | СладкийДом') 
    await expect.soft(page).toHaveURL(`${baseURL}delivery`)                                                    
})

test('Проверка кнопки О нас', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveText('О нас')  
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveAttribute('href', '/about')   
    await page.getByTestId('header-nav-link-about').click()
    await expect.soft(page).toHaveTitle('О компании | СладкийДом') 
    await expect.soft(page).toHaveURL(`${baseURL}about`)                                                    
})

test('Проверка кнопки Контакты', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveText('Контакты')  
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveAttribute('href', '/contacts')   
    await page.getByTestId('header-nav-link-contacts').click()
    await expect.soft(page).toHaveTitle('Контакты | СладкийДом') 
    await expect.soft(page).toHaveURL(`${baseURL}contacts`)                                                    
})

test('Проверка кнопки Обратная связь', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveText('Обратная связь')  
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveAttribute('href', '/feedback')   
    await page.getByTestId('header-nav-link-feedback').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей') 
    await expect.soft(page).toHaveURL(`${baseURL}feedback`)                                                    
})

test('Проверка кнопки FAQ', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-faq')).toHaveText('FAQ')  
    await expect.soft(page.getByTestId('header-nav-link-faq')).toHaveAttribute('href', '/faq')   
    await page.getByTestId('header-nav-link-faq').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей') 
    await expect.soft(page).toHaveURL(`${baseURL}faq`)                                                    
})

test('Проверка кнопки Корзина', async ({page}) => {
    await page.goto('')   
    await page.getByTestId('header-cart-button').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей') 
    await expect.soft(page).toHaveURL(`${baseURL}cart`)                                                    
})