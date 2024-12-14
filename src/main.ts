import { App } from 'aws-cdk-lib';
import { GithubPipelineStack } from './stacks/GithubPipelineStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new GithubPipelineStack(app, 'github-pipeline', { env: devEnv });

app.synth();