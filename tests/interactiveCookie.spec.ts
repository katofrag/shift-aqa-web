import {test, expect, errors} from '@playwright/test'
import config from '../playwright.config'

const baseURL = config.use?.baseURL
if(!baseURL) {
    throw new Error('baseURL не задан в конфигурации')
}

test('Проверка ссылки на политику конфиденциальности', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-privacy-link')).toContainText('политикой конфиденциальности')
    await expect.soft(page.getByTestId('cookie-consent-privacy-link')).toHaveAttribute('href', '/privacy')     
    await page.getByTestId('cookie-consent-privacy-link').click()
    await expect.soft(page).toHaveTitle('Политика конфиденциальности | СладкийДом')                            
    await expect.soft(page).toHaveURL(`${baseURL}privacy`)                            
})                         

test('Проверка кнопки отклонить', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
    await expect.soft(page.getByTestId('cookie-decline-button')).toContainText('Отклонить')
    await page.getByTestId('cookie-decline-button').click()
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()                            
})     

test('Проверка кнопки принять', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
    await expect.soft(page.getByTestId('cookie-accept-button')).toContainText('Принять')
    await page.getByTestId('cookie-accept-button').click()
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()              
})