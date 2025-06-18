---
title: Keycloak OAuth
---

In the Keycloak

Register ClearML app with the callback url: `<clearml_webapp_address>/callback_keycloak`

Make sure that the claims representing user_id, email and username are returned 

Note client_id, client_secret, Auth url and Access token url

In ClearML server

Define the following environment vars for the apiserver in docker-compose.override.yaml:

`CLEARML__services__login__sso__oauth_client__keycloak__base_url=<base url>` # take the token or authorization endpoint before the protocol/openid-connect/... part

`CLEARML__services__login__sso__oauth_client__keycloak__authorize_url=<authorization endpoint>`

`CLEARML__services__login__sso__oauth_client__keycloak__access_token_url=<token endpoint>`

`CLEARML__secure__login__sso__oauth_client__keycloak__client_id="${KEYCLOAK_AUTH_CLIENT_ID}"`

`CLEARML__secure__login__sso__oauth_client__keycloak__client_secret="${KEYCLOAK_AUTH_CLIENT_SECRET}"`

For automatic user creation in trusted environment (without consulting whitelists) the following env var should be set:
CLEARML__secure__login__sso__oauth_client__keycloak__default_company="<company_id>"

Groups integration:
There is an option to synchronize group membership of the logging in users between Keycloak and ClearML. For each 
Keycloak group that you want to synchronize users membership please create in ClearML a user group with the same name.

In the Keycloak:
When configuring the open ID client for ClearML:

Navigate to the Client Scopes tab.

Click on the first row `<clearml client>-dedicated`.

Click "Add Mapper" > "By configuration" > "Group membership" option.

In the opened dialog enter the name "groups" and Token claim name "groups".

Uncheck the "Full group path" option and save the mapper.

To validate yourself:

* Return to the Client Details > Client scope tab.

* Go to the Evaluate sub-tab and select a user that has any group memberships.

* On the right side navigate to Generated ID token and then to Generated User Info.

* Inspect that in both cases you can see the groups claim in the displayed user data.

In ClearML server:

Add the following environment variables to the apiserver service

`CLEARML__services__login__sso__oauth_client__keycloak__groups__enabled=true`

`CLEARML__services__login__sso__oauth_client__keycloak__groups__claim=groups`

If you want the members of the particular Keycloak group to be admins in ClearML add the following env var. The Keycloak 
group does not have to be present in ClearML:

`CLEARML__services__login__sso__oauth_client__keycloak__groups__admins=["<the name of admin group from Keycloak>"]`

If you want to allow logging in only for the users whose Keycloak groups are present in ClearML, add the following 
env var:

`CLEARML__services__login__sso__oauth_client__keycloak__groups__prohibit_user_signup_if_not_in_group=true`

Additional Customizations:

* To auto logout user from the Keycloak provider when the user logs out of ClearML, set the following env var:
  `CLEARML__services__login__sso__oauth_client__keycloak__idp_logout=true`

* By default, the user info is taken from the access token. To return the user info through the OAuth `userinfo` 
  endpoint instead, set the following env var: `CLEARML__services__login__sso__oauth_client__keycloak__get_info_from_access_token=false`

* For integration of admin user role from Keycloak into ClearML configure the following in Keycloak:
  - Assign the user an admin role
  - In client scopes make sure that roles claim is returned in the access token or userinfo (depends on how you configured 
    the previous item)
  - If you want to use another group name for designating the admin role then define the following:
  `CLEARML__services__login__sso__oauth_client__keycloak__admin_role=<admin role name>`

* To manage the ClearML user role independently of the Keycloak either make sure that user roles are not returned in the 
  auth token/userinfo endpoint or set the following env var:
`CLEARML__services__login__sso__oauth_client__keycloak__admin_role=`