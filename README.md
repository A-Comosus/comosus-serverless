# comosus-serverless
This repo will house a range of serverless functions for the a-comosus project

## How to use
- run `yarn install` as usual to install the node_modules
- set up serverless framework, follow this [link](https://www.serverless.com/framework/docs/getting-started)
- run `sls invoke local -p <event_path> -f <function_name>` to run a function locally with sample event data
-- an example of <event_path>: `events/event.json`
-- an example of <function_name>: `sendEmail`, which can be found under `functions` in the `serverless.yml` file

## `env.json`:
Contact the author to get all the secrets 🤫   
```
{
  "SENDGRID_API_KEY": "Secret"
}

```                                                         

