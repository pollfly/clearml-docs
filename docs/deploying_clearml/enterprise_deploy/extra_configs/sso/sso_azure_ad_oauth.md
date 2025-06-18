---
title: Azure AD OAuth
---

On the Azure side
1. Register the ClearML app with the redirect uri: `<clearml_webapp_address>/callback_azure_ad`

1. Select “Access tokens” to be returned from the authorization endpoint and make sure that following claims are returned in the access tokens: email, preferred_username, upn

1. Add client secret for the app and save the following app info: `client_id`, `client_secret`, OAuth 2.0 authorization endpoint (v2) and OAuth 2.0 token endpoint (v2)

On ClearML server side:

1. Define the following environment vars in the apiserver service in the override file:

   * `CLEARML__services__login__sso__oauth_client__azure_ad__authorize_url=<authorization endpoint>`
   * `CLEARML__services__login__sso__oauth_client__azure_ad__access_token_url=<token endpoint>`
   * `CLEARML__secure__login__sso__oauth_client__azure_ad__client_id="${AD_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__azure_ad__client_secret="${AD_AUTH_CLIENT_SECRET}"`

For automatic user creation in trusted environment (without having to first add them in ClearML) the following env var should be set:
`CLEARML__secure__login__sso__oauth_client__ad_oauth__default_company=${DEFAULT_COMPANY:?err}`