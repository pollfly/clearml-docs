---
title: Microsoft AD OAuth
---

On the Active Directory side:

1. Register the ClearML app with the callback url: `<clearml_webapp_address>/callback_ad_oauth`

1. Make sure that the claims representing user_id, email and name are returned to the ClearML app request. The claims 
   are mapped to the following internal fields: preferred_username > user ID, upn > email, fullname > name

1. Save the "client_id", "client_secret", "Auth Url" and "Access Toke Url"

On ClearML server side:

* Define the following environment vars:

  * `CLEARML__services__login__sso__oauth_client__ad_oauth__authorize_url=<authorization endpoint>`

  * `CLEARML__services__login__sso__oauth_client__ad_oauth__access_token_url=<token endpoint>`

  * `CLEARML__secure__login__sso__oauth_client__ad_oauth__client_id="${AD_AUTH_CLIENT_ID}"`

  * `CLEARML__secure__login__sso__oauth_client__ad_oauth__client_secret="${AD_AUTH_CLIENT_SECRET}"`

* For automatic user creation in trusted environment (without consulting whitelists) the following env var should be set:
  `CLEARML__secure__login__sso__oauth_client__ad_oauth__default_company="<company_id>"`