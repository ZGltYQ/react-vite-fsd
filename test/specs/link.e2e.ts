import { expect, browser, $ } from '@wdio/globals'
import { connectAsync }       from 'mqtt'
import linkResponse           from '../mocks/linkResponse.ts';

describe('Greeting page', () => {
    beforeEach(async () => {
        await browser.mockRestoreAll()
    });

    it('positive: open valid link', async () => {
        const link = await browser.mock('**/admin-panel/v1/public-interface/links/*', { method: 'GET' });

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

        link.respond(linkResponse, {
            statusCode: 200
        });

        await browser.url('http://localhost:3000/public-interface/test');

        await expect(await $('div[data-testId="greetingTitle"]').getText()).toBe('Welcome to MyBox!');
    })

    it('negative: open invalid link', async () => {
        await browser.url('http://localhost:3000/public-interface/testdd');

        await expect(await $('div[data-testId="boundariesTitle"]').getText()).toBe('The public interface for charging is unavailable');
    })
})

