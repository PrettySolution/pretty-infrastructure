// src/GithubSupport.ts
import { App } from 'aws-cdk-lib';
import { PRIMARY_REGION } from './constants';
import { GitHubSupportStack } from './stacks/GitHubSupportStack';

const app = new App();

new GitHubSupportStack(app, 'PrettySolutionGithubSupport', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUT_ID, // prettysolution aws account
    region: PRIMARY_REGION,
  },
});
// new GitHubSupportStack(app, 'ProdGithubSupport', {
//   env: {
//     account: PROD_ACCOUNT,
//     region: PRIMARY_REGION,
//   },
// });
app.synth();