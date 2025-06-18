---
title: Duo Saml
---

On the client side:
1. Go to the Duo Admin console and define ClearML app as "Generic SAML Service Provider" with the following params:

   * Entity ID - `clearml`

   * ACS URL - `<the_url_of_clearml_webapp_in_your_deployment>/callback_duo`

Saml response attributes that we need:
* `emailaddress` - the user email
* `objectidentifier` - the user id in the idp 
* `displayname` - the username for the display

On the server side:

* Prepare the deployment with the user idp metadatafile mapped into the apiserver

* Define the following environment vars:

  * `CLEARML__secure__login__sso__saml_client__duo__entity_id=clearml`

  * `CLEARML__secure__login__sso__saml_client__duo__idp_metadata_file=<path to the metadata file>`

  * `CLEARML__secure__login__sso__saml_client__duo__default_company=<company_id>`