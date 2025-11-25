question-ai-logo
managemanage
managemanage
useruser
fullfull
closeclose
Chat AI
Hello! Is there any question I can help you with?
Which iconic American landmark is located in South Dakota and features the faces of four U.S. presidents?
Which city is known as the “Big Apple” in the United States?
Ask AI
logo
more
Skip to main content
Remotion Logo
Docs
API
Products
Resources
Commercial

Getting started
Designing visuals
Embedding videos
Audio

Parameterized videos

Rendering

Studio
Server-side rendering

Client-side rendering

Player

Lambda

API Reference
Setup
Authentication
Permissions
Region selection
Concurrency
Runtime
Disk size
FAQ
Light client
Custom Layers
Separating environments
Custom output destination
Production Checklist
Webhooks
Cost example
Auto-delete renders
Troubleshooting
Using without IAM users

Rendering from PHP
Rendering from Go
Rendering from Python
Rendering from Ruby
Serverless.com
Supabase
Cloudflare R2
Insights
Multiple buckets
Data transfer cost
How Remotion Lambda works
Bucket naming
Optimizing for cost
Optimizing for speed
Using a proxy
Limits
Prerelease Changelog
Upgrading Lambda
Uninstall Lambda
Cannot create public bucket
Function naming convention
Cloud Run

Media Parser

WebCodecs

Building apps
AI

Tooling
Troubleshooting
Snippets
API Reference
Mediabunny

Upgrading Remotion
Terminology

List of resources
Migration guides
Get help

Miscellaneous
FAQ
Contributing
License & Pricing
Acknowledgements
Editor Starter
Timeline

Recorder
LambdaSetup
Copy page

Setup

Also available as a 18min video
How to set up Remotion Lambda
1. Install @remotion/lambda
npm
yarn
pnpm
bun
npm i --save-exact @remotion/lambda@4.0.377
This assumes you are currently using v4.0.377 of Remotion.
Also update remotion and all `@remotion/*` packages to the same version.
Remove all ^ character in front of the version numbers of it as it can lead to a version conflict.
2. Create role policy
Go to AWS account IAM Policies section
Click on "Create policy"
Click on JSON
In your project, type npx remotion lambda policies role in the command line and copy it into the "JSON" field on AWS.
Click next. Give the policy exactly the name remotion-lambda-policy. The other fields can be left as they are.
On the tags page, you don't need to fill in anything. Click next again.
3. Create a role
Go to AWS account IAM Roles section
Click "Create role".
Under "Use cases", select "Lambda". Click next.
Under "Permissions policies", filter for remotion-lambda-policy and click the checkbox to assign this policy. Click next.
In the final step, name the role remotion-lambda-role exactly. You can leave the other fields as is.
Click "Create role" to confirm.
4. Create a user
Go to AWS account IAM Users section
Click Add users
Enter any username, such as remotion-user.
Don't check the "Enable console access" option. You don't need it.
Click "Next".
Click "Next" again without changing any settings. You should now be on the "Review and Create" step.
Click "Create user".
5. Create an access key for the user
Go to AWS account IAM Users section
Click on the name of the user that was created in step 4.
Navigate to the "Security Credentials" tab, and scroll down to the "Access Keys" section.
Click the "Create access key" button.
Select "Application running on an AWS compute service".
Ignore warnings that might appear and check the "I understand the recommendations..." checkbox.
Click "Next".
Click "Create access key".
Add a .env file to your project's root and add the credentials you just copied in the following format:
.env
REMOTION_AWS_ACCESS_KEY_ID=<Access key ID>
REMOTION_AWS_SECRET_ACCESS_KEY=<Secret access key>
6. Add permissions to your user
Go to AWS account IAM Users section
Select the user you just created.
Click "Add inline policy" under the "Add Permissions" dropdown in the "Permissions policies" panel.
Click the tab "JSON".
Enter in your terminal: npx remotion lambda policies user and copy into the AWS text field what gets printed.
Click "Review policy".
Give the policy a name. For example remotion-user-policy, but it can be anything.
Click "Create policy" to confirm.
7. Optional: Validate the permission setup
Check all user permissions and validate them against the AWS Policy simulator by executing the following command:

npx remotion lambda policies validate
For the following steps, you may execute them on the CLI, or programmatically using the Node.JS APIs.

8. Deploy a function
CLI
Node.JS
Deploy a function that can render videos into your AWS account by executing the following command:

npx remotion lambda functions deploy
The function consists of necessary binaries and JavaScript code that can take a serve URL and make renders from it. A function is bound to the Remotion version, if you upgrade Remotion, you need to deploy a new function. A function does not include your Remotion code, it will be deployed in the next step instead.

9. Deploy a site
CLI
Node.JS
Run the following command to deploy your Remotion project to an S3 bucket. Pass as the last argument the entry point of the project.

npx remotion lambda sites create src/index.ts --site-name=my-video
A Serve URL will be printed pointing to the deployed project.

When you update your Remotion code in the future, redeploy your site. Pass the same --site-name to overwrite the previous deploy. If you don't pass --site-name, a unique URL will be generated on every deploy.

10. Check AWS concurrency limit
Check the concurrency limit that AWS has given to your account:

npx remotion lambda quotas
By default, it is 1000 concurrent invocations per region. However, new accounts might have a limit as low as 10. Each Remotion render may use as much as 200 functions per render concurrently, so if your assigned limit is very low, you might want to request an increase right away.

11. Render a video
CLI
Node.JS
Take the URL you received from the step 9 - your "serve URL" - and run the following command. Also pass in the ID of the composition you'd like to render.

npx remotion lambda render <serve-url> <composition-id>
Progress will be printed until the video finished rendering. Congrats! You rendered your first video using Remotion Lambda 🚀

Next steps
Select which region(s) you want to run Remotion Lambda in.
Familiarize yourself with the CLI and the Node.JS APIs (list in sidebar).
Learn how to upgrade Remotion Lambda.
Before going live, go through the Production checklist.
If you have any questions, go through the FAQ or ask in our Discord channel
Improve this page
Ask on Discord
Get help
Previous
Overview
Next
Authentication
1. Install @remotion/lambda
2. Create role policy
3. Create a role
4. Create a user
5. Create an access key for the user
6. Add permissions to your user
7. Optional: Validate the permission setup
8. Deploy a function
9. Deploy a site
10. Check AWS concurrency limit
11. Render a video
Next steps

© Copyright 2025 Remotion AG.
Website created with Docusaurus.

Remotion
Getting started
API Reference
Player
Lambda
Learn
Convert a video
Store
GitHub
Remotion Pro
Community
Showcase
Experts
Discord
X
YouTube
LinkedIn
Instagram
TikTok
More
About us
Contact us
Blog
Success Stories
Support
Changelog
Acknowledgements
License
Terms and Conditions
Privacy Policy
Brand
Ask AI




question-ai-logo
managemanage
managemanage
useruser
fullfull
closeclose
Chat AI
Hello! Is there any question I can help you with?
Which iconic American landmark is located in South Dakota and features the faces of four U.S. presidents?
Which city is known as the “Big Apple” in the United States?
Ask AI
logo
more
Skip to main content
Remotion Logo
Docs
API
Products
Resources
Commercial

Getting started
Designing visuals
Embedding videos
Audio

Parameterized videos

Rendering

Studio
Server-side rendering

Client-side rendering

Player

Lambda

API Reference
Setup
Authentication
Permissions
Region selection
Concurrency
Runtime
Disk size
FAQ
Light client
Custom Layers
Separating environments
Custom output destination
Production Checklist
Webhooks
Cost example
Auto-delete renders
Troubleshooting
Using without IAM users

Rendering from PHP
Rendering from Go
Rendering from Python
Rendering from Ruby
Serverless.com
Supabase
Cloudflare R2
Insights
Multiple buckets
Data transfer cost
How Remotion Lambda works
Bucket naming
Optimizing for cost
Optimizing for speed
Using a proxy
Limits
Prerelease Changelog
Upgrading Lambda
Uninstall Lambda
Cannot create public bucket
Function naming convention
Cloud Run

Media Parser

WebCodecs

Building apps
AI

Tooling
Troubleshooting
Snippets
API Reference
Mediabunny

Upgrading Remotion
Terminology

List of resources
Migration guides
Get help

Miscellaneous
FAQ
Contributing
License & Pricing
Acknowledgements
Editor Starter
Timeline

Recorder
LambdaAuthentication
Copy page

Authentication
You can authenticate with the @remotion/lambda package either using:

an REMOTION_AWS_PROFILE or AWS_PROFILE environment variable pointing to a file
REMOTION_AWS_ACCESS_KEY_ID and REMOTION_AWS_SECRET_ACCESS_KEY environment variables
AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables
Environment variables sitting in a .env file are automatically picked up if you use the Remotion CLI, but not if you use the Node.JS APIs. If multiple ways are provided, Remotion will use the order above and use the first credentials found.

We recommend using the environment variable variants prefixed with REMOTION_ because:

On some environments, the unprefixed variants may be reserved (e.g. Vercel deployments)
Confusing conflicts between Remotion and the AWS CLI may be caused if you use the unprefixed versions.
Rotating credentials
Using more than one AWS account can be a viable scaling strategy to increase the concurrency limit. To do so, you can set new values for the REMOTION_AWS_ACCESS_KEY_ID and REMOTION_AWS_SECRET_ACCESS_KEY or other environment variables before making an operation using @remotion/lambda. Below is an implementation example.

.env
# Account 1
AWS_KEY_1=AK...
AWS_SECRET_=M/
# Account 2
AWS_KEY_2=AK...
AWS_SECRET_2=M/
note
You need to read the .env file yourself using the dotenv package.

rotate-credentials.ts
const getAccountCount = () => {
  let count = 0;
  while (
    process.env["AWS_KEY_" + (count + 1)] &&
    process.env["AWS_SECRET_" + (count + 1)]
  ) {
    count++;
  }
 
  return count;
};
 
const getRandomAwsAccount = () => {
  return Math.ceil(Math.random() * getAccountCount());
};
 
const setEnvForKey = (key: number) => {
  process.env.REMOTION_AWS_ACCESS_KEY_ID = process.env[`AWS_KEY_${key}`];
  process.env.REMOTION_AWS_SECRET_ACCESS_KEY = process.env[`AWS_SECRET_${key}`];
};
 
// Set random account credentials
setEnvForKey(getRandomAwsAccount());
Using an AWS profile
available from v3.3.9

If you prefer AWS profile, you may use them. The list of profiles is located at ~/.aws/credentials on macOS and Linux and has the following format:

~/.aws/credentials
[default]
# ...
[remotion]
aws_access_key_id = YOUR_ACCESS_KEY_ID
aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
In this example, we added a remotion profile. Now, by setting REMOTION_AWS_PROFILE=remotion, you can select the profile and don't need to pass each environment variable separately anymore.

Skipping the credentials checkv4.0.160
There are other ways the S3 client can authenticate, like from EC2 instance metadata.
If you have set this up, you may set the REMOTION_SKIP_AWS_CREDENTIALS_CHECK environment variable to any value.

process.env.REMOTION_SKIP_AWS_CREDENTIALS_CHECK = "1";
Remotion will not check the credentials and will not throw an error if they are not set.
However, if there is a misconfiguration, you may still get an error from the AWS SDK.
Also read the note about caching clients.

Disable cachingv4.0.160
AWS clients are cached to save memory and speed up initialization.
The cache key is based on the credentials and the region.

If you opted out of the credentials check, the instance is cached for the lifetime of the process.
If you want to disable the cache, set the REMOTION_SKIP_AWS_CREDENTIALS_CHECK environment variable to any value.
It's unlikely you need to set this value. This is only if you change the way you authenticate between API calls.

See also
Region selection
Improve this page
Ask on Discord
Get help
Previous
Setup
Next
Permissions
Rotating credentials
Using an AWS profile
Skipping the credentials check
Disable caching
See also

© Copyright 2025 Remotion AG.
Website created with Docusaurus.

Remotion
Getting started
API Reference
Player
Lambda
Learn
Convert a video
Store
GitHub
Remotion Pro
Community
Showcase
Experts
Discord
X
YouTube
LinkedIn
Instagram
TikTok
More
About us
Contact us
Blog
Success Stories
Support
Changelog
Acknowledgements
License
Terms and Conditions
Privacy Policy
Brand
Ask AI



---
image: /generated/articles-docs-lambda-permissions.png
sidebar_label: Permissions
title: Permissions
crumb: 'Lambda'
---

import {UserPolicy} from '../../components/lambda/user-permissions.tsx';
import {RolePolicy} from '../../components/lambda/role-permissions.tsx';

This document describes the necessary permissions for Remotion Lambda and explains to those interested why the permissions are necessary.

For a step by step guide on how to set up permissions, [follow the setup guide](/docs/lambda/setup).

## User permissions

This policy should be assigned to the **AWS user**. To do so, go to the [AWS console](https://console.aws.amazon.com/console/home) ➞ [IAM](https://console.aws.amazon.com/iam/home) ➞ [Users](https://console.aws.amazon.com/iamv2/home#/users) ➞ Your created Remotion user ➞ Permissions tab ➞ Add inline policy ➞ JSON.

<details>
  <summary>
    Show full user permissions JSON file for latest Remotion Lambda version
  </summary>
  <UserPolicy />
</details>

:::info
You can always get the suitable permission file for your Remotion Lambda version by typing `npx remotion lambda policies user`.
:::

## Role permissions

This policy should be assigned to the **role `remotion-lambda-role`** in your AWS account. The permissions below are given to the Lambda function itself.

To assign, go to [AWS console](https://console.aws.amazon.com/console/home) ➞ [IAM](https://console.aws.amazon.com/iam/home) ➞ [Roles](https://console.aws.amazon.com/iamv2/home#/roles) ➞ [`remotion-lambda-role`](https://console.aws.amazon.com/iam/home#/roles/remotion-lambda-role) ➞ Permissions tab ➞ [Add inline policy](https://console.aws.amazon.com/iam/home#/roles/remotion-lambda-role$createPolicy?step=edit).

<details>
  <summary>
    Show full role permissions JSON file for latest Remotion Lambda version
  </summary>
  <RolePolicy />
</details>

:::info
You can always get the suitable permission file for your Remotion Lambda version by typing `npx remotion lambda policies role`.
:::

## Validation

There are two ways in which you can test if the permissions for the user have been correctly set up. Either you execute the following command:

```bash
npx remotion lambda policies validate
```

or if you want to validate it programmatically, using the [`simulatePermissions()`](/docs/lambda/simulatepermissions) function.

:::info
Policies for the role cannot be validated.
:::

## Explanation

The following table is a breakdown of why Remotion Lambda requires the permissions it does.

### User policies

<table>
  <tr>
    <th>
      Permission
    </th>
    <th>
      Scope
    </th>
    <th>
      Reason
    </th>
  </tr>
  <tr>
    <td>
      <code>iam:SimulatePrincipalPolicy</code>
    </td>
    <td><code>*</code></td>
    <td>
      Allows for <code>npx remotion lambda permissions validate</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>iam:PassRole</code>
    </td>
    <td><code>arn:aws:iam::*:role/remotion-lambda-role</code></td>
    <td>
    Allows the Lambda function to assume a role with sufficient permissions.
    </td>
  </tr>
  <tr>
    <td>
      <code>s3:GetObject</code> <br />
      <code>s3:DeleteObject</code> <br />
      <code>s3:PutObjectAcl</code> <br />
      <code>s3:PutObject</code> <br />
      <code>s3:CreateBucket</code> <br/>
      <code>s3:ListBucket</code> <br />
      <code>s3:GetBucketLocation</code> <br />
      <code>s3:PutBucketAcl</code> <br />
      <code>s3:DeleteBucket</code> <br />
      <code>s3.PutBucketOwnershipControls</code> <br />
      <code>s3.PutBucketPublicAccessBlock</code> <br />
    </td>
    <td>
      <code>{'arn:aws:s3:::remotionlambda-*'}</code>
    </td>
    <td>
      Allows to create and delete buckets and objects in your account, make objects public and configure them as websites. Only buckets that start with <code>remotionlambda-</code> can be accessed. 
    </td>
  </tr>
  <tr>
    <td>
      <code>s3:ListAllMyBuckets</code>
    </td>
    <td>
      <code>{'arn:aws:s3:::*'}</code>
    </td>
    <td>
      Allows listing the names of all buckets in your account, in order to detect an already existing Remotion bucket.
    </td>
  </tr>

  <tr>
    <td>
      <code>lambda:GetLayerVersion</code>
    </td>
    <td>
      <code>{"arn:aws:lambda:*:678892195805:layer:remotion-binaries-*"}</code>
    </td>
    <td>
    Allows to read Chromium and FFMPEG binaries. These binaries are hosted in an account hosted by Remotion specifically dedicated to hosting those layers in all supported regions.
    </td>
  </tr>
  <tr>
    <td>
      <code>lambda:ListFunctions</code> <br/>
      <code>lambda:GetFunction</code> <br/>
    </td>
    <td>
      <code>{"*"}</code>
    </td>
    <td>
    Allows to read the functions in your AWS account in order to find the correct function to invoke. The loose <code>*</code> permission is because AWS doesn't allow this permission to be tightened.
    </td>
  </tr>
  <tr>
    <td>
      <code>lambda:InvokeAsync</code> <br/>
      <code>lambda:InvokeFunction</code> <br/>
      <code>lambda:DeleteFunction</code> <br/>
      <code>lambda:PutFunctionEventInvokeConfig</code> <br/>
      <code>lambda:CreateFunction</code> <br/>
      <code>lambda:PutRuntimeManagementConfig</code> <br/>
      <code>lambda:TagResource</code> <br/>
    </td>
    <td>
      <code>{"arn:aws:lambda:*:*:function:remotion-render-*"}</code>
    </td>
    <td>
    Allows to create, delete, invoke and configure functions (such as disabling automatic retries). Used by the CLI and the Node.JS APIS to set up, execute and teardown the infrastructure. <code>lambda:TagResource</code> will optionally tag the functions 
    </td>
  </tr>
  <tr>
    <td>
      <code>logs:CreateLogGroup</code> <br/>
      <code>logs:PutRetentionPolicy</code>
    </td>
    <td>
      <code>{"arn:aws:logs:*:*:log-group:/aws/lambda/remotion-render-*"}</code>
    </td>
    <td>
    Allows to create CloudWatch group, so logs can be saved in there later. Simplifies debugging.
    </td>
  </tr>
  <tr>
    <td>
      <code>servicequotas:GetServiceQuota</code> <br/>
      <code>servicequotas:GetAWSDefaultServiceQuota</code> <br/>
      <code>servicequotas:RequestServiceQuotaIncrease</code> <br/>
      <code style={{wordBreak: 'break-all'}}>servicequotas:ListRequestedServiceQuotaChangeHistoryByQuota</code> <br/>
    </td>
    <td>
      <code>{"*"}</code>
    </td>
    <td>
    Powers the <code>lambda quotas</code> CLI command.
    </td>
  </tr>
</table>

### Role policies

<table>
  <tr>
    <th>
      Permission
    </th>
    <th>
      Scope
    </th>
    <th>
      Reason
    </th>
  </tr>
  <tr>
    <td>
      <code>s3.ListAllMyBuckets</code>
    </td>
    <td>
      <code>{"*"}</code>
    </td>
    <td>
    Get a list of Remotion buckets in order to find existing buckets that start with <code>remotionlambda-</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>s3:CreateBucket</code> <br/>
      <code>s3:ListBucket</code> <br/>
      <code>s3:PutBucketAcl</code> <br/>
      <code>s3:GetObject</code> <br/>
      <code>s3:DeleteObject</code> <br/>
      <code>s3:PutObjectAcl</code> <br/>
      <code>s3:PutObject</code> <br/>
      <code>s3:GetBucketLocation</code> 
    </td>
    <td>
      <code>{"arn:aws:s3:::remotionlambda-*"}</code>
    </td>
    <td>
  Create and delete buckets and items, make them public or private and fetch their location. Since Remotion stores the videos in an S3 bucket, it needs basic CRUD capabilities over those buckets. The permission only applies to buckets that start with <code>remotionlambda-</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>lambda:InvokeFunction</code> <br/>
    </td>
    <td>
      <code>{"arn:aws:lambda:*:*:function:remotion-render*"}</code>
    </td>
    <td>
Allow the function to recursively invoke itself. A render involves multiple function calls, which is to be orchestrated by the first function call.
    </td>

  </tr>
  <tr>
    <td>
      <code>lambda:CreateLogStream</code> <br/>
      <code>lambda:PutLogEvents</code> <br/>
    </td>
    <td>
      <code>{"arn:aws:logs:*:*:log-group:/aws/lambda/remotion-render*"}</code>
    </td>
    <td>
Allows to write the function logs to CloudWatch for easier debugging.
    </td>

  </tr>
 
</table>

## See also

- [Set up guide](/docs/lambda/setup)
- [`simulatePermissions()`](/docs/lambda/simulatepermissions)
- [Permissions Troubleshooting](/docs/lambda/troubleshooting/permissions)




---
image: /generated/articles-docs-lambda-region-selection.png
id: region-selection
title: Region selection
slug: /lambda/region-selection
crumb: 'Lambda'
---

import {LambdaRegionList} from '../../components/lambda/regions.tsx';

Before going live with Remotion Lambda, you need to think about into which AWS region you are deploying your function and bucket.

This document explains how to select a region and which considerations you need to make.

## Available regions

The following AWS regions are available:

<LambdaRegionList />

You can call [`getRegions()`](/docs/lambda/getregions) or type [`npx remotion lambda regions`](/docs/lambda/cli/regions) to get this list programmatically.

:::note
Support for regions `eu-west-3`, `eu-south-1`, `eu-north-1`, `us-west-1`, `af-south-1`, `ap-east-1`, `ap-northeast-2`, `ap-northeast-3`, `ca-central-1`, `me-south-1`, `sa-east-1` has been added in v3.3.7.
:::

## Default region

The default region is `us-east-1`.

## Selecting a region

There are 3 ways to select a region:

- When using the Node.JS APIs, you have to pass the region explicitly to each function. Make sure your projects satisfy the Typescript types or follow the documentation.

- When using the CLI, you can set the region using the `REMOTION_AWS_REGION` environment variable. It's best to put it in a `.env` file so you don't forget it.

:::note
The variable is called `REMOTION_AWS_REGION` because in Cloud providers like Vercel, `AWS_REGION` is a reserved environment variable name. However, Remotion does also accept the latter if you use it locally.
:::

- You can also pass the `--region` flag to all CLI commands to override the region. The flag takes precedence over the environment variable.

:::note
The REMOTION_AWS_REGION environment variable and `--region` flag do not have an effect when using the Node.JS APIs. You need to pass a region explicitly.
:::

If you don't set a region, Remotion will use the default region.

## Which region should I choose?

Different regions have different pricing. Use the following table to get a sense of the pricing differences.

Data may be out of date, please consult the [AWS Lambda Pricing page](https://aws.amazon.com/lambda/pricing/) for the latest information.

| Region         | Price per GB-second |
| -------------- | ------------------- |
| ap-east-1      | 0.0000183000        |
| af-south-1     | 0.0000176800        |
| me-south-1     | 0.0000165334        |
| eu-south-1     | 0.0000156138        |
| ap-south-1     | 0.0000133334        |
| ap-northeast-3 | 0.0000133334        |
| ap-northeast-2 | 0.0000133334        |
| ap-southeast-1 | 0.0000133334        |
| ap-southeast-2 | 0.0000133334        |
| ap-northeast-1 | 0.0000133334        |
| ca-central-1   | 0.0000133334        |
| eu-central-1   | 0.0000133334        |
| eu-west-1      | 0.0000133334        |
| eu-west-2      | 0.0000133334        |
| eu-west-3      | 0.0000133334        |
| eu-north-1     | 0.0000133334        |
| sa-east-1      | 0.0000133334        |
| us-east-1      | 0.0000133334        |
| us-east-2      | 0.0000133334        |
| us-west-1      | 0.0000133334        |
| us-west-2      | 0.0000133334        |

Previously, this section mentioned differences in the amount of concurrent lambdas that can be run in a region. This is no longer the case.

## Enabling regions in the AWS console

Some regions that are supported by Remotion are not enabled by default in an AWS account. If you get a message:

```
The security token included in the request is invalid
```

see [here](/docs/lambda/troubleshooting/security-token)

## Other considerations

- The function and S3 bucket must be in the same region to eliminate latency across datacenters. Rendering with functions and buckets that have mismatching regions is not supported

- You may deploy your whole architecture to different regions to further increase the amount of renders you can make concurrently. This has the advantage of higher redundancy, but a potential drawback of hitting a non-warm function.

- Some regions are more expensive than others (for example `af-south-1`).
  Consult the [Lambda Pricing page](https://aws.amazon.com/lambda/pricing/) from AWS.

- Some regions [are disabled by default](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html) and you need to enable them in your AWS account before you can use them.




---
image: /generated/articles-docs-lambda-concurrency.png
id: concurrency
title: Concurrency
crumb: 'Lambda'
---

Remotion Lambda is a highly concurrent distributed video rendering system. That means that the video rendering work is split up across many Lambda functions. How many Lambda functions exactly can be defined by you, or you let Remotions defaults decide.

## Setting the concurrency

You can set the concurrency via the [`framesPerLambda`](/docs/lambda/rendermediaonlambda#framesperlambda) option (or [`--frames-per-lambda`](/docs/lambda/cli/render#--frames-per-lambda) via CLI).

Alternatively, you can use the [`concurrency`](/docs/lambda/rendermediaonlambda#concurrency) option (or [`--concurrency`](/docs/lambda/cli/render#--concurrency) via CLI) to specify the number of Lambda functions directly without needing to know the video duration.

The concurrency is defined as `frameCount / framesPerLambda`. That means that the higher you set `framesPerLambda`, the lower the concurrency gets.

:::note
Example: You render a video that has a `durationInFrames` of `300` with a `framePerLambda` setting of `15`. The concurrency is `300 / 15 = 20`.
:::

## Default values

By default, Remotion chooses a value between 20 and ∞ for `framesPerLambda`. The longer the video, the higher the concurrency. As a baseline, no matter how short the video, always at least 20 frames are rendered per Lambda.

The following chart shows how the `framesPerLambda` and the implied concurrency is chosen based on the frame count:

<img src="/img/concurrency-chart.svg" />

The code for determining the `framesPerLambda` parameter is:

```tsx twoslash
import {interpolate} from 'remotion';

const bestFramesPerLambdaParam = (frameCount: number) => {
  // Between 0 and 10 minutes (at 30fps), interpolate the concurrency from 75 to 150
  const concurrency = interpolate(frameCount, [0, 18000], [75, 150], {
    extrapolateRight: 'clamp',
  });

  // At least have 20 as a `framesPerLambda` value
  const framesPerLambda = Math.max(frameCount / concurrency, 20);

  // Evenly distribute: For 21 frames over 2 lambda functions, distribute as 11 + 10 ==> framesPerLambda = 11
  const lambdasNeeded = Math.ceil(frameCount / framesPerLambda);

  return Math.ceil(frameCount / lambdasNeeded);
};
```

import {ConcurrencyCalculator} from '../../components/Concurrency';

<ConcurrencyCalculator />

## Concurrency limits

Ensure that you only set parameter within these limits to ensure the renders don't throw any errors:

- Minimum `framesPerLambda`: 5 (4 up until Remotion 4.0.331)
- Maximum concurrency: 200

The Remotion Lambda defaults will never go outside these bounds.

## "Too many functions"

If you get an error:

> Too many functions: This render would cause [X] functions to spawn. We limit this amount to 200 functions as more would result in diminishing returns.

You have set a value for `framesPerLambda` that is very low and would cause many functions to be spawned. In our experience, renders will not become faster if the concurrency is increased beyond this point.

- We recommend setting the `framesPerLambda` value to `null`. Remotion will choose a reasonable value that stays within the bounds.
- If you don't want to use the default, ensure that you don't set values that go outside of the bounds defined above.


---
image: /generated/articles-docs-lambda-runtime.png
id: runtime
title: Runtime
slug: /lambda/runtime
crumb: 'Lambda'
---

import {DefaultMemorySize} from '../../components/lambda/default-memory-size';
import {DefaultTimeout} from '../../components/lambda/default-timeout';

This page describes the environment that the Lambda function is running in.

## Node.JS Version

_from v4.0.245_

The Lambda function uses a NodeJS version from the `20.x` release line.  
The Lambda runtime will get locked to

```
arn:aws:lambda:${region}::runtime:da57c20c4b965d5b75540f6865a35fc8030358e33ec44ecfed33e90901a27a72
```

if your user policy includes `lambda:PutRuntimeManagementConfig`, which is recommended.  
Otherwise, future updates to the runtime by AWS have the potential to break the function. If you don't have this permission in your policy, a warning will be printed.

## Memory size

The default is <DefaultMemorySize/> MB. You can configure it by passing an argument to [`deployFunction()`](/docs/lambda/deployfunction) or by passing a `--memory` flag to the CLI when deploying a function.

## Timeout

The default is <DefaultTimeout /> seconds. You can configure it when calling [`deployFunction()`](/docs/lambda/deployfunction) or by passing a `--timeout` flag to the CLI when deploying a function.

Note that you probably don't need to increase it - Since the video is rendered by splitting it into many parts and those parts are rendered in parallel, there are rare cases where you need more than <DefaultTimeout /> seconds.

## Storage space

The function has between [512MB and 10GB of storage space](/docs/lambda/disk-size) in total available for video rendering depending on your configuration. Keep in mind that the concatenations of various chunks into one video takes place within a Lambda function, so the space must suffice for both the chunks and the output video.

## Core count / vCPUs

The amount of cores inside a Lambda is dependent on the amount of memory you give it. According to [this research](https://web.archive.org/web/20230331040434/https://www.sentiatechblog.com/aws-re-invent-2020-day-3-optimizing-lambda-cost-with-multi-threading), these are the tiers:

| Memory         | vCPUs |
| -------------- | ----- |
| 128 - 3008 MB  | 2     |
| 3009 - 5307 MB | 3     |
| 5308 - 7076 MB | 4     |
| 7077 - 8845 MB | 5     |
| 8846+ MB       | 6     |

You can render multiple frames at once inside a Lambda function by using the [`concurrencyPerLambda`](/docs/lambda/rendermediaonlambda#concurrencyperlambda) option.

## Chrome

The function already includes a running version of Chrome.
The browser was compiled including the proprietary codecs, so you can include MP4 videos into your project.

| Remotion version | Chrome version |
| ---------------- | -------------- |
| From 4.0.274     | 133.0.6943.141 |
| From 4.0.245     | 123.0.6312.86  |
| From 4.0.0       | 114.0.5731.1   |
| From 3.2.0       | 104.0.5112.64  |
| From 3.0.8       | 101.0.4951.68  |
| From 3.0.0       | 98.0.4758.139  |

## FFmpeg

The FFmpeg which is built into `@remotion/renderer` is being used on Lambda.

## Fonts

The function includes the following fonts:

- Noto Color Emoji
- Noto Sans Black
- Noto Sans Bold
- Noto Sans Regular
- Noto Sans SemiBold
- Noto Sans Thin
- Noto Sans Arabic Regular
- Noto Sans Devanagari Regular
- Noto Sans Hebrew Regular
- Noto Sans Tamil Regular
- Noto Sans Thai Regular

Since December 2021 the following fonts are also available **only on the `arm64` version of Remotion Lambda:**

- Noto Sans Simplified Chinese Regular
- Noto Sans Simplified Chinese Bold
- Noto Sans Traditional Chinese Regular
- Noto Sans Traditional Chinese Bold
- Noto Sans Korean Regular
- Noto Sans Korean Bold
- Noto Sans Japanese Regular
- Noto Sans Japanese Bold

If you'd like to use different fonts, we recommend using Webfonts.

While the set of default fonts that we can include must be kept small in order to save space, we are happy to hear feedback if you encounter a scenario where characters cannot be rendered.

## Customize layers

See: [Customize Lambda layers](/docs/lambda/custom-layers) to learn about how you can customize this stack.

## See also

- [Customize Lambda layers](/docs/lambda/custom-layers)



---
image: /generated/articles-docs-lambda-disk-size.png
id: disk-size
title: Disk size
crumb: 'Lambda'
---

By default, each Lambda function comes with an ephemereal disk size of:

| Remotion Version | Default |
| ---------------- | ------- |
| &lt;5.0.0        | 2048MB  |
| &gt;=5.0.0       | 10240MB |

Increasing disk space will allow for longer videos, and speeds up renders because Chrome has access to more disk cache.  
Disk.

Adding more disk space will almost not affect the cost of your renders at all (less than 1% more cost).  
Therefore we recommend setting the disk size to the maximum possible value: 10240MB.

## Approximate maximum video length

Note that we recommend setting the disk size to the maximum possible value: 10240MB.

| Disk size | Approximate Maximum video length |
| --------- | -------------------------------- |
| 512 MB    | 8 min - 1080p                    |
| 1024 MB   | 16 min - 1080p                   |
| 2048 MB   | 32 min - 1080p                   |
| 4096 MB   | 1h 4min - 1080p                  |
| 8192 MB   | 2h 8min - 1080p                  |
| 10240 MB  | 2h 40min - 1080p                 |

> These are approximate values and will not exactly match your scenario. Video output size is dependant on the video content and audio. Measure and find the values that work best for you.

## Setting the disk size

- Use the [`diskSizeInMb` option of `deployFunction()`](/docs/lambda/deployfunction#disksizeinmb) to set the disk size when you deploy.
- Use the [`--disk`](/docs/lambda/cli/functions/deploy#--disk) flag if you use the `remotion lambda functions deploy` command.

## Pricing

Using more disk space costs marginally more.  
Setting the disk size to the maximum possible value: 10240MB will cost less than 1% more.  
See the [Lambda pricing page](https://aws.amazon.com/lambda/pricing/) "Lambda Ephemereal Storage Pricing" section for pricing.  
The [`estimatePrice()`](/docs/lambda/estimateprice) API does also factor disk size into account.


---
image: /generated/articles-docs-lambda-faq.png
sidebar_label: FAQ
title: FAQ
slug: /lambda/faq
crumb: 'Lambda'
---

Some commonly asked questions about Remotion Lambda.

### Is Lambda self-hosted?

Yes, you host Remotion Lambda in your own AWS account. Remotion does not offer a hosted rendering solution at this time.

### Do I need to deploy a function for each render?

No, in general you only need to deploy one function and it will be capable of rendering multiple videos, even across different projects.

There are three exceptions when it is possible to deploy multiple functions:

- If you are using multiple regions, you need to deploy a function for each region.
- If you are upgrading to a newer version of Remotion Lambda, you need to deploy a new function. You can then run the new and the old function side-by-side. The `@remotion/lambda` CLI will always choose the function in your AWS account that has the same version as the client package. If you use the [`getFunctions()`](/docs/lambda/getfunctions) Node.JS API, set the [`compatibleOnly`](/docs/lambda/getfunctions#compatibleonly) flag to `true` to filter out functions that don't match the version of the `@remotion/lambda` package.
- If you are deploying a function with a different memory size, disk size or timeout, a new function can be created. However, currently if multiple suitable functions are available, Remotion will choose one at random. So you should only use this strategy to change the parameters of the function without causing downtime.

### Do I need to create multiple buckets?

Only [one bucket per region is recommended](/docs/lambda/multiple-buckets).

### Do I need to deploy multiple sites?

You can deploy one site and use it for as many renders as you need. If you have multiple sites, you can deploy all of them and reuse the same Lambda function.

### What if I want to render longer videos?

You don't need to worry about the timeout of a Lambda function because Remotion splits the video in many parts and renders them in parallel. However, you need to be aware of the storage limits that may not be exceeded. See: [Disk size](/docs/lambda/disk-size)

### Why are you not using Amazon EFS?

We have evaluated Amazon Elastic File System (EFS) and we found the speed benefits of EFS are not substantial enough to warrant the increased complexity - for EFS to be integrated, VPC and security groups need to be created which will disable public internet access. To restore public internet access, a persistent EC2 instance needs to be created for proxying the traffic, negating many benefits of Lambda.

### How much does Remotion Lambda cost?

There are two cost components: The Remotion licensing fee (see [pricing](https://www.remotion.pro), only applies if you are a company) and the AWS costs. AWS cost is dependant on the amount of memory that you assign to your lambda function. We estimate the Lambda costs for you and report it in the API response.

### How can I upgrade/redeploy a Lambda function?

Remotion will look for a version of the lambda function that matches the Node.JS library / CLI.

If you don't rely on the old function anymore, you can first delete all existing functions:

```bash
npx remotion lambda functions rmall
```

You can deploy a new function using:

```bash
npx remotion lambda functions deploy
```

If you are using the Node.JS APIs, the following APIs are useful: [`getFunctions()`](/docs/lambda/getfunctions), [`deployFunction()`](/docs/lambda/deployfunction) and [`deleteFunction()`](/docs/lambda/deletefunction).

### Can I modify the code that is run inside the Lambda?

The code that is run inside the Lambda is an executor binary that is provided by Remotion. You cannot write code to run inside the function that Remotion deploys for you, but you can make use of many configuration options and call a Remotion Lambda function from another Lambda function using APIs like [renderMediaOnLambda](/docs/lambda/rendermediaonlambda).

The source code of what is run inside a Remotion Lambda function [can be found here](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/functions/index.ts) and forked if necessary. We recommend to reach out to the Remotion team first and check if a fork is really necessary.

### Can I make a site private?

When you render a video on Lambda, you specify a [Serve URL](/docs/terminology/serve-url) pointing to a Webpack bundle of Remotion code.  
This is a URL that, if known, can be publicly accessed by anyone.

The Lambda function needs to spawn a headless browser and visit this URL in order to render the video.  
The items in the bucket cannot be made private because they need to be accessible via URL in the headless browser.

Make sure to not hardcode sensitive data in your code, such as API keys, or user data.  
Instead, use the [`inputProps`](/docs/lambda/rendermediaonlambda#inputprops) and [`envVariables`](/docs/lambda/rendermediaonlambda#envvariables) options of [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda) to pass data during the render.  
Those values will never be publicly accessible.

By making your site available under a Serve URL, you may expose your minified React code.  
This is normally not a problem, because any website will expose their minified frontend code.

If you would like to make your site more private, you can:

- Use a longer site name that is harder to guess
- Place a `robots.txt` in the root of your bucket with a `Disallow: /` rule to prevent crawlers from accessing your site and your site showing up in search results.

#### Only you can trigger renders on your account

Making the site accessible via a Serve URL will not allow anyone to trigger a Lambda render on your account.  
The URL only serves HTML, JavaScript and assets, but does expose access to invoking any computation on your AWS account.

### Do I have to deploy a new site for every render?

No, you shouldn’t have to deploy a new bundle for every render. Instead, deploy your site once and parametrize everything about the video:

- Use [`inputProps`](/docs/terminology/input-props) to parametrize the contents of the video. For example, you may pass an array of elements that should appear in the video.
- Use [`calculateMetadata()`](/docs/calculate-metadata) to parametrize the duration, dimensions and FPS of the video.
- If you have multiple different templates that don’t share a data structure, deploy a bundle with multiple [`<Composition>`](/docs/terminology/composition)’s.

See also: [`Passing props`](/docs/passing-props)


---
image: /generated/articles-docs-lambda-light-client.png
sidebar_label: Light client
title: Light client
crumb: 'Lambda'
---

The following methods and types can be imported from `@remotion/lambda/client`.

`@remotion/lambda/client` re-exports everything from the `@remotion/lambda-client` NPM package, which you can install if you only need these functions in your project, saving you some dependencies.

```tsx twoslash
// organize-imports-ignore
// ---cut---
import {
  renderMediaOnLambda,
  renderStillOnLambda,
  getRenderProgress,
  getCompositionsOnLambda,
  getFunctions,
  AwsRegion,
  RenderProgress,
  validateWebhookSignature,
  WebhookPayload,
  presignUrl,
  PresignUrlInput,
  getSites,
  speculateFunctionName,
  CustomCredentials, // available from v4.0.60
  getAwsClient, // available from v4.0.82
  deleteRender, // available from v4.0.84
  DeleteRenderInput, // available from v4.0.84
} from '@remotion/lambda/client';
```

:::info
`getServiceClient()` was included from v4.0.60 to v4.0.81 by mistake. Use [`getAwsClient()`](/docs/lambda/getawsclient) instead.
:::

These functions don't have any dependencies on our renderer and can be bundled for example with ESBuild or Webpack (like is the case for example in Next.js).

Importing the light client on edge frameworks (Vercel Edge, Cloudflare Workers) is currently not supported.

**We don't recommend calling these functions from the browser directly, as you will leak your AWS credentials.**

Instead, this light client is meant to reduce the bundle size and avoid problems if you are calling Remotion Lambda APIs from another Lambda function and therefore need to bundle your function code.

Commonly, Next.JS serverless endpoints or similar use AWS Lambda functions under the hood, for which `@remotion/lambda/client` can be used.


---
image: /generated/articles-docs-lambda-custom-layers.png
title: Custom Layers
slug: custom-layers
crumb: 'Lambda'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Lambda function [includes Chrome and base fonts by default](/docs/lambda/runtime).

In some advanced use cases, you want to replace certain parts of the stack:

- Use another Chrome version (you may need to [build it yourself](https://github.com/remotion-dev/chrome-build-instructions/tree/main))
- Replace default fonts or emojis

Before you create a custom stack, feel free to contact us to see if Remotion can provide the changes upstream.

Also consider that the AWS Lambda layers cumulatively may not exceed 250MB extracted, so you need to sacrifice an equal amount of other files.

If you just want to add fonts, we recommend to use [Web fonts](/docs/fonts) instead.

## Default layers<AvailableFrom v="4.0.205"/>

Consider using our layer options before creating a custom stack:

With the default option (`--runtime-preference=cjk` or no option):

| Item         | Size     |
| ------------ | -------- |
| chromium     | 196 MB   |
| emoji-google | 9.9 MB   |
| fonts        | 1.9 MB   |
| cjk          | 16 MB    |
| **Total**    | 223.8 MB |

With the option [`--runtime-preference=apple-emojis`](/docs/lambda/deployfunction#runtimepreference):

| Item        | Size     |
| ----------- | -------- |
| chromium    | 196 MB   |
| emoji-apple | 45 MB    |
| fonts       | 1.9 MB   |
| **Total**   | 242.9 MB |

:::note
Note that by enabling the Apple Emojis, to stay under the 250 MB limit, support for CJK (Chinese, Japanese, Korean) characters will be removed.  
Google Emojis are also removed.
:::

## Ensure Remotion version

Customizing Remotion Lambda Layers is possible from v3.0.17.  
Lambda binaries might change in minor Remotion versions, it is your responsibility to keep your versions up to date.

## Creating a custom binary

Go to the [`remotion-dev/lambda-binaries`](https://github.com/remotion-dev/lambda-binaries) repository and clone it.

The folders `chromium` and `fonts` contain the binaries for the ARM version. The x64 version has been discontinued.

Put the files that you want in the corresponding folders - for example, add the Apple Emoji Font `AppleColorEmoji.ttf` into the `fonts/.fonts/NotoSans/` folder.

Since the AWS Lambda layers may not exceed 250MB extracted, we need to sacrifice an equal amount of other files - for example by removing `fonts/.fonts/NotoColorEmoji.ttf` and `fonts/.fonts/NotoSansCJKjp-Regular.otf`.

You can see the size of the folders by running:

```bash
sh size.sh
```

If you are done with your changes, run:

```bash
sh make.sh
```

This will zip the layers and put them as artifacts in the `out` directory.

## Creating a Lambda layer

- Go to your AWS console, select the Lambda product, then select "Layers":

<img src="/img/lambda-layers-console.png" />

- Select "Create layer" and fill out the name. Upload the created layer from the `out` folder into the form. The fields "Compatible architectures", "Compatible runtimes" and "License" are optional.

- Once the layer is created, you will get a version ARN (example: `arn:aws:lambda:us-east-1:123456789012:layer:apple-emoji:1`). Copy it.

:::note
You need to do this for every AWS region you want to use Remotion Lambda in.
:::

## Update the Lambda function

Before you continue, make sure a Remotion Lambda function is deployed.

To switch out the layer of a deployed Lambda function, you can either do it via the AWS console or use a Node.JS script that you can run after every function deploy.

<Tabs
defaultValue="node"
values={[
{ label: 'Node.JS', value: 'node', },
{ label: 'AWS console', value: 'deploy', },
]
}>
<TabItem value="deploy">

- Go to your AWS console, select the Lambda product, then select the Lambda function you would like to update.
- Click on "Layers":

<img src="/img/lambda-single-layer.png" />

- Click on "Edit", then select the layer you'd like to replace, then click "Remove", then click "Save".
- Once returned, click "Add a layer", then click "Specify an ARN", then paste in the layer version ARN you retrieved from the previous step.
- Click "Verify" and then "Add".

Congrats! You customized your Lambda function.

</TabItem>
<TabItem value="node">

Before you can update a function via the Node.JS APIs, you need to [add another rule to your user role](/docs/lambda/setup#5-create-an-access-key-for-the-user):

```json
[
  {
    "Sid": "UpdateFunction",
    "Effect": "Allow",
    "Action": ["lambda:GetFunctionConfiguration", "lambda:UpdateFunctionConfiguration"],
    "Resource": ["arn:aws:lambda:*:*:function:remotion-render-*"]
  },
  {
    "Sid": "GetOwnLayerVersion",
    "Effect": "Allow",
    "Action": ["lambda:GetLayerVersion"],
    "Resource": ["*"]
  }
]
```

Given a region, function name, layer to remove and layer to add, you can use the following snippet to update a function with custom layers

```ts
import {AwsRegion, getAwsClient} from '@remotion/lambda';

// Customize these parameters
const REGION: AwsRegion = 'us-east-1';
const FUNCTION_NAME = 'remotion-render-2022-06-02-mem3000mb-disk2048mb-120sec';
const LAYER_TO_REMOVE = /fonts/;
const LAYER_TO_ADD = 'arn:aws:lambda:us-east-1:1234567891:layer:apple-emoji:1';

const {client, sdk} = getAwsClient({
  region: REGION,
  service: 'lambda',
});

const fnConfig = await client.send(
  new sdk.GetFunctionConfigurationCommand({
    FunctionName: FUNCTION_NAME,
  }),
);

if (!fnConfig) {
  throw new Error(`Function ${FUNCTION_NAME} not deployed`);
}

await client.send(
  new sdk.UpdateFunctionConfigurationCommand({
    FunctionName: FUNCTION_NAME,
    Layers: [...(fnConfig.Layers ?? []).filter((l) => !l.Arn?.match(LAYER_TO_REMOVE)).map((l) => l.Arn as string), LAYER_TO_ADD],
  }),
);
```

</TabItem>
</Tabs>

## See also

- [Lambda runtime](/docs/lambda/runtime)


---
image: /generated/articles-docs-lambda-separate-environments.png
id: separate-environments
title: Separating production and testing environments
sidebar_label: Separating environments
slug: /lambda/separate-environments
---

The code that is inside the Lambda function is always the same, no matter if you are calling it from a local, staging or production environment.

Also, each render executed with Remotion Lambda is completely isolated from another, in terms of compute and storage.

## Functions

Each Lambda function has a configuration that determines its unique name:

- Timeout
- Memory size
- Disk size
- Remotion version

If you have the same configuration in different environments, you can safely re-use the same function since each execution is isolated – in fact, duplicating the function is not supported because it achieves nothing.

If you are changing the configuration in one environment, deploy a new function and leave the old one deployed.  
This allows you to safely test new functions without breaking the other environments.  
You don't incur any costs for functions that are deployed but not used.

## Sites

We recommend to scope the site to a specific environment using [`--site-name`](/docs/lambda/cli/sites/create#--site-name) when creating a site. For example, use `--site-name=remotion-production` and `--site-name=remotion-staging`.

A site contains your React / Remotion code and might change frequently.  
Make sure to update your site whenever you make changes to your code or upgrade Remotion, and to not use the site for other environments if they differ.

## Buckets

Just one bucket per region can be used for Remotion Lambda, but the resources in it can be scoped.

A bucket contains 2 folders:

- `sites/` folder for your sites
- `renders/` folder for your renders

You should [scope your sites](#sites) option when creating a site.  
The renders are automatically scoped when rendering by creating subfolders with unique IDs within the `renders/` folder.

It is safe to use the same bucket for all environments.  
Use the [`privacy`](/docs/lambda/rendermediaonlambda#privacy) option to make renders private.  
The sites must be public because they are accessed via HTTP.

## Common questions

### Why can't I rename the function?

- The [`npx remotion lambda render`](/docs/lambda/cli/render) command looks for functions that match this convention.
- With the default user policy, Remotion Lambda restricts itself from accessing functions that don't match this convention.
- You can use the [`speculateFunctionName()`](/docs/lambda/speculatefunctionname) function save one API call.
- The function is more likely to be warm from a previous invocation if you only have 1 function with the same configuration.
- There is no benefit to renaming the function.

### What if I want to have two functions for two different projects?

A function is not tied to a project.

Each function is a binary that contains the same code.  
Every Remotion Lambda user runs the exact same code in their function.

The React code you write is not contained in the function, it is hosted on the Serve URL.

Each function invocation is isolated and they cannot conflict each other. There is a [concurrency limit](/docs/lambda/troubleshooting/rate-limit#default-concurrency-limits), but it is per region, not per function.

### I need to separate production, staging and development

Function invocations don't conflict each other.  
Functions also don't contain any code that you write, they are binary and every Remotion Lambda user runs the exact same code.

It is impossible for a bad staging deployment to affect the production function.  
Therefore, we recommend to use the same function for all environments.

### I want to have different configurations for different functions

This is supported! You can have multiple functions with different configurations.  
It is only not possible to have multiple functions that share the exact same configuration:

- Timeout
- RAM
- Region
- Disk size
- Remotion version

To distinguish which function should be used, pass the function name explicitly to [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).  
You can pass [`--function-name`](/docs/lambda/cli/render#--function-name) to [`npx remotion lambda render`](/docs/lambda/cli/render)

### I want to deploy multiple projects

It is possible deploy multiple sites under different [Serve URLs](/docs/terminology/serve-url).  
This convention only applies to functions, which do not contain any code that you write.

### I want to deploy multiple functions to load-balance between them

You do not need to do this, because you can invoke a function multiple times concurrently.  
There is no concurrency limit per function, but a concurrency limit per region and account.  
Therefore there is no benefit in having multiple identical functions in the same region and account for load-balancing.

## See also

- [Function naming convention](/docs/lambda/naming-convention)
- [Upgrading Remotion Lambda](/docs/lambda/upgrading)



---
image: /generated/articles-docs-lambda-custom-destination.png
id: custom-destination
sidebar_label: Custom output destination
title: Customizing Lambda output destination
crumb: 'Lambda'
---

By default a render artifact is saved into the same S3 bucket as where the site is located under the key `renders/${renderId}/out.{extension}` (for example: `renders/hy0k2siao8/out.mp4`)

You can modify the output destination by passing a different filename, writing it into a different bucket or even upload it to a different S3-compatible provider.

## Customizing the output name

To customize the output filename, pass `outName: "my-filename.mp4"` to [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda#outname) or [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda#outname).

On the CLI, use the [`--out-name`](/docs/lambda/cli/render#--out-name) flag.

The output name must match `/^([0-9a-zA-Z-!_.*'()/]+)$/g`.

## Customizing the output bucket

To render into a different bucket, specify the `outName` option to [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda) or [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda) and pass an object with the `key` and `bucketName` values:

```tsx twoslash {13-16}
import {renderMediaOnLambda} from '@remotion/lambda';
// ---cut---

const {bucketName, renderId} = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  composition: 'MyVideo',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  inputProps: {},
  codec: 'h264',
  imageFormat: 'jpeg',
  maxRetries: 1,
  privacy: 'public',
  outName: {
    key: 'my-output',
    bucketName: 'output-bucket',
  },
});
```

If you like to use this feature:

- You must extend the [default Remotion role policy](/docs/lambda/permissions) (not user policy) to allow read and write access to that bucket.
- The bucket must be in the same region.
- When calling APIs such as [`downloadMedia()`](/docs/lambda/downloadmedia) or [`getRenderProgress()`](/docs/lambda/getrenderprogress), you must pass the `bucketName` where the site resides in, not the bucket where the video gets saved.
- The `key` must match `/^([0-9a-zA-Z-!_.*'()/]+)$/g`
- The bucketName must match `/^(?=^.{3,63}$)(?!^(\d+\.)+\d+$)(^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)*([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$)/`.

This feature is not supported from the CLI.

## Saving to another cloud

_Available from v3.2.23_

You can upload the file to another S3-compatible provider.

- List of working providers (non-exhaustive):

  - ✅ [Supabase](/docs/lambda/supabase)
  - ✅ [Cloudflare](/docs/lambda/r2)
  - ✅ DigitalOcean Spaces
  - ✅ Google Cloud Storage  
    Notes about Google Cloud Storage:

    - GCP does support allowing underscores for bucket names, but we validate against it. Do not use underscores in your bucket name.
    - The bucket needs to have uniform access control and NOT fine-grained access.
    - To get your `accessKeyId` and `secretAccessKey`, create a service account that has Cloud Storage read + write permissions. Then run the following command:

    ```sh
    gcloud storage hmac create insert_google_service_account_email --project=insert_project_id
    ```

- List of unsupported providers (non-exhaustive):
  - Azure Blob Storage (not S3 compatible)

You must pass an `outName` [as specified above](#customizing-the-output-bucket) and also provide an `s3OutputProvider` like in the example below.

```tsx twoslash {13-21}
import {renderMediaOnLambda} from '@remotion/lambda';
// ---cut---

const {bucketName, renderId} = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render-bds9aab',
  composition: 'MyVideo',
  serveUrl: 'https://remotionlambda-qg35eyp1s1.s3.eu-central-1.amazonaws.com/sites/bf2jrbfkw',
  inputProps: {},
  codec: 'h264',
  imageFormat: 'jpeg',
  maxRetries: 1,
  privacy: 'no-acl',
  outName: {
    key: 'my-output',
    bucketName: 'output-bucket',
    s3OutputProvider: {
      endpoint: 'https://fra1.digitaloceanspaces.com',
      accessKeyId: '<DIGITAL_OCEAN_ACCESS_KEY_ID>',
      secretAccessKey: '<DIGITAL_OCEAN_SECRET_ACCESS_KEY>',
    },
  },
});
```

In this example, the output file will be uploaded to DigitalOcean Spaces. The cloud provider will give you the endpoint and credentials.

If you want to use this feature, note the following:

- When calling [`downloadMedia()`](/docs/lambda/downloadmedia#bucketname) or [`getRenderProgress()`](/docs/lambda/getrenderprogress#bucketname), you must pass the AWS `bucketName` where the site resides in, not the bucket name of the foreign cloud.
- When calling [`downloadMedia()`](/docs/lambda/downloadmedia) or [`getRenderProgress()`](/docs/lambda/getrenderprogress), you must provide the `s3OutputProvider` option with the same credentials again.
- By default, Remotion [assumes you use ACL](/docs/lambda/troubleshooting/bucket-disallows-acl) which is less common on other clouds. You need to set `privacy: "no-acl"` if you don't want to use ACL.

This feature is not supported from the CLI.

## Saving to another AWS region<AvailableFrom v="4.0.112"/>

If you plan on saving to another bucket on AWS S3 and would like to use different credentials, you can specify the `region` in the `s3OutputProvider` object.

```json
{
  "s3OutputProvider": {
    "endpoint": "https://s3.us-west-1.amazonaws.com",
    "accessKeyId": "<AWS_ACCESS_KEY_ID>",
    "secretAccessKey": "<AWS_SECRET_ACCESS_KEY>",
    "region": "us-west-1"
  }
}
```

Note that it is not necessary to provide a custom `s3OutputProvider` if you want to use the same role as you already gave to the Lambda.  
You may need to extend your [role policy](/docs/lambda/setup#2-create-role-policy) to allow writing to this bucket.

## See also

- Customizing the filename when a file is downloaded using `downloadBehavior`: For [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda#downloadbehavior) and [`renderStillOnLambda()`](/docs/lambda/renderstillonlambda#downloadbehavior)
- [Using Supabase as a custom destination](/docs/lambda/supabase)



---
image: /generated/articles-docs-lambda-webhooks.png
sidebar_label: Webhooks
title: Webhooks
slug: /lambda/webhooks
crumb: 'Lambda'
---

import {WebhookTest} from '../../components/lambda/webhook-test';

When rendering on AWS Lambda, Remotion can send webhooks to notify you when the render ends, successfully or with failures. This page describes the webhook payloads and how to set up a webhook API endpoint.

Refer to the `renderMediaOnLambda()` documentation to [learn how to trigger a render with webhooks enabled](/docs/lambda/rendermediaonlambda#webhook).

## Setup

You will need to set up an API endpoint with a POST request handler. Make sure that the endpoint is reachable and accepts requests from AWS.

:::info
If you run the webhook endpoint on your local machine (i.e. on `localhost`), you will need to set up a public reverse proxy using a tool like [tunnelmole](https://tunnelmole.com/docs), an open source tunneling tool or [ngrok](https://ngrok.com/), a popular closed source tunneling tool. Running either tool will generate a Public URL that will forward to your service on localhost.
:::

## Response

Every webhook has the following headers:

```json
{
  "Content-Type": "application/json",
  "X-Remotion-Mode": "production" | "demo",
  "X-Remotion-Signature": "sha512=HASHED_SIGNATURE" | "NO_SECRET_PROVIDED",
  "X-Remotion-Status": "success" | "timeout" | "error",
}
```

You can use these headers to verify the authenticity of the request, to check the status of your rendering process and to check whether the webhook was called from production code deployed to AWS or a demo application such the tool below or your own test suite.

The request body has the following structure:

```ts
type StaticWebhookPayload = {
  renderId: string;
  expectedBucketOwner: string;
  bucketName: string;
  customData: Record<string, unknown> | null;
};

export type WebhookErrorPayload = StaticWebhookPayload & {
  type: 'error';
  errors: {
    message: string;
    name: string;
    stack: string;
  }[];
};

export type WebhookSuccessPayload = StaticWebhookPayload & {
  type: 'success';
  lambdaErrors: EnhancedErrorInfo[];
  outputUrl: string | undefined;
  outputFile: string | undefined;
  timeToFinish: number | undefined;
  costs: AfterRenderCost;
};

export type WebhookTimeoutPayload = StaticWebhookPayload & {
  type: 'timeout';
};

export type WebhookPayload = WebhookErrorPayload | WebhookSuccessPayload | WebhookTimeoutPayload;
```

The fields [`renderId`](/docs/lambda/rendermediaonlambda#renderid), [`bucketName`](/docs/lambda/rendermediaonlambda#bucketname) will be returned [just like they are returned by `renderMediaOnLambda()` itself](/docs/lambda/rendermediaonlambda#return-value).

You can use the field `customData` to set a JSON-serializable object, which is useful to pass on custom data to the webhook endpoint. **The `customData` field must be less than 1KB (1024 bytes) when serialized, otherwise an error is thrown**. Store larger data in `inputProps` and retrieve it back by calling [`getRenderProgress()`](/docs/lambda/getrenderprogress) and reading `progress.renderMetadata.inputProps`.

If the render process times out, the reponse body will not contain any other fields.

The `outputUrl`, `outputFile` and `timeToFinish` keys are only returned if the render was successful. Note that a successful render process may still have non-fatal `lambdaErrors`:

```json
{
  "s3Location": "string",
  "explanation": "string" | null,
  "type": "renderer" | "browser" | "stitcher",
  "message": "string",
  "name": "string",
  "stack": "string",
  "frame": "number"| null,
  "chunk": "number"| null,
  "isFatal": "boolean",
  "attempt": "number",
  "willRetry": "boolean",
  "totalAttempts": "number",
  "tmpDir": {
    "files": [{
      "filename": "string",
      "size": "number",
    }],
    "total": "number"
  } | null,
}
```

The `errors` array will contain the error message and stack trace of any _fatal_ error that occurs during the render process.

## Validate Webhooks

Remotion will sign all webhook requests if you provide a webhook secret in the CLI arguments.

:::warning
If you don't provide a secret, the `X-Remotion-Signature` will be set to `NO_SECRET_PROVIDED`. It is not possible to verify the authenticity and data integrity of a webhook request that is sent with a `NO_SECRET_PROVIDED` signature. If you want to verify incoming webhooks, you must provide a webhook secret.
:::

Remotion uses [HMAC](https://en.wikipedia.org/wiki/HMAC) with the [SHA-512 algorithm](https://en.wikipedia.org/wiki/SHA-2) to cryptographically sign the webhook requests it sends. This allows you to verify the authenticity and data integrity of incoming webhook requests.

In order to verify a webhook request, you will need to create a hex digest of a SHA-512 HMAC signature using your provided webhook key and the request body. If it matches the `X-Remotion-Signature` header, the request was indeed sent by Remotion and its request body is complete.

If it does not match, either the data integrity is compromised and the request body is incomplete or the request was not sent by Remotion.

This is how Remotion calculates the signature:

```javascript
import * as Crypto from "crypto";

function calculateSignature(payload: string, secret?: string) {
  if (!secret) {
    return "NO_SECRET_PROVIDED";
  }
  const hmac = Crypto.createHmac("sha512", secret);
  const signature = "sha512=" + hmac.update(payload).digest("hex");
  return signature;
}
```

In your webhook endpoint, the `payload` parameter is the request body and the `secret` parameter is your webhook secret.

Instead of validating the signature yourself, you can use the [`validateWebhookSignature()`](/docs/lambda/validatewebhooksignature) function to throw an error if the signature is invalid.

## Example webhook endpoint (Express)

You can use any web framework and language to set up your webhook endpoint. The following example is written in JavaScript using the Express framework, we are using [`expressWebhook()`](/docs/lambda/expresswebhook) to simplify the process.

```javascript twoslash title="server.js"
const ENABLE_TESTING = false;

// ---cut---
import express from 'express';
import bodyParser from 'body-parser';
import {expressWebhook} from '@remotion/lambda/client';

const router = express();
const jsonParser = bodyParser.json();

const handler = expressWebhook({
  secret: 'mysecret',
  testing: ENABLE_TESTING,
  onSuccess: ({renderId}) => console.log('Finished render', renderId),
  onTimeout: ({renderId}) => console.log('Time out', renderId),
  onError: ({renderId}) => console.log('Error', renderId),
});

router.post('/webhook', jsonParser, handler);

router.options('/webhook', jsonParser, handler);

router.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

This can also be done manually, to have the maximum control over the endpoint's logic:

```javascript twoslash title="server.js"
import express from 'express';
import bodyParser from 'body-parser';
import {validateWebhookSignature} from '@remotion/lambda/client';

const router = express();
const jsonParser = bodyParser.json();

const handler = (req, res) => {
  //  add headers to enable  testing
  const ENABLE_TESTING = true;

  if (ENABLE_TESTING) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.remotion.dev');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Remotion-Status, X-Remotion-Signature, X-Remotion-Mode');
  }

  // dont go forward if just testing
  if (req.method === 'OPTIONS') {
    // custom code to handle OPTIONS request
    // logger(req).info('OPTIONS request received');
    res.status(200).end();
    return;
  }

  // validate the webhook signature
  validateWebhookSignature({
    signatureHeader: req.header('X-Remotion-Signature'),
    body: req.body,
    secret: 'mysecret',
  });

  //  custom logic
  const payload = req.body;
  if (payload.type === 'success') {
    //success logic here
  } else if (payload.type === 'error') {
    //error logic here
  } else if (payload.type === 'timeout') {
    //timeout logic here
  }

  // send response
  res.status(200).json({success: true});
};

router.post('/webhook', jsonParser, handler);

router.options('/webhook', jsonParser, handler);

router.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Example webhook endpoint (Next.JS App Router)

Similarly, here is an example endpoint in Next.JS for the App Router using [`appRouterWebhook()`](/docs/lambda/approuterwebhook). Available from v4.0.246.

```tsx twoslash title="app/api/webhook.ts"
const ENABLE_TESTING = false;

// ---cut---
import {appRouterWebhook} from '@remotion/lambda/client';

export const POST = appRouterWebhook({
  secret: 'mysecret',
  // Enable testing through the tool below
  testing: ENABLE_TESTING,
  onSuccess: ({renderId}) => console.log('Finished render', renderId),
  onTimeout: ({renderId}) => console.log('Time out', renderId),
  onError: ({renderId}) => console.log('Error', renderId),
});

export const OPTIONS = POST;
```

## Example webhook endpoint (Next.JS Pages Router)

The same endpoint as above, but using the Pages Router with the help of [`pagesRouterWebhook()`](/docs/lambda/pagesrouterwebhook). Available from v4.0.246.

```tsx twoslash title="pages/api/webhook.ts"
const ENABLE_TESTING = false;

// ---cut---

import {pagesRouterWebhook} from '@remotion/lambda/client';

const handler = pagesRouterWebhook({
  secret: 'mysecret',
  // Enable testing through the tool below
  testing: ENABLE_TESTING,
  onSuccess: ({renderId}) => console.log('Finished render', renderId),
  onTimeout: ({renderId}) => console.log('Time out', renderId),
  onError: ({renderId}) => console.log('Error', renderId),
});
export default handler;
```

## Test your webhook endpoint

You can use this tool to verify that your webhook endpoint is working properly. The tool will send an appropriate demo payload and log the response to the screen. All requests sent by this tool will have the `"X-Remotion-Mode"` header set to `"demo"`.

:::info
This tool sends the demo webhook requests directly from your browser, which has the following implications:

- **CORS requirements**:
  - Make sure your API endpoint is configured to accept requests from `remotion.dev` by setting `"Access-Control-Allow-Origin": "https://www.remotion.dev"`. This is necessary for this tool to work, but **not** for your production webhook endpoint.
  - You must set `"Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Remotion-Status, X-Remotion-Signature, X-Remotion-Mode"`
  - You must set `"Access-Control-Allow-Methods": "OPTIONS,POST"`.
  - Read the error messages in the DevTools to debug potential CORS issues.
- You can use a server listening on `localhost` and don't need to use a reverse proxy.

:::info

<WebhookTest />

## See also

- [validateWebhookSignature()](/docs/lambda/validatewebhooksignature)
- [renderMediaOnLambda()](/docs/lambda/rendermediaonlambda)


---
image: /generated/articles-docs-lambda-troubleshooting-debug.png
id: debug
sidebar_label: Debugging failures
title: Debugging failed Lambda renders
crumb: 'Lambda'
---

<YouTube minutes={11} href="https://youtu.be/pwVEzTQ6VYE" thumb="https://i.ytimg.com/vi/pwVEzTQ6VYE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDGudSHhI9u7kkShN_awBk3hbQ9mA" title="How to troubleshoot and debug for Remotion Lambda" />

## General debugging strategy

<Step>1</Step> Reproduce a render via the [`npx remotion lambda render`](/docs/lambda/cli/render) command.

- Use `--props` to pass in a JSON file with the same input props as the render you want to debug.
- Use `--log=verbose` to get detailed debugging information.

<div>
  <Step>2</Step> Wait for the render to fully time out or throw an error.
</div>
<Step>3</Step> Read the error message carefully and use the log links that were printed.

## Reasons a render may fail

There are four reasons renders may fail:

- <Step>1</Step> An error occurs in your React code.
- <Step>2</Step> A timeout occurs after calling [`delayRender()`](/docs/delay-render).
- <Step>3</Step> The Lambda function rendering one of the chunks times out.
- <Step>4</Step> The main Lambda function times out.

## Error in React code

If your code throws an error, you will see the error in the logs. If you are rendering via the CLI, the error will be symbolicated which can help you find the error in your code.
Try to fix the error, redeploy the site and re-render.

## Timeouts

### Understanding which timeout occurred

If your error message reads that a [`delayRender()`](/docs/delay-render) call timed out, a function has called [`delayRender()`](/docs/delay-render) but did not call [`continueRender()`](/docs/delay-render) within the timeout period. This is usually caused by a bug in your code. See [Debugging timeout](/docs/timeout) for more tips.

:::note
You can increase the timeout by passing `timeoutInMilliseconds` to [`renderMediaOnLamba()`](/docs/lambda/rendermediaonlambda) or passing `--timeout` to the CLI when rendering a video. Don't confuse it with the `--timeout` flag for the CLI when deploying a function (see below).
:::

<br />
If your error message reads that the main Lambda function has timed out, it means that the render was still ongoing, but the maximum execution duration of the Lambda function has been hit. This is caused by either: <br /> <br />

- A render that takes too long to complete within the specified duration. In that case, you should increase the function timeout by passing `--timeout` to the CLI [when deploying a function](/docs/lambda/cli/functions/deploy).
- A render that has a bottleneck and completes slowly on Lambda. In that case, you should identify the bottleneck by measuring and optimizing the render. See [Optimizing for speed](/docs/lambda/optimizing-speed) for more tips.
- A chunk is getting stuck, making it impossible for the main function to complete the task of concatenating the chunks. You should identify the chunk that is getting stuck by looking at the logs. See below for how to do this.

### Inspecting the logs

<Step>1</Step> Get the Log URL:

- If you use the CLI, add `--log=verbose` to the command. This will print a CloudWatch link to the console.
- When using [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda) add `logLevel: "verbose"` as an option. You will get a `cloudWatchLogs` field in the return value.

Open this link and log into AWS if needed. A log stream will open.

<img src="/img/cloudwatch.png" /> <br />
<br />

By default, the filter is set to:

```
"method=renderer,renderId=[render-id]"
```

### Find the logs of a specific chunk

Tweak the query to find the logs of a specific chunk:

```
method=renderer,renderId=[render-id],chunk=12
```

will for example find the log stream of chunk 12. If your viewport is big enough, you will also see the chunk numbers in the summary view straight away.

Click the blue link in the `Log stream name` column to open the log stream. If you don't see any blue links, click "Display", then select "View in columns with details".

In the logstream, you will see debug logging from Remotion as well as any `console.log` statements from your React code.

### Find the logs of the main function

Tweak the query to find the logs of the main function:

```
method=launch,renderId=[render-id]
```

You should get one result.
Click the blue link in the `Log stream name` column to open the log stream. If you don't see any blue links, click "Display", then select "View in columns with details".

### Finding the chunk that failed

To find which chunks failed to render, add `--log=verbose` to the Lambda render while rendering via the CLI.  
Look for the link pointing to `progress.json`.  
When using [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda), you will get a `folderInS3Console` field in the return value, which you can open and locate the `progress.json` file therein.

Within the `progress.json` file, you will find a `chunks` array.  
The chunks that are missing are the ones that failed to render.

After you've identified which chunks are missing, [inspect the logs](#inspecting-the-logs) for that chunk to find the cause of the error.

### Increasing the timeout

Note that two types of timeouts come into play in Remotion:

- The `delayRender()` timeout. This is the timeout that is defined using `--timeout` when calling [`npx remotion lambda render`](/docs/lambda/cli/render) or using `timeoutInMilliseconds` when calling [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda).
- The Lambda function timeout. This is the timeout that is defined using `--timeout` when calling [`npx remotion lambda functions deploy`](/docs/lambda/cli/functions/deploy) or using `timeoutInSeconds` when calling [`deployFunction()`](/docs/lambda/deployfunction).

### Reporting an issue

You may report an issue on [GitHub](https://remotion.dev/help) and [Discord](https://remotion.dev/discord).

To share a reproducible render, share the `progress.json` that lies in the S3 folder of the failed render under `renders/[render-id]/progress.json`.

If you use [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda), this function returns a link [`folderInS3Console`](/docs/lambda/rendermediaonlambda#folderins3console) pointing you to the right location in the S3 console.

If you use `npx remotion lambda render`, add `--log=verbose` to print the link to the file in the S3 console.

If you include CloudWatch logs in your report, post the full logs (click "Load more messages" until there are no more to load.)

## See also

- [Debugging timeouts](/docs/timeout)
- [Optimizing for speed](/docs/lambda/optimizing-cost)
- [Rate limits](/docs/lambda/troubleshooting/rate-limit)
- [Lambda Limits](/docs/lambda/limits)
- [Lambda insights](/docs/lambda/insights)
