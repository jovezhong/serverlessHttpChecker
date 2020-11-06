#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { ServerlessHttpCheckerStack } = require('../lib/serverless_http_checker-stack');

const app = new cdk.App();
new ServerlessHttpCheckerStack(app, 'HttpCheckerStack');
