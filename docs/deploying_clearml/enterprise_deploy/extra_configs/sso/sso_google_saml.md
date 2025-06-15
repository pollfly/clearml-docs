Google SAML
On the client side

Register ClearML app with the callback url: <clearml_webapp_address>/callback_google_saml

Make sure that sso binding is set to HTTP-Redirect

Make sure that the following user claims are returned to ClearML app: “objectidentifier" (user ID), “displayname" (Full user name), “emailaddress" (User’s email address)

Generate the idp metadate file and send us back the file and entity ID

On ClearML side

Prepare the deployment with the user idp metadatafile mapped into the apiserver

Define the following environment vars

CLEARML__secure__login__sso__saml_client__google_saml__entity_id=<app_entity_id>

CLEARML__secure__login__sso__saml_client__google_saml__idp_metadata_file=<path to the metadata file>

CLEARML__secure__login__sso__saml_client__google_saml__default_company="<company_id>"

On ClearML server side - K8s
Add following stuff on override file:



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
 