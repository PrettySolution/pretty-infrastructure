import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { Distribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { ThisEnvironment } from '../interfaces';

interface CloudFrontDistributionStackProps extends StackProps {
  env: ThisEnvironment;
}

export class CloudFrontDistributionStack extends Stack {
  constructor(scope: Construct, id: string, props: CloudFrontDistributionStackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.env.domainName,
    });

    const cert = new Certificate(this, 'Certificate', {
      validation: CertificateValidation.fromDns(hostedZone),
      domainName: hostedZone.zoneName,
      subjectAlternativeNames: [`*.${hostedZone.zoneName}`],
    });

    const webSiteBucket = new Bucket(this, 'WebSiteBucket', {
      // accessControl: BucketAccessControl.PRIVATE,
    });
    new StringParameter(this, 'WebSiteBucketArn', {
      parameterName: '/myApp/webSite/bucket/bucketArn',
      stringValue: webSiteBucket.bucketArn,
    });

    const distribution = new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(webSiteBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: [hostedZone.zoneName],
      certificate: cert,
      errorResponses: [
        { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html', ttl: Duration.minutes(5) },
        { httpStatus: 403, responseHttpStatus: 200, responsePagePath: '/index.html', ttl: Duration.minutes(5) },
      ],
    });


    new StringParameter(this, 'DistributionId', {
      parameterName: '/myApp/webSite/distribution/distributionId',
      stringValue: distribution.distributionId,
    });

    new StringParameter(this, 'DistributionDomainName', {
      parameterName: '/myApp/webSite/distribution/domainName',
      stringValue: distribution.domainName,
    });

    new ARecord(this, 'ARecord', {
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
  }
}