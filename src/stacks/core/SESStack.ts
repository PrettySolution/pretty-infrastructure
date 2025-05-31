import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { HostedZone, MxRecord } from 'aws-cdk-lib/aws-route53';
import { EmailIdentity, Identity, VdmAttributes } from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';
import { ThisEnvironment } from '../../interfaces';

interface SESStackProps extends cdk.StackProps {
  env: ThisEnvironment;
}

export class SESStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: SESStackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
      domainName: props.env.domainName,
    });

    new EmailIdentity(this, 'identity', {
      identity: Identity.publicHostedZone(hostedZone),
    });

    new MxRecord(this, 'MxRecord', {
      zone: hostedZone,
      values: [
        { priority: 1, hostName: 'SMTP.GOOGLE.COM.' },
        { priority: 10, hostName: `inbound-smtp.${props.env.region}.amazonaws.com.` },
      ],
      ttl: Duration.days(1),
    });

    new VdmAttributes(this, 'enableVDM', { engagementMetrics: true, optimizedSharedDelivery: true });

  }
}

// 1 SMTP.GOOGLE.COM.
