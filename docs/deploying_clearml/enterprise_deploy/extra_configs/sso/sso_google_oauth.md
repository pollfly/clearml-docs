---
title: Google OAuth
---

In the Google Console:

1. Go to Google Cloud Console (https://console.cloud.google.com)

1. Go to the APIs & Services / Credentials section (https://console.cloud.google.com/apis/credentials?project=<project-id>)

1. Create credentials > OAuth Client ID

   * Application type: Web application
   * Authorized redirect URIs: Add https://app.clearml.xxx.com/callback_google (and also https://clearml.xxx.com/callback_google)
   * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Send us Client ID and Client Secret

On ClearML server:

1. Define the following in the `runtime_created.env` file

   * `GOOGLE_AUTH_CLIENT_ID`
   * `GOOGLE_AUTH_CLIENT_SECRET`

1. Define the following environment vars in the environment section of the apiserver service in the docker_compose.override.yml file:

   * `CLEARML__secure__login__sso__oauth_client__google__client_id="${GOOGLE_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__google__client_secret="${GOOGLE_AUTH_CLIENT_SECRET}"`

1. For automatic user creation in trusted environment (without consulting whitelists) the following env var should be set:
`CLEARML__secure__login__sso__oauth_client__google__default_company="<company_id>"`

1. Restart the apiserver: 

   ```
   running sudo docker-compose --env-file runtime_created.env up -d
   ```