import { awscdk } from 'projen';
import { GithubCredentials } from 'projen/lib/github';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.171.1',
  defaultReleaseBranch: 'main',
  name: 'advanced-aws-cdk',
  projenrcTs: true,
  gitignore: ['.idea'],
  githubOptions: { projenCredentials: GithubCredentials.fromApp() },
  release: false,

  deps: ['cdk-pipelines-github', 'aws-cdk-github-oidc'],
  devDeps: ['cdk-dia'],

  autoApproveOptions: { allowedUsernames: ['prettysolution[bot]'], secret: 'PR_AUTO_APPROVE' },
  autoApproveUpgrades: true,
});

const baseAppCommand: string =
  'cdk -a "npx ts-node -P tsconfig.json --prefer-ts-exts';

project.addTask('cdk:github', {
  exec: `${baseAppCommand} src/gh-support-app/main.ts"`,
  receiveArgs: true,
});

project.synth();

