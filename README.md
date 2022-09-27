![LambdaTest Logo](https://www.lambdatest.com/resources/images/logos/logo.svg)

# CodeceptJS-LambdaTest Service
---

A CodeceptJS-LambdaTest Service is a [CodeceptJS](https://codecept.io/) helper to update test name and test results on LambdaTest after test execution using the `_passed` and `_failed` hooks.

[![npm version](https://img.shields.io/npm/v/@lambdatest/node-fetch-sessions.svg?style=flat)](https://www.npmjs.com/package/codeceptjs-lambdatest-service)

## Steps to update test name and results on LambdaTest after test execution


### Step 1 - Installation

```
npm i codeceptjs-lambdatest-service --save-dev`
```

### Step 2 - Set LambdaTest Username and Access Key in environment variables.
 
For Linux/macOS:
```
$ export LT_USERNAME="YOUR_USERNAME"
$ export LT_ACCESS_KEY="YOUR ACCESS KEY"
```
For Windows:
```
$ set LT_USERNAME="YOUR_USERNAME"
$ set LT_ACCESS_KEY="YOUR ACCESS KEY"
```

### Step 3 - Configuration

Add the CodeceptJS-LambdaTest helper in `codecept.json/codecept.conf.js`

**Example**:

```
{
...
   helper: {
     LTHelper: {
      require: 'codeceptjs-lambdatest-service',
      user: process.env.LT_USERNAME,
      key: process.env.LT_ACCESS_KEY,
      updateTestName: true
    }
   }
...
}
```

**Note**
* To use this helper, you must provide the LambdaTest User & Access Key as part of the configuration.
* This helper should be the first helper
* Use `updateTestName: true` to set the test name dynamically from test cases.

### License
Node fetch sessions is available under the [Apache License 2.0.](https://github.com/LambdaTest/codeceptjs-lambdatest-service/blob/main/LICENSE) Use it wisely.

### About LambdaTest
[LambdaTest](https://www.lambdatest.com/) is a leading test execution and orchestration platform that is fast, reliable, scalable, and secure. It allows users to run both manual and automated testing of web and mobile apps across 3000+ different browsers, operating systems, and real device combinations. Using LambdaTest, businesses can ensure quicker developer feedback and hence achieve faster go to market. Over 500 enterprises and 1 Million + users across 130+ countries rely on LambdaTest for their testing needs.

#### Features
- Run Selenium, Cypress, Puppeteer, Playwright, and Appium automation tests across 3000+ real desktop and mobile environments.
- Real-time cross browser testing on 3000+ environments.
- Test on Real device cloud
- Blazing fast test automation with HyperExecute
- Accelerate testing, shorten job times and get faster feedback on code changes with Test At Scale.
- Smart Visual Regression Testing on cloud
- 120+ third-party integrations with your favorite tool for CI/CD, Project Management, Codeless Automation, and more.
- Automated Screenshot testing across multiple browsers in a single click.
- Local testing of web and mobile apps.
- Online Accessibility Testing across 3000+ desktop and mobile browsers, browser versions, and operating systems.
- Geolocation testing of web and mobile apps across 53+ countries.
- LT Browser - for responsive testing across 50+ pre-installed mobile, tablets, desktop, and laptop viewports

