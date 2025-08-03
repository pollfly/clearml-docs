---
title: Azure AD OAuth
---

This guide explains how to configure Azure Active Directory (Azure AD) as an OAuth 2.0 provider for ClearML Single Sign-On (SSO): 

1. Register the ClearML app in Azure AD.
1. Configure the correct redirect URI and access token claims.
1. Collect the required credentials and endpoints.
1. Set up the ClearML server with environment variables to enable Azure AD login.
1. Optionally, configure automatic user creation for trusted environments.

## Configure Azure AD
1. Register the ClearML app with the redirect URI: `<clearml_webapp_address>/callback_azure_ad`
1. Select **Access tokens** to be returned from the authorization endpoint, and make sure that following claims are 
   returned in the access tokens: `email`, `preferred_username`, `upn`
1. Add client secret for the app and save the following app info:
   * Client ID
   * Client Secret 
   * OAuth 2.0 authorization endpoint (v2)
   * OAuth 2.0 token endpoint (v2)

## Configure ClearML Server

Define the following environment variables in the `apiserver` service in the override file:

* `CLEARML__services__login__sso__oauth_client__azure_ad__authorize_url=<authorization endpoint>`
* `CLEARML__services__login__sso__oauth_client__azure_ad__access_token_url=<token endpoint>`
* `CLEARML__secure__login__sso__oauth_client__azure_ad__client_id="${AD_AUTH_CLIENT_ID}"`
 * `CLEARML__secure__login__sso__oauth_client__azure_ad__client_secret="${AD_AUTH_CLIENT_SECRET}"`

For automatic user creation in trusted environment (without having to first add them in ClearML), set the following environment variable:
`CLEARML__secure__login__sso__oauth_client__ad_oauth__default_company=${DEFAULT_COMPANY:?err}`