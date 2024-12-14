import { GithubActionsIdentityProvider, GithubActionsRole } from 'aws-cdk-github-oidc';
import { Stack, StackProps } from 'aws-cdk-lib';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
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

    const deployRole = new GithubActionsRole(this, 'DeployRole', {
      roleName: `${GH_SUPPORT_DEPLOY_ROLE_NAME}`,
      provider: provider,
      owner: 'pretty-solution',
      repo: 'advanced-aws-cdk',
    });
    deployRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));

    // todo: security
    // new CfnOutput(this, 'DeployRole', {
    //   value: deployRole.roleArn,
    // });
  }
}