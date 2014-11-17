exports.config = {
  specs: [
  	'./e2e/**/*.spec.js'
  ],
  baseUrl: 'http://localhost:8080',
  capabilities: {
    'browserName': 'chrome'
  }
};
