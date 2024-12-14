import { App } from 'aws-cdk-lib';
import { AdvancedPipeline } from './advanced-pipeline';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new AdvancedPipeline(app, 'advanced-pipeline', { env: devEnv });

app.synth();