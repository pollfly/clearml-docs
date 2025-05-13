ðŸŸ¡ Ready, but missing hyperlinks (see TODOs)
---
TODO:
Control Plane:
- Link: basic k8s installation
- Link: SSO login
- Additional envs for control-plane multi-tenancy

Workers:
- Link: basic Agent installation
- Link: basic AI App Gateway installation

---

# Multi-Tenancy

## Control Plane

For installing the ClearML control-plane, follow this guide (TODO link to the basic_k8s_installation page).

Update the Serverâ€™s `clearml-values.override.yaml` with the following values:

``` yaml
apiserver:
  extraEnvs:
    - name: CLEARML__services__organization__features__user_management_advanced
      value: "true"
    - name: CLEARML__services__auth__ui_features_per_role__user__show_datasets
      value: "false"
    - name: CLEARML__services__auth__ui_features_per_role__user__show_orchestration
      value: "false"
    - name: CLEARML__services__workers__resource_usages__supervisor_company
      value: "d1bd92a3b039400cbafc60a7a5b1e52b" # Default company
    - name: CLEARML__secure__credentials__supervisor__role
      value: "system"
    - name: CLEARML__secure__credentials__supervisor__allow_login
      value: "true"
    - name: CLEARML__secure__credentials__supervisor__user_key
      value: "<SUPERVISOR_USER_KEY>"
    - name: CLEARML__secure__credentials__supervisor__user_secret
      value: "<SUPERVISOR_USER_SECRET>"
    - name: CLEARML__secure__credentials__supervisor__sec_groups
      value: "[\"users\", \"admins\", \"queue_admins\"]"
    - name: CLEARML__secure__credentials__supervisor__email
      value: "\"<SUPERVISOR_USER_EMAIL>\""
    - name: CLEARML__apiserver__company__unique_names
      value: "true"
```

The credentials specified in `<SUPERVISOR_USER_KEY>` and `<SUPERVISOR_USER_SECRET>` can be used to log in as the supervisor user from the ClearML Web UI accessible using the URL `app.<BASE_DOMAIN>`.

Note that the `<SUPERVISOR_USER_EMAIL>` value must be explicitly quoted. To do so, put `\"` around the quoted value. Example `"\"email@example.com\""`.

You will want to configure SSO as well. For this, follow the â€œSSO (Identity Provider) Setupâ€ (TODO link to the sso-login page).

### Create a Tenant

The following section will address the steps required to create a new tenant in the ClearML Control-plane server using a series of API calls.

Note that placeholders (`<PLACEHOLDER>`) in the following configuration should be substituted with a valid domain based on your installation values.

#### Create a new Tenant in the ClearML Control-plane

*Define variables to use in the next steps:*

``` bash
APISERVER_URL="https://api.<BASE_DOMAIN>"
APISERVER_KEY=<APISERVER_KEY>
APISERVER_SECRET=<APISERVER_SECRET>
```

**Note**: The apiserver key and secret should be the same as those used for installing the ClearML Enterprise server Chart.

*Create a Tenant (company):*

``` bash
curl $APISERVER_URL/system.create_company \
  -H "Content-Type: application/json" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"name":"<TENANT_NAME>"}'
```

The result returns the new Company ID (`<COMPANY_ID>`)

If needed, list existing tenants (companies) using:

``` bash
curl -u $APISERVER_KEY:$APISERVER_SECRET $APISERVER_URL/system.get_companies
```

*Create an Admin User for the new tenant:*

``` bash
curl $APISERVER_URL/auth.create_user \
  -H "Content-Type: application/json" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"name":"<ADMIN_USER_NAME>","company":"<COMPANY_ID>","email":"<ADMIN_USER_EMAIL>","role":"admin","internal":"true"}'
```

The result returns the new User ID (`<USER_ID>`)

*Create Credentials for the new Admin User:*

``` bash
curl $APISERVER_URL/auth.create_credentials \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Impersonate-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET
```

The result returns a set of key and secret credentials associated with the new Admin User.

**Note**: You can use this set of credentials to set up an Agent or App Gateway for the newly created Tenant.

#### Create IDP/SSO sign-in rules

To map new users signing into the system to existing tenants, you can use one or more of the following route methods to route new users (based on their email address) to an existing tenant.

*Route an email to a tenant based on the emailâ€™s domain:*

This will instruct the server to assign any new user whose email domain matches the domain provided below to this specific tenant.

Note that providing the same domain name for multiple tenants will result in unstable behavior and should be avoided.

``` bash
curl $APISERVER_URL/login.set_domains \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"domains":["<USERS_EMAIL_DOMAIN>"]}'
```

`<USERS_EMAIL_DOMAIN>` is the email domain set up for users to access through SSO.

*Route specific email(s) to a tenant:*

This will instruct the server to assign any new user whose email is found in this list to this specific tenant. You can use the is_admin property to choose whether these users will be set as admins in this tenant upon login.

Note that you can create more than one list per tenant (using multiple API calls) to create one list for admin users and another for non-admin users.

Note that including the same email address in more than a single tenantâ€™s list will result in unstable behavior and should be avoided.

``` bash
curl $APISERVER_URL/login.add_whitelist_entries \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"emails":["<email1>", "<email2>", ...],"is_admin":false}'
```

To remove existing email(s) from these lists, use the following API call. Note that this will not affect a user who has already logged in using one of these email addresses:

``` bash
curl $APISERVER_URL/login.remove_whitelist_entries \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"emails":["<email1>", "<email2>", ...]}'
```

*Get the current login routing settings:*

To get the current IDP/SSO login rule settings for this tenant:

``` bash
curl $APISERVER_URL/login.get_settings \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET
```

### Limit Features for all Users in a Groupâ€‹

The serverâ€™s `clearml-values.override.yaml` can control some tenantsâ€™ configurations, limiting the features available to some users or groups in the system.

Example: with the following configuration, all users in the â€œusersâ€ group will only have the `applications` feature enabled.

``` yaml
apiserver:
  extraEnvs:
    - name: CLEARML__services__auth__default_groups__users__features
      value: "[\"applications\"]"
```

Available Features:

- `applications` - Viewing and running applications
- `data_management` - Working with hyper-datasets and dataviews
- `experiments` - Viewing the experiment table and launching experiments
- `queues` - Viewing the queues screen
- `queue_management` - Creating and deleting queues
- `pipelines` - Viewing/managing pipelines in the system
- `reports` - Viewing and managing reports in the system
- `show_dashboard` - Show the dashboard screen
- `show_projects` - Show the projects menu option
- `resource_dashboard` - Display the resource dashboard in the orchestration page

## Workers

Refer to the following pages for installing and configuring the ClearML Enterprise Agent (TODO link to agent_k8s_installation) and App Gateway (TODO link to app-gateway).

**Note**: Make sure to setup Agent and App Gateway using a Tenant's admin user credentials created with the Tenant creation APIs described above.

### Tenants Separation

In multi-tenant setups, you can separate the tenantsâ€™ workers in different namespaces.

Create a Kubernetes Namespace for each tenant and install a dedicated ClearML Agent and AI Application Gateway in each Namespace.

A tenantâ€™s Agent and Gateway need to be configured with credentials created on the ClearML server by a user of the same tenant.

Additional network separation can be achieved via Kubernetes Network Policies.