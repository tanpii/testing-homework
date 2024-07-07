export default {
    gridUrl: "http://localhost:4444/wd/hub",
    baseUrl: "http://localhost:3000",
    pageLoadTimeout: 0,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
    sets: {
        desktop: {
            files: [
                "test/testplane/**/*.testplane.(t|j)s"
            ],
            browsers: [
                "chrome"
            ]
        }
    },
    browsers: {
        chrome: {
            automationProtocol: "devtools",
            headless: true,
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    plugins: {
        "html-reporter/testplane": {
            // https://github.com/gemini-testing/html-reporter
            enabled: true,
            path: "testplane-report",
            defaultView: "all",
            diffMode: "3-up-scaled"
        }
    }
};