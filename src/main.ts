import { App } from 'aws-cdk-lib';
import { PipelineStack } from './github-pipeline/PipelineStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new PipelineStack(app, 'gh-pipeline', { env: devEnv });

app.synth();