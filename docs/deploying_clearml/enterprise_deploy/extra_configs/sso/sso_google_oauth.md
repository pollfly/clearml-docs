---
title: Google OAuth
---

This guide explains how to configure Google as an OAuth 2.0 provider for ClearML Single Sign-On (SSO):

1. Register a web application in the Google Cloud Console.
1. Configure authorized redirect URIs.
1. Supply the OAuth credentials to the ClearML server using environment variables.
1. Optionally, enable automatic user creation in trusted environments.

## Configure Google as IdP

1. Go to [Google Cloud Console](https://console.cloud.google.com)

1. Go to the **APIs & Services** > **Credentials section** (`https://console.cloud.google.com/apis/credentials?project=<project-id>`)

1. Click **Create credentials** > **OAuth Client ID**

   * Application type: Web application
   * Authorized redirect URIs: Add https://app.clearml.xxx.com/callback_google (and https://clearml.xxx.com/callback_google)
   * Note the Client ID and Client Secret, they will be used when configuring the ClearML Server.

## Configure ClearML Server

1. Define the following variables in the `runtime_created.env` file:

   * `GOOGLE_AUTH_CLIENT_ID`
   * `GOOGLE_AUTH_CLIENT_SECRET`

1. Define the following environment variables in the environment section of the `apiserver` service in the `docker_compose.override.yml` file:

   * `CLEARML__secure__login__sso__oauth_client__google__client_id="${GOOGLE_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__google__client_secret="${GOOGLE_AUTH_CLIENT_SECRET}"`

1. For automatic user creation in trusted environment (without consulting whitelists), set the following environment variable:
`CLEARML__secure__login__sso__oauth_client__google__default_company="<company_id>"`

1. Restart the `apiserver` to apply the changes: 

   ```
   running sudo docker-compose --env-file runtime_created.env up -d
   ```