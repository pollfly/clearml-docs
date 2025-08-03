---
title: Ping Identity OAuth
---

This guide explains how to configure **Ping Identity** as an OAuth 2.0 provider for ClearML Single Sign-On (SSO): 
1. Register ClearML as an application in Ping Identity.
1. Configure the appropriate scopes and claims.
1. Supply Ping-issued credentials and endpoints to your ClearML server using environment variables.
1. Optionally, map group membership and admin roles from Ping into ClearML.

## Configure Ping Identity 

1. Register a new ClearML app with the callback URL: `<clearml_webapp_address>/callback_ping`

1. Select the following scopes:
   * `openid`
   * `profile` 
   * `email`
1. Make sure that the claims representing `user_id`, `email`, and `username` are returned in the token

1. Note the Client ID, Client secret, Auth URL, and Access token URL. They will be used in the ClearML Server configuration

## Configure ClearML Server

1. Define the following environment variables:

   * `CLEARML__services__login__sso__oauth_client__ping__authorize_url=<authorization endpoint>`
   * `CLEARML__services__login__sso__oauth_client__ping__access_token_url=<token endpoint>`
   * `CLEARML__secure__login__sso__oauth_client__ping__client_id="${PING_AUTH_CLIENT_ID}"`
   * `CLEARML__secure__login__sso__oauth_client__ping__client_secret="${PING_AUTH_CLIENT_SECRET}"`

1. If you enabled the PKCE for the ClearML app in Ping Identity, add the following environment variables:

   * `CLEARML__services__login__sso__oauth_client__ping__code_challenge=true`
   * `CLEARML__services__login__sso__oauth_client__ping__code_challenge_method=S256`

1. For automatic user creation in trusted environment (without consulting whitelists), set the following environment variable:

   * `CLEARML__secure__login__sso__oauth_client__ping__default_company="<company_id>"`

1. To troubleshoot the integration between Ping and ClearML, you can enable SSO debug information in ClearML server logs:

   * `CLEARML__services__login__sso__oauth_client__ping__debug=true`

## Customization

### Enable Group Mapping
You can sync Ping admin roles and group user assignment into ClearML. 

1. Make sure that group memberships are included in the SSO token (in Ping Identity)
1. In the ClearML Server define the following environment variables:
   * `CLEARML__services__login__sso__oauth_client__ping__groups__enabled=true`
   * `CLEARML__services__login__sso__oauth_client__ping__groups__claim=<the name of the groups claim as returned from Ping>`

:::note 
Groups must be manually created in ClearML. The group name comparison between Ping and ClearML is case-sensitive by default. 
To make it case-insensitive, set the following:
`CLEARML__services__login__sso__oauth_client__ping__groups__case_sensitive=false`
:::

### Assign Admin Role
If you want the members of a particular Ping group to be admins in ClearML, add the following environment variable (the Ping group
does not have to exist ClearML):
`CLEARML__services__login__sso__oauth_client__ping__groups__admins=["<the name of admin group from Ping>"]`

### Restrict Access to Mapped Groups
To only allow users who belong to a Ping group that also exists in ClearML, set the following environment variable:
`CLEARML__services__login__sso__oauth_client__ping__groups__prohibit_user_signup_if_not_in_group=true`