import { Stack, StackProps } from 'aws-cdk-lib';
import { GitHubActionRole } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { GH_SUPPORT_DEPLOY_ROLE_NAME } from '../constants';

interface GithubSupportProps extends StackProps {
}

export class GitHubSupportStack extends Stack {
  constructor(scope: Construct, id: string, props: GithubSupportProps) {
    super(scope, id, props);

    new GitHubActionRole(this, 'DeployRole', {
      roleName: `${GH_SUPPORT_DEPLOY_ROLE_NAME}`,
      repos: [
        'prettysolution/*',
        // 'prettysolution/pretty-infrastructure',
        // 'prettysolution/pretty-website',
      ],
    });

    // todo: security
    // new CfnOutput(this, 'DeployRole', {
    //   value: deployRole.roleArn,
    // });
  }
}