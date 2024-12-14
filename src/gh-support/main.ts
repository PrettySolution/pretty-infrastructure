// src/GithubSupport.ts
import { App } from 'aws-cdk-lib';
import { PRIMARY_REGION, PROD_ACCOUNT } from '../constants';
import { GitHubSupportStack } from './GitHubSupportStack';

const app = new App();

new GitHubSupportStack(app, 'GithubSupport', {
  env: {
    account: PROD_ACCOUNT,
    region: PRIMARY_REGION,
  },
  description: 'GithubSupport for pretty-solution/advanced-aws-cdk',
});

app.synth();