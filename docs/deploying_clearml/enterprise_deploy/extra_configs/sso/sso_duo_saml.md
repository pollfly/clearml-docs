---
title: Duo Saml
---

This guide explains how to configure Duo as a SAML identity provider (IdP) for ClearML Single Sign-On (SSO):

1. Define ClearML as a service provider (SP) in Duo.
1. Provide the appropriate SAML response attributes.
1. Map the Duo IdP metadata file into the ClearML server.
1. Set up the required environment variables to enable SAML login.
1. Optionally, configure automatic user creation by assigning a default company.

## Configure Duo 
1. Go to the Duo Admin console and define ClearML app as a **Generic SAML Service Provider** with the following parameters:
   * Entity ID - `clearml`
   * ACS URL - `<the_url_of_clearml_webapp_in_your_deployment>/callback_duo`
1. Configure the SAML response attributes:
   * `emailaddress` - the user email
   * `objectidentifier` - the user id in the idp 
   * `displayname` - the username for the display

## Configure ClearML Server

1. Prepare the deployment with the user IdP metadata file mapped into the `apiserver`

1. Define the following environment variables:

  * `CLEARML__secure__login__sso__saml_client__duo__entity_id=clearml`

  * `CLEARML__secure__login__sso__saml_client__duo__idp_metadata_file=<path to the metadata file>`

  * `CLEARML__secure__login__sso__saml_client__duo__default_company=<company_id>`