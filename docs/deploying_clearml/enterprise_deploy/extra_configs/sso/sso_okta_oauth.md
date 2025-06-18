---
title: Okta OAuth 
---

On the client side:

1. Register the ClearML Okta app with the callback url: `<clearml_webapp_address>/callback_okta`

1. Make sure that the following claims are configured to be returned: "sub", "email", "name", "email_verified"

1. Make sure that the relevant users are allowed under the ClearML Okta app configuration

1. Send the "client_id", "client_secret", "authorize_url" and "access_token_url". These can be obtained by navigating to 
  `https://${OktaDomain}/oauth2/${authorizationServerId}/.well-known/openid-configuration` and retrieving “authorization_endpoint” and “token_endpoint”

On ClearML side:

* Make sure to use the fixed version: v3.11 build 754 or later

* Define the following environment vars:

  * `CLEARML__services__login__sso__oauth_client__okta__base_url=https://${yourOktaDomain}/oauth2/${authorizationServerId}/`
  * `CLEARML__services__login__sso__oauth_client__okta__authorize_url=<authorization endpoint>`
  * `CLEARML__services__login__sso__oauth_client__okta__access_token_url=<token endpoint>`
  * `CLEARML__secure__login__sso__oauth_client__okta__client_id="${OKTA_AUTH_CLIENT_ID}"`
  * `CLEARML__secure__login__sso__oauth_client__okta__client_secret="${OKTA_AUTH_CLIENT_SECRET}"`