import { Stack, StackProps } from 'aws-cdk-lib';
import { Distribution } from 'aws-cdk-lib/aws-cloudfront';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { MyEnvironment } from '../interfaces';


interface WebSiteStackProps extends StackProps {
  env: MyEnvironment;
}


export class WebSiteStack extends Stack {
  constructor(scope: Construct, id: string, props: WebSiteStackProps) {
    super(scope, id, props);

    const webSiteBucket = Bucket.fromBucketArn(this, 'WebSiteBucket', StringParameter.valueForStringParameter(this, '/myApp/webSite/bucket/bucketArn'));
    const distribution = Distribution.fromDistributionAttributes(this, 'Distribution', {
      distributionId: StringParameter.valueForStringParameter(this, '/myApp/webSite/distribution/distributionId'),
      domainName: StringParameter.valueForStringParameter(this, '/myApp/webSite/distribution/domainName'),
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [
        Source.asset('../pretty-solution-website'),
      ],
      destinationBucket: webSiteBucket,
      distributionPaths: ['/*'],
      distribution,
    });

  }
}