---
title: Keycloak OAuth
---

This guide explains how to configure Keycloak as an OAuth identity provider for ClearML Single Sign-On (SSO):

1. Register ClearML as a client in Keycloak  
2. Ensure required claims (email, username, user ID) are returned  
3. Provide client credentials and OAuth endpoints to ClearML Server

## Configure Keycloak

1. Register ClearML app with the callback URL: `<clearml_webapp_address>/callback_keycloak`

1. Make sure the following claims are returned:
   * `user_id`
   * `email`
   * `user name`

1. Save the following values, which will be used when configuring ClearML Server:
   * `client_id`
   * `client_secret`
   * `Auth url`
   * `Access token url`

## Configure ClearML Server

Set the following environment variables for the `apiserver`:

* KeyCloak Base URL: `CLEARML__services__login__sso__oauth_client__keycloak__base_url=<base url>` (Use the start of the token or authorization endpoint, usually the part just before `protocol/openid-connect/...`)
* KeyCloak Authorization Endpoint: `CLEARML__services__login__sso__oauth_client__keycloak__authorize_url=<authorization endpoint>`
* KeyCloak Access Token Endpoint: `CLEARML__services__login__sso__oauth_client__keycloak__access_token_url=<token endpoint>`
* KeyCloak Client ID: `CLEARML__secure__login__sso__oauth_client__keycloak__client_id="${KEYCLOAK_AUTH_CLIENT_ID}"`
* KeyCloak Client Secret: `CLEARML__secure__login__sso__oauth_client__keycloak__client_secret="${KEYCLOAK_AUTH_CLIENT_SECRET}"`

To allow the identity provider to automatically create new users in ClearML without requiring them to be whitelisted in 
advance, set the following environment variable:  
```
CLEARML__secure__login__sso__oauth_client__keycloak__default_company="<company_id>"
```

## User Group Integration
ClearML can sync group membership from Keycloak. For each Keycloak group you want to sync user membership with, manually 
create a [user group](../../../../webapp/settings/webapp_settings_users.md#user-groups) with the same name in ClearML.

### In Keycloak
When configuring the Open ID client for ClearML:
1. Navigate to the **Client Scopes** tab.
1. Click on the first row `<clearml client>-dedicated`
1. Click **Add Mapper** > **By configuration** > **Group membership**
1. In the opened dialog, configure the mapper: 
   * Name: `groups`
   * Token claim name: `groups`
   * Uncheck the **Full group path**
1. Save the mapper.
1. Validate the token:
   1. Go to **Client Details** > **Client scope** > **Evaluate** 
   2. Select a user with any group membership
   3. Navigate to **Generated ID Token** and **Generated User Info**.
   4. Inspect that in both cases you can see the group claims in the displayed user data.

### In ClearML Server

Set the following environment variables to the `apiserver`:

* `CLEARML__services__login__sso__oauth_client__keycloak__groups__enabled=true`
* `CLEARML__services__login__sso__oauth_client__keycloak__groups__claim=groups`

#### Setting ClearML Administrators 

You can designate ClearML users as administrators either by Keycloak [group association](#setting-administrators-by-group-association) or by [role association](#setting-administrator-by-user-role-association).

##### Setting Administrators by Group Association
If you want the members of the particular Keycloak group to be  ClearML admins, set the following environment variable 
(the Keycloak group does not need to exist in ClearML):

```
CLEARML__services__login__sso__oauth_client__keycloak__groups__admins=["<the name of admin group from Keycloak>"]
```

##### Setting Administrator by User Role Association
* To sync the admin role from Keycloak into ClearML, configure the following in Keycloak:
  * Assign the user an admin role
  * In the **Client Scopes** tab, make sure that `roles` claim is included in the access token or `userinfo` token 
  * To use a custom group name for designating the admin role, set the following environment variable: `CLEARML__services__login__sso__oauth_client__keycloak__admin_role=<admin role name>`

* To manage ClearML user roles independently of Keycloak, either make sure that user roles are not returned in the 
  auth token/userinfo endpoint or set the following environment variable: `CLEARML__services__login__sso__oauth_client__keycloak__admin_role=`

#### Restrict User Signup
To restrict login only to users whose Keycloak groups exist in ClearML, set the following environment variable:

```
CLEARML__services__login__sso__oauth_client__keycloak__groups__prohibit_user_signup_if_not_in_group=true
```
## Additional Customizations

### KeyCloak Session Logout
To auto logout a user from the Keycloak provider when the user logs out of ClearML, set the following environment variable: 

```
CLEARML__services__login__sso__oauth_client__keycloak__idp_logout=true
```

### User Info Source
By default, user info is taken from the access token. To return the user info through the OAuth `userinfo` endpoint instead, 
set the following environment variable:

```
CLEARML__services__login__sso__oauth_client__keycloak__get_info_from_access_token=false
```
