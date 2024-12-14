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
  deps: ['cdk-pipelines-github'], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['cdk-dia'], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

const hello = project.addTask('hello');
hello.exec('echo hello!');

const world = project.addTask('world');
world.spawn(hello);
world.exec('echo world!');

project.synth();

