import { awscdk } from 'projen';
import { GithubCredentials } from 'projen/lib/github';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.171.1',
  defaultReleaseBranch: 'main',
  name: 'advanced-aws-cdk',
  projenrcTs: true,
  gitignore: ['.idea'],
  githubOptions: {
    projenCredentials: GithubCredentials.fromApp(),
  },
  release: true,
  deps: ['cdk-pipelines-github', 'aws-cdk-github-oidc'], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['cdk-dia'], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

const baseAppCommand: string =
  'cdk -a "npx ts-node -P tsconfig.json --prefer-ts-exts';

project.addTask('cdk:github', {
  exec: `${baseAppCommand} src/gh-support-app/main.ts"`,
  receiveArgs: true,
});

project.synth();

