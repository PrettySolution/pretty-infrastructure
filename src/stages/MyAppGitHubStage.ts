import { GitHubStage, GitHubStageProps } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { MyEnvironment } from '../interfaces';
import { CloudFrontDistributionStack } from '../stacks/CloudFrontDistributionStack';
import { MyS3Stack } from '../stacks/MyS3Stack';
import { WebSiteStack } from '../stacks/WebSiteStack';


interface MyAppGitHubStageProps extends GitHubStageProps {
  env: MyEnvironment;
}

export class MyAppGitHubStage extends GitHubStage {
  constructor(scope: Construct, id: string, props: MyAppGitHubStageProps) {
    super(scope, id, props);

    new MyS3Stack(this, 's3', { env: props.env });
    const dist = new CloudFrontDistributionStack(this, 'CloudFrontDistribution', { env: props.env });
    const web = new WebSiteStack(this, 'WebSite', { env: props.env });
    web.addDependency(dist); // there are StringParameter imports from dist in web

  }

}