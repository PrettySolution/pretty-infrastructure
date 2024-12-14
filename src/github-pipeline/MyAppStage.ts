import { GitHubStage, GitHubStageProps } from 'cdk-pipelines-github';
import { Construct } from 'constructs';
import { ThisEnvironment } from '../interfaces';
import { CloudFrontDistributionStack } from '../stacks/CloudFrontDistributionStack';
import { WebSiteStack } from '../stacks/WebSiteStack';


interface MyAppStageProps extends GitHubStageProps {
  env: ThisEnvironment;
}

export class MyAppStage extends GitHubStage {
  constructor(scope: Construct, id: string, props: MyAppStageProps) {
    super(scope, id, props);

    const dist = new CloudFrontDistributionStack(this, 'CloudFrontDistribution', {
      env: props.env,
      description: 'CloudFront distribution for pretty-solution.com',
    });
    const web = new WebSiteStack(this, 'WebSite', {
      env: props.env,
      description: 'Bucket Deployment for pretty-solution.com',
    });
    web.addDependency(dist); // there are StringParameter imports from dist in web

  }

}