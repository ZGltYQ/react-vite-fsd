import { expect, browser, $ } from '@wdio/globals'
import { connectAsync }       from 'mqtt'
import linkResponse           from '../mocks/linkResponse.ts';
import sessionResponse        from '../mocks/sessionResponse.ts';

describe('Authorization page', () => {
    beforeEach(async () => {
        await browser.mockRestoreAll()
    });

    it('positive: redirect to authorization page', async () => {
        const link = await browser.mock('**/admin-panel/v1/public-interface/links/*', { method: 'GET' });
        const session = await browser.mock('**/admin-panel/v1/public-interface/sessions/*', { method: 'POST' })

        const client = await connectAsync('mqtt://localhost:1883');

        const values = {
            "a2781d1424e35118bb2ffe500f5888ab7862b10afa67eaa101fd3b1b98a3243e/sweet-home/v1lc-mu7n-j9fm-pfvm/charging-session/start-time" : '12,12,12',
            "a2781d1424e35118bb2ffe500f5888ab7862b10afa67eaa101fd3b1b98a3243e/sweet-home/v1lc-mu7n-j9fm-pfvm/$state" : 'ready',
            "a2781d1424e35118bb2ffe500f5888ab7862b10afa67eaa101fd3b1b98a3243e/sweet-home/v1lc-mu7n-j9fm-pfvm/ac-module/evse-state": 'Unplugged',
            "a2781d1424e35118bb2ffe500f5888ab7862b10afa67eaa101fd3b1b98a3243e/sweet-home/v1lc-mu7n-j9fm-pfvm/charging-session/energy-delivered": '20',
            "a2781d1424e35118bb2ffe500f5888ab7862b10afa67eaa101fd3b1b98a3243e/sweet-home/v1lc-mu7n-j9fm-pfvm/charging-session/charging-time": '12,12,12'
        }
        
        for (const value in values) {
            await client.publishAsync(value, values[value], { retain: true })
        }

        session.respond(sessionResponse, {
            statusCode: 200
        })

        link.respond(linkResponse, {
            statusCode: 200
        });

        await browser.url('http://localhost:3000/public-interface/test');

        await expect(await $('div[data-testId="greetingTitle"').getText()).toBe('Welcome to MyBox!');

        const button = await $('button');

        await button.waitForExist()

        await button.click()

        await expect(await browser.getUrl()).toBe('http://localhost:3000/public-interface/test/auth')

        await expect(await $('div[data-testId="authTitle"').getText()).toBe('Select authorization method')
    })
})

