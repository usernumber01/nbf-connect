const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 8000,
  expect: {
    timeout: 3000
  },
  reporter: [['json', { outputFile: 'test-results.json' }], ['list']],
  use: {
    actionTimeout: 4000,
    trace: 'off',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
