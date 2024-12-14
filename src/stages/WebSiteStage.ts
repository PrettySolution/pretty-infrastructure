import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyS3Stack } from '../stacks/MyS3Stack';


interface WebSiteStageProps extends StageProps {

}

export class WebSiteStage extends Stage {
  constructor(scope: Construct, id: string, props: WebSiteStageProps) {
    super(scope, id, props);

    new MyS3Stack(this, 's3', { env: props.env });

  }

}