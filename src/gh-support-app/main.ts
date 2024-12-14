import { App } from 'aws-cdk-lib';
import { GitHubSupportStack } from './GitHubSupportStack';

const app = new App();

new GitHubSupportStack(app, 'GithubSupport', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description: 'GithubSupport for pretty-solution',
});

app.synth();