---
title: Microsoft AD OAuth
---

This guide explains how to configure Microsoft Active Directory (AD) as an OAuth 2.0 identity provider for ClearML Single 
Sign-On (SSO).

## Configure AD:

1. Register the ClearML app with the callback URL: `<clearml_webapp_address>/callback_ad_oauth`

1. Make sure that the claims representing `user_id`, `email,` and `name` are returned to the ClearML app request. The claims 
   are mapped to the following internal fields: 
   * `preferred_username` > `user ID`
   * `upn` > `email`
   * `fullname` > `name`

1. Save the following details to be used when configuring ClearML Server:
   * Client ID
   * Client Secret 
   * Auth URL
   * Access Token URL

## Configure ClearML Server

* Define the following environment variables:

  * `CLEARML__services__login__sso__oauth_client__ad_oauth__authorize_url=<authorization endpoint>`
  * `CLEARML__services__login__sso__oauth_client__ad_oauth__access_token_url=<token endpoint>`
  * `CLEARML__secure__login__sso__oauth_client__ad_oauth__client_id="${AD_AUTH_CLIENT_ID}"`
  * `CLEARML__secure__login__sso__oauth_client__ad_oauth__client_secret="${AD_AUTH_CLIENT_SECRET}"`

* For automatic user creation in trusted environment (without consulting whitelists), set the following environment variable:
  `CLEARML__secure__login__sso__oauth_client__ad_oauth__default_company="<company_id>"`