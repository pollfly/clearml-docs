---
title: SSO (Identity Provider) Setup
---

ClearML Enterprise Server supports various Single Sign-On (SSO) identity providers.
SSO configuration is managed via environment variables in your `clearml-values.override.yaml` file and is applied to the 
`apiserver` component.

The following are configuration examples for commonly used providers. Other supported systems include: 
* Auth0
* Keycloak
* Okta
* Azure AD
* Google
* AWS Cognito

## Auth0

```yaml
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

```yaml
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

## Group Membership Mapping in Keycloak

To map Keycloak groups into the ClearML user's SSO token:

1. Go to the **Client Scopes** tab.
1. Click on the `<clearml client>-dedicated` scope.
1. Click **Add Mapper > By Configuration > Group Membership** 
1. Configure the mapper:
   * Select the **Name** "groups" 
   * Set **Token Claim Name** "groups"
   * Uncheck the **Full group path**
   * Save the mapper.

To verify:

1. Go to the **Client Details > Client scope** tab.
1. Go to the **Evaluate** sub-tab and select a user with any group memberships.
1. Go to **Generated ID Token** and then to **Generated User Info**. 
1. Inspect that in both cases you can see the group's claim in the displayed user data.
