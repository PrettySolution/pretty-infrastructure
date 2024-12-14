import { Stack, StageProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';


interface WebSiteStageProps extends StageProps {

}

export class MyS3Stack extends Stack {

  constructor(scope: Construct, id: string, props: WebSiteStageProps) {
    super(scope, id, props);

    new Bucket(this, 'bucket');
  }

}