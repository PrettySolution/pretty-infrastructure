import { Environment } from 'aws-cdk-lib';

export interface MyEnvironment extends Environment {
  domainName: string;
}