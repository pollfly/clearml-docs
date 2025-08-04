---
title: Duo Saml
---

This guide explains how to configure Duo as a SAML identity provider for ClearML Single Sign-On (SSO):

1. Register and Configure the ClearML application in Duo  
2. Identity service configuration in the ClearML Server  
3. Optionally, configure automatic user creation by assigning a default company.

## Configure Duo 
1. Go to the Duo Admin console and define ClearML app as a **Generic SAML Service Provider** with the following parameters:
   * Entity ID - `clearml`
   * ACS URL - `<the_url_of_clearml_webapp_in_your_deployment>/callback_duo`
1. Configure the SAML response attributes:
   * `emailaddress` - User email
   * `objectidentifier` - User ID in the IdP 
   * `displayname` - Username for the display
1. Generate the IdP metadata file and save the file and entity ID, which you will use when configuring ClearML Server

## Configure ClearML Server

1. Prepare the deployment with the user IdP metadata file mapped into the `apiserver`.

1. Set the following environment variables:

   * `CLEARML__secure__login__sso__saml_client__duo__entity_id=clearml`
   * `CLEARML__secure__login__sso__saml_client__duo__idp_metadata_file=<path to the metadata file>`
   * `CLEARML__secure__login__sso__saml_client__duo__default_company=<company_id>`