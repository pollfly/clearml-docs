---
title: Amazon Cognito OAuth
---

This guide explains how to configure Amazon Cognito as an OAuth 2.0 provider for ClearML Single Sign-On (SSO):

1. Configure a user pool and app client in the Amazon Cognito console.
1. Enable the appropriate scopes and attributes.
1. Provide the necessary credentials and endpoints to the ClearML Server via environment variables.
1. Optionally, configure automatic user creation, external identity provider use, or custom display names.

## Configure Amazon Cognito

1. Select a user pool in the Amazon Cognito. Make sure the pool includes the required user attributes `"email"` 
   and `"preferred_username"`

1. In the user pool **App Integration** section, create an app client for ClearML with the following properties:

   * App type - Confidential client
   * Client secret - Generate a client secret
   * Hosted UI Settings > Allowed callback URLs > add the URL `<clearml_webapp_address>/callback_cognito`
   * OAuth 2.0 grant types - Authorization code grant
   * OpenID Connect scopes - OpenID, Profile, Email

## Configure ClearML Server

1. Define the following environment variables in your secret manager or runtime environment:  

   * `COGNITO_AUTH_CLIENT_ID`
   * `COGNITO_AUTH_CLIENT_SECRET`

1. Define the following environment variables for the `apiserver` container:

   * `CLEARML__services__login__sso__oauth_client__cognito__authorize_url=<authorization endpoint>` (Should be `<cognito_domain_of_the_pool>/oauth2/authorize`)
   * `CLEARML__services__login__sso__oauth_client__cognito__access_token_url=<token endpoint>`  (Should be` <cognito_domain_of_the_pool>/oauth2/token`)
   * `CLEARML__secure__login__sso__oauth_client__cognito__client_id="${COGNITO_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__cognito__client_secret="${COGNITO_AUTH_CLIENT_SECRET}"`

### External Identity Provider
If the user pool relies on an external identity provider, add the following environment variable:
`CLEARML__services__login__sso__oauth_client__cognito__identity_provider=<external_idp_name_as_defined_in_the_user_pool>`

### Default Company Assignment
For automatic user creation in trusted environment (without consulting whitelists), set the following environment variable:
`CLEARML__secure__login__sso__oauth_client__cognito__default_company="<company_id>"`


### Custom Display Name
To customize the display name in the ClearML login screen:
`CLEARML__services__login__sso__oauth_client__cognito__display_name="New display name"`