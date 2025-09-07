---
title: LDAP
---

This document explains how to connect ClearML to authenticate a user using existing customer's LDAP.

1. ClearML is configured with the customer’s LDAP server address and admin credentials.  
2. When a user attempts to log in through the ClearML login screen, they enter their LDAP username and password in the 
   ClearML login screen.  
3. ClearML then connects to the LDAP system using the admin credentials to verify the user's credentials. If 
   authentication is successful, it retrieves the user’s details such as name, email, and any additional attributes specified in the ClearML configuration.

## Configure ClearML Server

Set the following environment variables for the `apiserver`:
* `CLEARML__apiserver__auth__fixed_users__enabled=true`
* `CLEARML__apiserver__auth__fixed_users__provider=ldap` 
* `CLEARML__apiserver__auth__fixed_user_providers__ldap__server="<ldap server address. For example: ipa.demo1.freeipa.org>"`
* `CLEARML__apiserver__auth__fixed_user_providers__ldap__base_dn="<base dn searching users under. For example: dc=demo1,dc=freeipa,dc=org>"`
* `CLEARML__apiserver__auth__fixed_user_providers__ldap__default_company=<clearml company id>`
* `CLEARML__secure__fixed_user_providers__ldap__dn="<admin dn>"`
* `CLEARML__secure__fixed_user_providers__ldap__password="<admin pwd>"`

To locate a user record in LDAP by user ID, ClearML uses a search filter. The default configuration shipped with the 
product is designed to work with open-source LDAP implementations.

If you're using Microsoft LDAP (Active Directory), you'll need to override this by setting the following configuration:

```
CLEARML__apiserver__auth__fixed_user_providers__ldap__search_filter: "(&(objectclass=user)(sAMAccountName={0}))"
```
### Retrieving Email and Display Name
The user’s email and name are pulled from the LDAP "email" and "displayName" attributes by default. If needed, you 
can configure the system to use different attributes, like this:

```
CLEARML__apiserver__auth__fixed_user_providers__ldap__attributes__name=<user name attribute>
CLEARML__apiserver__auth__fixed_user_providers__ldap__mail=<user email attribute>
CLEARML__apiserver__auth__fixed_user_providers__ldap__<some_custom_attrib>=<custom attribute name in ldap>
```

### Configuring a User as a ClearML Admin
To set certain users as ClearML admins provide their LDAP IDs like this:

```
CLEARML__apiserver__auth__fixed_user_providers__ldap__admin_users=["user1_id","user2_id"]
````

### User or Domain Whitelisting

To allow only specific users or domains to register to the system, admins need to enable the white-listing feature by ensuring the following server variable is NOT set:

`CLEARML__apiserver__auth__fixed_user_providers__ldap__default_company`

Each user that should be allowed to login into clearml has to have their e-mail address added by an admin.
This can be done through the [Users management](../../../../webapp/settings/webapp_settings_users) admin UI page, using "Add User" and specifying the user's email address.  
Alternatively, admins can run the following API call (which supports adding multiple users):

```bash
curl $APISERVER_URL/login.add_whitelist_entries \
     -H "Content-Type: application/json" \
     -H "X-Clearml-Act-As: <ADMIN_USER_ID>" \
     -u $APISERVER_KEY:$APISERVER_SECRET \
     -d '{"emails":["<email1>", "<email2>", ...],"is_admin":false}'
```

#### Domain Whitelisting
To whitelist whole email domains, run the following api call:

```bash
curl $APISERVER_URL/login.set_domains \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <ADMIN_USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"domains":["<USERS_EMAIL_DOMAIN>"]}
```