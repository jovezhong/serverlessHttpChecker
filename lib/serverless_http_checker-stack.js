const sns     = require('@aws-cdk/aws-sns');
const subs    = require('@aws-cdk/aws-sns-subscriptions');
const events  = require('@aws-cdk/aws-events');
const targets = require('@aws-cdk/aws-events-targets');
const lambda  = require('@aws-cdk/aws-lambda');
const cdk     = require('@aws-cdk/core');

const fs      = require('fs');

class ServerlessHttpCheckerStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const email = new cdk.CfnParameter(this, "email", {
      type: "String",
      description: "The email address to receive notification when the program finds something interesting"});

    const topic = new sns.Topic(this,'HttpCheckerSns');
    topic.addSubscription(new subs.EmailSubscription(email.valueAsString));

    const lambdaFn = new lambda.Function(this,'HttpCheckerLambda',{
      code: new lambda.InlineCode(fs.readFileSync('lambda/index.js',{encoding:'utf-8'})),
      handler:'index.handler',
      runtime:lambda.Runtime.NODEJS_12_X,
      environment:{'SNS_ARN':topic.topicArn}
    });

    const rule = new events.Rule(this,'HttpCheckerRule',{
      schedule: events.Schedule.rate(cdk.Duration.minutes(5))
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn));
  }
}

module.exports = { ServerlessHttpCheckerStack }
