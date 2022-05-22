# A simple serverless app to check HTTP request and send you email

Thank you for checking this project!

Sometimes you may want to keep checking some websites to see whether there is any update or free slot for you 
to book reservations. This repo helps to get things done within an hour. It will

* Create a Lambda function to send HTTP(s) request to some website and check the response. If it finds anything interesting (feel free to customize the code), it will push a message to the SNS
* The SNS topic is created automatically and subscribes to the email address you specify 
* The Lambda will be scheduled to run repeatedly, via CloudWatch Rule (aka EventBridge)

All you need is a AWS account (free account should be okay), and the [CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html ) 

# HOW-TO

## First, install AWS CDK and configure AWS CLI
Install the AWS CDK Toolkit globally using the following Node Package Manager command.

`npm install -g aws-cdk`

Read more for [CDK installation guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

Add your AWS credential as the default AWS CLI profile or create new profile.

Run `npm install` to install the rest of node dependencies 

## Make change to the Lambda code
Update lambda/index.js to make request to your targeted website ([line no.5](https://github.com/jovezhong/serverlessHttpChecker/blob/master/lambda/index.js#L5))
and change the logic when to send notification (to SNS topic)

The one I am using is the Nexus interview for Vancouver/Richmond.

## Customize the scheduler
By default, the lambda will be trigger every 5 minutes. For sure, you can change this logic by changing lib/serverless_http_checker-stack.js [line 29](https://github.com/jovezhong/serverlessHttpChecker/blob/master/lib/serverless_http_checker-stack.js#L29). Be gentle.

## Deploy the serverless app
You can run command `cdk synth` to better understand what change will be made.

If you are okay with it, run `cdk deploy --parameters email=<email>` with your own email address.

Wait for 3-10 minutes for everything created on AWS (IAM role, SNS topic, Subscription, Lambda, Rule, etc)

## Check your mailbox
There should be an email from "AWS Notifications", asking you to confirm whether you want to subscribe to the SNS topic. Click the 'Confirm subscription' link.

## Login in AWS web console to verify everything
You can check the Lambda page to see the newly created lambda, with CloudWatch Event as the trigger. There should be an environment variable with the newly generated SNS topic ARN.

Go to the SNS page. You should see the newly created topic and your confirmation status is green.

## Be patient
You will get an email from AWS Notification if something you want is available. However, you have to take action by yourself.

If you get what you want, please disable the CloudWatch Rule trigger. Or even destroy everything via `cdk destroy` 

# TODO
I may improve this tool. Something in my mind:
* Refine this README
* Make the world a better place