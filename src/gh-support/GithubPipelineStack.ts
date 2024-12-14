import { Stack, StackProps } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { AwsCredentials, GitHubActionStep, GitHubWorkflow, JobPermission } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { GH_SUPPORT_DEPLOY_ROLE_NAME, PRIMARY_REGION, PROD_ACCOUNT } from '../constants';
import { MyAppGitHubStage } from '../stages/MyAppGitHubStage';


export class GithubPipelineStack extends Stack {
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

    pipeline.addStageWithGitHubOptions(new MyAppGitHubStage(this, 'prod', {
      env: {
        account: PROD_ACCOUNT,
        region: PRIMARY_REGION,
        domainName: 'pretty-solution.com',
      },

    }), {
      pre: [new GitHubActionStep('CloneWebsiteRepo', {
        permissions: { idToken: JobPermission.READ, contents: JobPermission.READ },
        jobSteps: [
          {
            name: 'Clone pretty-solution-website',
            uses: 'actions/checkout@v4',
            with: {
              repository: 'pretty-solution/pretty-solution-website',
              path: '../pretty-solution-website',
              ref: 'refs/heads/main',
            },
          },
        ],
      })],
    });
  }
}