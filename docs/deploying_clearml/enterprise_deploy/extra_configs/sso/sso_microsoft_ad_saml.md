Microsoft AD SAML (Including Azure SAML)
On the Active Directory:
Register the ClearML app with the callback url: <clearml_webapp_address>/callback_microsoft_ad

Make sure that sso binding is set to HTTP-Redirect

Make sure that the following user claims are returned to ClearML app: 
emailaddress   - user.mail
displayname    - user.displayname

Unique user identifier - user.principalname

Generate the idp metadate file and save the file and entity ID

On ClearML server side - docker-compose
Prepare the deployment with the user idp metadatafile mapped into the apiserver

Define the following environment vars

CLEARML__secure__login__sso__saml_client__microsoft_ad__entity_id=<app_entity_id>

CLEARML__secure__login__sso__saml_client__microsoft_ad__idp_metadata_file=<path to the metadata file>

CLEARML__secure__login__sso__saml_client__microsoft_ad__default_company="<company_id>"

CLEARML__services__login__sso__saml_client__microsoft_ad__claims__object_id="http://schemas.microsoft.com/identity/claims/objectidentifier"

CLEARML__services__login__sso__saml_client__microsoft_ad__claims__name="http://schemas.microsoft.com/identity/claims/displayname"

CLEARML__services__login__sso__saml_client__microsoft_ad__claims__email="emailAddress"

CLEARML__services__login__sso__saml_client__microsoft_ad__claims__given_name="givenName"

CLEARML__services__login__sso__saml_client__microsoft_ad__claims__surname="surname"

Customization:
It is possible to sync the user admin role and user assignment to groups from Microsoft AD into ClearML. 
For this define the following env var:

CLEARML__services__login__sso__saml_client__microsoft_ad__groups__enabled=true

CLEARML__services__login__sso__saml_client__microsoft_ad__groups__admins=[<admin_group_name1>, <admin_group_name2>, ...]

Group claim defaults to "groups" and can be overridden by setting CLEARML__services__login__sso__saml_client__microsoft_ad__groups__claimenv var

Please note that groups themselves are not auto created and need to be created manually in ClearML. Group name is taken from the first CN of the full DN path. For example the following dn ‘CN=test, OU=unit, DU=mycomp' corresponds to the group name ‘test'. The group name comparison between Microsoft AD and ClearML is case sensitive. To make it case insensitive define the following:
CLEARML__services__login__sso__saml_client__microsoft_ad__groups__case_sensitive=false

In order to prohibit the users who do not belong to any of the AD groups created in the ClearML from signing up set the following env var:
CLEARML__services__login__sso__saml_client__microsoft_ad__groups__prohibit_user_signup_if_not_in_group=true

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
    - name: "CLEARML__secure__login__sso__saml_client__microsoft_ad__entity_id"
      value: "<app_entity_id>"
    - name: "CLEARML__secure__login__sso__saml_client__microsoft_ad__idp_metadata_file"
      value: "/opt/clearml/config/default/metadata.xml"
    - name: "CLEARML__secure__login__sso__saml_client__microsoft_ad__default_company"
      value: "<company_id>"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__object_id"
      value: "http://schemas.microsoft.com/identity/claims/objectidentifier"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__name"
      value: "http://schemas.microsoft.com/identity/claims/displayname"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__email"
      value: "emailAddress"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__given_name"
      value: "givenName"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__surname"
      value: "surname"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__email"
      value: "emailAddress"
    - name: "CLEARML__services__login__sso__saml_client__microsoft_ad__claims__email"
      value: "emailAddress"