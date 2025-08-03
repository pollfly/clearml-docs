---
title: Google SAML
---

This guide explains how to configure Google as a SAML identity provider (IdP) for ClearML Single Sign-On (SSO):
1. Register ClearML as a SAML Service Provider (SP) in the Google Admin Console.
1. Configure the necessary callback URL and user claims.
1. Provide the IdP metadata to ClearML.
1. Define the appropriate environment variables on the ClearML server.

##  Configure Google as SAML Identity Provider

1. Register ClearML app with the callback URL: `<clearml_webapp_address>/callback_google_saml`
1. Set SSO binding to HTTP-Redirect
1. Make sure that the following user claims are returned to the ClearML app: 
   * `“objectidentifier"` (User ID)
   * `“displayname"` (Full username)
   * `“emailaddress"` (User's email address)

1. Generate the IdP metadata file and send us back the file and entity ID

## Configure ClearML Server

1. Prepare the deployment with the user IdP metadata file mapped into the `apiserver`

1. Define the following environment variables:

   * `CLEARML__secure__login__sso__saml_client__google_saml__entity_id=<app_entity_id>`
   * `CLEARML__secure__login__sso__saml_client__google_saml__idp_metadata_file=<path to the metadata file>` 
   * `CLEARML__secure__login__sso__saml_client__google_saml__default_company="<company_id>"`

### Configure ClearML Server - K8S Deployment
In the override file, configure the metadata and environment variables:

```
apiserver:
  additionalConfigs:
    metadata.xml: |
      <?xml version="1.0"?>
      <test>
        <rule id="tst">
            <test_name>test</test_name>
        </rule>
      </test>
  extraEnvs:
    - name: "CLEARML__secure__login__sso__saml_client__google_saml__entity_id"
      value: "<app_entity_id>"
    - name: "CLEARML__secure__login__sso__saml_client__google_saml__idp_metadata_file"
      value: "/opt/clearml/config/default/metadata.xml"
    - name: "CLEARML__secure__login__sso__saml_client__google_saml__default_company"
      value: "<company_id>"
```