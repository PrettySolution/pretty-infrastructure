import { Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { AwsCredentials, GitHubWorkflow } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { MyAppStage } from './MyAppStage';
import { GH_SUPPORT_DEPLOY_ROLE_NAME, PRIMARY_REGION, PROD_ACCOUNT } from '../constants';


export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const pipeline = new GitHubWorkflow(this, 'pipeline', {
      synth: new ShellStep('Build', {
        commands: [
          'yarn install',
          'yarn build',
        ],
      }),
      awsCreds: AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: `arn:aws:iam::${PROD_ACCOUNT}:role/${GH_SUPPORT_DEPLOY_ROLE_NAME}`,
      }),
    });

    const prod = new MyAppStage(this, 'prod', {
      env: {
        account: PROD_ACCOUNT,
        region: PRIMARY_REGION,
        domainName: 'pretty-solution.com',
      },
    });

    pipeline.addStageWithGitHubOptions(prod, {
      jobSettings: { if: 'github.ref == \'refs/heads/main\'' },
    });
  }
}