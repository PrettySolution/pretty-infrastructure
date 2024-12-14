// src/GithubSupport.ts
import { App } from 'aws-cdk-lib';
import { PRIMARY_REGION } from './constants';
import { GitHubSupportStack } from './stacks/GitHubSupportStack';

const app = new App();

new GitHubSupportStack(app, 'GithubSupport', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUT_ID,
    region: PRIMARY_REGION,
  },
  description: 'GithubSupport for pretty-solution/advanced-aws-cdk',
});

app.synth();