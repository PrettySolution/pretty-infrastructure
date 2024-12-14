import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc';
import { Stack, StackProps } from 'aws-cdk-lib';
import { GitHubActionRole } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { GH_SUPPORT_DEPLOY_ROLE_NAME } from '../constants';

interface GithubSupportProps extends StackProps {
}

export class GitHubSupportStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubSupportProps) {
    super(scope, id, props);

    const provider = GithubActionsIdentityProvider.fromAccount(
      this,
      'GithubProvider',
    );

    new GitHubActionRole(this, 'DeployRole', {
      roleName: `${GH_SUPPORT_DEPLOY_ROLE_NAME}`,
      provider: provider,
      repos: [
        'pretty-solution/advanced-aws-cdk',
      ],
    });

    // todo: security
    // new CfnOutput(this, 'DeployRole', {
    //   value: deployRole.roleArn,
    // });
  }
}