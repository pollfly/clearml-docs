# SSO (Identity Provider) Setup

ClearML Enterprise Server supports various SSO options, values configurations can be set in `clearml-values.override.yaml`.

The following are a few examples. Some other supported providers are Auth0, Keycloak, Okta, Azure, Google, Cognito.

## Auth0

``` yaml
apiserver:
  extraEnvs:
    - name: CLEARML__secure__login__sso__oauth_client__auth0__client_id
      value: "<AUTH0_CLIENT_ID>"
    - name: CLEARML__secure__login__sso__oauth_client__auth0__client_secret
      value: "<AUTH0_CLIENT_SECRET>"
    - name: CLEARML__services__login__sso__oauth_client__auth0__base_url
      value: "<AUTH0_BASE_URL>"
    - name: CLEARML__services__login__sso__oauth_client__auth0__authorize_url
      value: "<AUTH0_AUTHORIZE_URL>"
    - name: CLEARML__services__login__sso__oauth_client__auth0__access_token_url
      value: "<AUTH0_ACCESS_TOKEN_URL>"
    - name: CLEARML__services__login__sso__oauth_client__auth0__audience
      value: "<AUTH0_AUDIENCE>"
```

## Keycloak

``` yaml
apiserver:
  extraEnvs:
    - name: CLEARML__secure__login__sso__oauth_client__keycloak__client_id
      value: "<KC_CLIENT_ID>"
    - name: CLEARML__secure__login__sso__oauth_client__keycloak__client_secret
      value: "<KC_SECRET_ID>"
    - name: CLEARML__services__login__sso__oauth_client__keycloak__base_url
      value: "<KC_URL>/realms/<REALM_NAME>/"
    - name: CLEARML__services__login__sso__oauth_client__keycloak__authorize_url
      value: "<KC_URL>/realms/<REALM_NAME>/protocol/openid-connect/auth"
    - name: CLEARML__services__login__sso__oauth_client__keycloak__access_token_url
      value: "<KC_URL>/realms/<REALM_NAME>/protocol/openid-connect/token"
    - name: CLEARML__services__login__sso__oauth_client__keycloak__idp_logout
      value: "true"
```

### Note if using Groups Mapping

When configuring the OpenID client for ClearML:

- Navigate to the Client Scopes tab.
- Click on the first row <clearml client>-dedicated.
- Click "Add Mapper" â†’ "By configuration" and then select the "Group membership" option.
- In the opened dialog, enter the name "groups" and the Token claim name "groups".
- Uncheck the "Full group path" option and save the mapper.

To validate yourself:

- Return to the Client Details â†’ Client scope tab.
- Go to the Evaluate sub-tab and select a user who has any group memberships.
- On the right side, navigate to the Generated ID token and then to Generated User Info.
- Inspect that in both cases, you can see the group's claim in the displayed user data.
