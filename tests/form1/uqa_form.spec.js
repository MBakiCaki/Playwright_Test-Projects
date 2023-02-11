/* Example UI test for https://ultimateqa.com/filling-out-forms/ */

import { test, expect } from '@playwright/test';
test('test', async ({ page }) => {

    await page.goto('https://ultimateqa.com/filling-out-forms/');

    // Fill Form 1
    await page.locator('#et_pb_contact_name_0').type('Testname 1');
    await page.locator('#et_pb_contact_message_0').type('Test 1');

    // Fill form 2
    await page.locator('#et_pb_contact_name_1').type('Testname 2');
    await page.locator('#et_pb_contact_message_1').type('Test 2');

    // get captcha question text
    let questionText = (await page.locator('.et_pb_contact_captcha_question').innerText());

    // fill captcha
    let answer = handleCaptcha(); // answer of of the captcha question

    await page.locator('input[name="et_pb_contact_captcha_1"]').fill(answer);

    // Submit Forms
    await page.locator('button[name="et_builder_submit_button"]').nth(1).click();
    await page.locator('button[name="et_builder_submit_button"]').nth(0).click();


    function handleCaptcha() {
        let plusIndex = questionText.indexOf('+');
        let num1 = parseInt(questionText.slice(0, plusIndex)); // get number before + sign
        let num2 = parseInt(questionText.slice(plusIndex + 1)); // get number after + sign
        let answer = (num1 + num2).toString(); // answer of of the captcha question
        return answer;
    }
});
