---
title: Google SAML
---

On the client side:

1. Register ClearML app with the callback url: `<clearml_webapp_address>/callback_google_saml`

1. Make sure that sso binding is set to HTTP-Redirect

1. Make sure that the following user claims are returned to ClearML app: `“objectidentifier"` (user ID), `“displayname"` 
   (Full username), `“emailaddress"` (user's email address)

1. Generate the idp metadate file and send us back the file and entity ID

On the ClearML side:

1. Prepare the deployment with the user idp metadatafile mapped into the apiserver

1. Define the following environment vars

   * `CLEARML__secure__login__sso__saml_client__google_saml__entity_id=<app_entity_id>`

   * `CLEARML__secure__login__sso__saml_client__google_saml__idp_metadata_file=<path to the metadata file>`

    `CLEARML__secure__login__sso__saml_client__google_saml__default_company="<company_id>"`

On ClearML server side - K8s
Add following stuff on override file:

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