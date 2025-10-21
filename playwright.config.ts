// playwright.config.js
// @ts-check
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  forbidOnly: !!process.env.forbidOnly,
  workers: 1, // Workers can be overridden by pipeline variable
  retries: 0,

  use: {
    trace: 'on-first-retry',
    actionTimeout: 60 * 1000,
    navigationTimeout: 60 * 1000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: process.env.locale || 'en-US',
    headless: false,
    browserName: process.env.browser || 'chromium',
    channel: process.env.browser || 'chrome',
    downloadsPath: path.resolve(process.cwd(), 'downloads'),
    acceptDownloads: true,
    viewport: null,
    launchOptions: {
      viewport: { width: 1280, height: 720 },
      args: [
        '--start-maximized',
        '--allow-running-insecure-content',
        '--disable-web-security',
        '--ignore-certificate-errors',
        '--remote-debugging-port=9222'
      ]
    },
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github.v3+json'
    }
  },

  // Example of enabling multiple browsers:
  // projects: [
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   },
  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },
  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },
  // ],

  globalTimeout: 120 * 100 * 1000,
  timeout: 11 * 60 * 1000,
  expect: {
    timeout: 12 * 10000,
  },
  outputDir: path.resolve('testresults', process.env.customReportName || 'default-report'),

  reporter: [
    ['list', { printSteps: true }],
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results-' + (process.env.customReportName || 'default') }],
    ['json', { outputFile: `testresults/${process.env.customReportName || 'default'}.json` }],
    ['junit', { outputFile: `testresults/${process.env.customReportName || 'default'}-junit-xml.xml` }],
    ['./customReportGenerator.ts', { 
      outputFile: process.env.customReportName || 'default',
      environment: 'Windows 10 + Chrome' 
    }]
  ],
};

export default config;
