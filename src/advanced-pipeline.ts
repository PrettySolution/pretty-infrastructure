import { Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { AwsCredentials, GitHubWorkflow } from 'cdk-pipelines-github';
import { Construct } from 'constructs';

export class AdvancedPipeline extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new GitHubWorkflow(this, 'pipeline', {
      synth: new ShellStep('Build', {
        commands: [
          'yarn install',
          'yarn build',
        ],
      }),
      awsCreds: AwsCredentials.fromOpenIdConnect({
        gitHubActionRoleArn: 'arn:aws:iam::<account-id>:role/GitHubActionRole',
      }),
    });
  }
}