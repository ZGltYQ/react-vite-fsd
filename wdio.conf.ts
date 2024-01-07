import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
    specs: [
        './test/specs/**/*.ts'
    ],
    maxInstances: 10,
    capabilities: [
        { 
            browserName: 'chrome', 
            browserVersion: 'stable'
        }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3000',
    waitforTimeout: 100000,
    connectionRetryTimeout: 1200000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
