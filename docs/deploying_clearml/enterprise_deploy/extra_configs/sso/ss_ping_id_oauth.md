---
title: Ping Identity OAuth
---

In the Ping Identity

1. Register ClearML app with the callback url: <clearml_webapp_address>/callback_ping

1. Make sure that the claims representing user_id, email and user name are returned. You need to select "openid", "profile" and "email" scopes

1. Note `client_id`, client_secret, Auth url and Access token url

On ClearML server side:

Define the following environment vars:

* `CLEARML__services__login__sso__oauth_client__ping__authorize_url=<authorization endpoint>`

* `CLEARML__services__login__sso__oauth_client__ping__access_token_url=<token endpoint>`

* `CLEARML__secure__login__sso__oauth_client__ping__client_id="${PING_AUTH_CLIENT_ID}"`

* `CLEARML__secure__login__sso__oauth_client__ping__client_secret="${PING_AUTH_CLIENT_SECRET}"`

If you enabled the PKCE for the ClearML app in Ping Identity then add the following env vars:

* `CLEARML__services__login__sso__oauth_client__ping__code_challenge=true`

* `CLEARML__services__login__sso__oauth_client__ping__code_challenge_method=S256`


For automatic user creation in trusted environment (without consulting whitelists) the following env var should be set:
`CLEARML__secure__login__sso__oauth_client__ping__default_company="<company_id>"`

To troubleshoot the integration between Ping and ClearML you can turn on the SSO debug information in ClearML server logs:

* `CLEARML__services__login__sso__oauth_client__ping__debug=true`

## Customization
It is possible to sync the user admin role and user assignment to groups from Ping into ClearML. 
In the identity provider (IdP) add group memberships attribute to the SSO token
In the ClearML server define the following env var:

* `CLEARML__services__login__sso__oauth_client__ping__groups__enabled=true`

* `CLEARML__services__login__sso__oauth_client__ping__groups__claim=<the name of the groups claim as returned from Ping>`

Please note that groups themselves are not auto created and need to be created manually in ClearML. The group name 
comparison between Ping and ClearML is case-sensitive. To make it case-insensitive define the following:
`CLEARML__services__login__sso__oauth_client__ping__groups__case_sensitive=false`

If you want the members of the particular Ping group to be admins in ClearML add the following env var. The Ping group
does not have to be present in ClearML:
`CLEARML__services__login__sso__oauth_client__ping__groups__admins=["<the name of admin group from Ping>"]`

If you want to allow logging in only for the users whose Ping groups are present in ClearML then add the following env var:
`CLEARML__services__login__sso__oauth_client__ping__groups__prohibit_user_signup_if_not_in_group=true`