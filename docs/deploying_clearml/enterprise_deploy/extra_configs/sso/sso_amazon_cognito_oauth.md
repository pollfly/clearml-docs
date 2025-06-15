---
title: Amazon Cognito OAuth
---

On the client side:

1. Choose the desired user pool in the Amazon Cognito. Make sure that it defines the required user attributes "email" 
   and "preferred_username"

1. In the user pool “App Integration” section Create app client for ClearML with the following properties:

   * App type - Confidential client

   * Client secret - Genetate a client secret

   * Hosted UI Settings → Allowed callback urls - add the url `<clearml_webapp_address>/callback_cognito`

   * OAuth 2.0 grant types - Authorization code grant

   * OpenID Connect scopes - OpenID, Profile, Email

On the server side:

1. Define the following in the secret manager / runtime created:  

   * `COGNITO_AUTH_CLIENT_ID`
   * `COGNITO_AUTH_CLIENT_SECRET`

1. Define the following environment vars for the apiserver container:


`CLEARML__services__login__sso__oauth_client__cognito__authorize_url=<authorization endpoint>`           # should be <cognito_domain_of_the_pool>/oauth2/authorize

CLEARML__services__login__sso__oauth_client__cognito__access_token_url=<token endpoint>  # should be <cognito_domain_of_the_pool>/oauth2/token

CLEARML__secure__login__sso__oauth_client__cognito__client_id="${COGNITO_AUTH_CLIENT_ID}"

CLEARML__secure__login__sso__oauth_client__cognito__client_secret="${COGNITO_AUTH_CLIENT_SECRET}"

If the user pool relies on an external identity provider then add the following env var:
CLEARML__services__login__sso__oauth_client__cognito__identity_provider=<external_idp_name_as_defined_in_the_user_pool>

For automatic user creation in trusted environment (without consulting whitelists) the following env var should be set:
CLEARML__secure__login__sso__oauth_client__cognito__default_company="<company_id>"

For customizing display name:
CLEARML__services__login__sso__oauth_client__cognito__display_name="New display name"