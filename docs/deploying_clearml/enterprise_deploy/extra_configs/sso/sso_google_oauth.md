---
title: Google OAuth
---

This guide explains how to configure Google as an OAuth provider for ClearML Single Sign-On (SSO).

Configuration requires two steps:

1. Register and Configure the ClearML application in Google  
1. Identity service configuration in the ClearML Server

## Configure Google as IdP

1. In the [Google Cloud Console](https://console.cloud.google.com/), go to the **APIs & Services** **>** **Credentials section** (`https://console.cloud.google.com/apis/credentials?project=\<project-id\>`)  

1. Click **Create credentials** > **OAuth Client ID**

   * Application type: Web application
   * Authorized redirect URIs: Add `<clearml_webapp_address>/callback_google`
   * Note the Client ID and Client Secret, they will be used when configuring the ClearML Server.

## Configure ClearML Server

1. Define the following environment variables in your secret manager or runtime environment:  

   * `GOOGLE_AUTH_CLIENT_ID`
   * `GOOGLE_AUTH_CLIENT_SECRET`

1. Set the following environment variables for the `apiserver`:

   * `CLEARML__secure__login__sso__oauth_client__google__client_id="${GOOGLE_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__google__client_secret="${GOOGLE_AUTH_CLIENT_SECRET}"`

1. To allow the identity provider to automatically create new users in ClearML without requiring them to be whitelisted 
   in advance, set the following environment variable:  

   ```
   CLEARML__secure__login__sso__oauth_client__google__default_company="<company_id>"
   ```