const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const ServerlessHttpChecker = require('../lib/serverless_http_checker-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ServerlessHttpChecker.ServerlessHttpCheckerStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
