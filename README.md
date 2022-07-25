# comosus-serverless

This repo will house a range of serverless functions for the a-comosus project

## 🏗 How to set up this repo?

### 🏞 Environment Variables

Yea, you need environment variables for this project to run. _[booooo, booooooriiiiiing!!!!]_

Contact the author to get all the secrets 🤫

| Name             | Description                                          |
| ---------------- | ---------------------------------------------------- |
| SENDGRID_API_KEY | You need to use this for send email function to work |
| GITHUB_PAT       | To access github api endpoints                       |

## How to use

- run `yarn install` as usual to install the node_modules
- set up serverless framework, follow this [link](https://www.serverless.com/framework/docs/getting-started)
- run `sls invoke local -p <event_path> -f <function_name>` to run a function locally with sample event data
  - an example of <event_path>: `events/event.json`
  - an example of <function_name>: `send-email`, which can be found under `functions` in the `serverless.yml` file
- A global unique bucket name is needed 👻
- If you're getting any errors like below when deploying the function, please folow this [link](https://sharp.pixelplumbing.com/install#aws-lambda) to run the commands after `npm i` as instructed on sharp's documentation, then deploy again, the error should be fixed 🤗
```
"errorMessage": "\nSomething went wrong installing the \"sharp\" module\n\nCannot find module '../build/Release/sharp-linux-x64.node'\nRequire stack:\n- /var/task/node_modules/sharp/lib/sharp.js\n- /var/task/node_modules/sharp/lib/constructor.js\n- /var/task/node_modules/sharp/lib/index.js\n- /var/task/uploadFile.js\n- /var/runtime/UserFunction.js\n- /var/runtime/index.js\n\nPossible solutions:\n- Install with verbose logging and look for errors: \"npm install --ignore-scripts=false --foreground-scripts --verbose sharp\"\n- Install for the current linux-x64 runtime: \"npm install --platform=linux --arch=x64 sharp\"\n- Consult the installation documentation: https://sharp.pixelplumbing.com/install"
```
## `env.json`:
Contact the author to get all the secrets 🤫   
```
{
  "SENDGRID_API_KEY": "Secret"
}

```



