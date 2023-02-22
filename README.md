# comosus-serverless

This repo will house a range of serverless functions for the a-comosus project

## Environment Variables

All environment variables are now stored on AWS secret manager, having an IAM user with correct permission should provide you with the required variables.

## How to set up this project?

Simple, just like most of the JS projects. Simply run `yarn install` or `yarn` for short to install all the node modules. Then set up serverless framework, follow this [link](https://www.serverless.com/framework/docs/getting-started). And that's it, you are all set. 👏

_And of course, you will need to have the right IAM user to perform actions_

## How to run these functions locally?

This serverless project uses `serverless-offline` plugin, simply run `yarn offline` will spin up local instances of serverless function, which you can invoke with REST clients.

## How to deploy these functions?

`yarn deploy:dev` will deploy the functions in development mode. `yarn deploy:prod` will deploy the functions in production mode
