import {test, expect} from '@playwright/test'
import { fillAllFields } from '../helpers/fillAllFields';

test('Проверка значения ФИО <min', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, {code})
    await page.getByTestId('feedback-input-fullname').clear()
    await page.getByTestId('feedback-submit-button').click({force:true});

    const feedbackErrorSelector = page.getByTestId('feedback-error-fullname')
    await expect.soft(feedbackErrorSelector).toHaveText('ФИО обязательно для заполнения')
    await expect.soft(feedbackErrorSelector).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).not.toBeVisible()
});

test('Проверка значения ФИО >max', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()
    const fullname = 'q'.repeat(71);

    await fillAllFields(page, {fullname : fullname, code})

    await page.getByTestId('feedback-submit-button').click({force:true});

    const feedbackErrorSelector = page.getByTestId('feedback-error-fullname')
    await expect.soft(feedbackErrorSelector).toHaveText('ФИО не должно превышать 70 символов')
    await expect.soft(feedbackErrorSelector).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).not.toBeVisible()
});

test('Проверка min значения ФИО и латиницы', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, {fullname : "q", code})

    await page.getByTestId('feedback-submit-button').click();

    await expect.soft(page.getByTestId('modal-message')).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
});

test('Проверка max значения ФИО и кириллицы', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    const fullname = 'й'.repeat(70);
    await fillAllFields(page, {fullname : fullname, code})

    await page.getByTestId('feedback-submit-button').click();

    await expect.soft(page.getByTestId('modal-message')).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
});

test('Проверка апер и ловер кейсов', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    
    await fillAllFields(page, {fullname : "RrЯя", code})

    await page.getByTestId('feedback-submit-button').click();

    await expect.soft(page.getByTestId('modal-message')).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
});

test('Проверка допустимых спецсимволов', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    
    await fillAllFields(page, {fullname : "- -", code})

    await page.getByTestId('feedback-submit-button').click();

    await expect.soft(page.getByTestId('modal-message')).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
});

test('Проверка недопустимых спецсимволов', async ({ page, request }) => {

    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, {fullname : "%", code})

    await page.getByTestId('feedback-submit-button').click({force:true});

    const feedbackErrorSelector = page.getByTestId('feedback-error-fullname')
    await expect.soft(feedbackErrorSelector).toHaveText('ФИО может содержать только буквы, пробелы и дефисы')
    await expect.soft(feedbackErrorSelector).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).not.toBeVisible()
});

test('Проверка цифр в ФИО', async ({ page, request }) => {

    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes("/api/captcha")
    )

    await page.goto('feedback');
    const captchaResponse = await captchaResponsePromise
    const {id} = await captchaResponse.json()
    const {code} = await (await request.get(`/api/testing/captcha?id=${id}`)).json()

    await fillAllFields(page, {fullname : "1", code})

    await page.getByTestId('feedback-submit-button').click({force:true});

    const feedbackErrorSelector = page.getByTestId('feedback-error-fullname')
    await expect.soft(feedbackErrorSelector).toHaveText('ФИО может содержать только буквы, пробелы и дефисы')
    await expect.soft(feedbackErrorSelector).toBeVisible()
    await expect.soft(page.getByTestId('modal-message')).not.toBeVisible()
});