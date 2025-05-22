---
title: Multi-Tenant Service on Kubernetes 
---

This guide provides step-by-step instructions for installing a ClearML multi-tenant service on a Kubernetes cluster.

Ready, missing links in TODOs
---
TODO:
Control Plane:
- Link: SSO login
- Additional envs for control-plane multi-tenancy

Workers:
- Link: basic Agent installation
- Link: basic AI App Gateway installation

---

## Control Plane

For installing the ClearML control-plane, follow [this guide](k8s.md).

Update the Server's `clearml-values.override.yaml` with the following values:

```yaml
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

The credentials specified in `<SUPERVISOR_USER_KEY>` and `<SUPERVISOR_USER_SECRET>` can be used to log in as the 
supervisor user from the ClearML Web UI accessible using the URL `app.<BASE_DOMAIN>`.

Note that the `<SUPERVISOR_USER_EMAIL>` value must be explicitly quoted. To do so, put `\"` around the quoted value. 
Example `"\"email@example.com\""`.

You will want to configure SSO as well. For this, follow the [SSO (Identity Provider) Setup guide](extra_configs/sso_login.md).

### Create a Tenant

The following section will address the steps required to create a new tenant in the ClearML Server using a series of API 
calls.

Note that placeholders (`<PLACEHOLDER>`) in the following configuration should be substituted with a valid domain based 
on your installation values.

#### Create a New Tenant in the ClearML Control-plane

* Define variables to use in the next steps:*

   ```bash
   APISERVER_URL="https://api.<BASE_DOMAIN>"
   APISERVER_KEY="<APISERVER_KEY>"
   APISERVER_SECRET="<APISERVER_SECRET>"
   ```

:::note
The apiserver key and secret should be the same as those used for installing the ClearML Enterprise server Chart.
:::

*Create a Tenant (company):*

   ```bash
   curl $APISERVER_URL/system.create_company \
     -H "Content-Type: application/json" \
     -u $APISERVER_KEY:$APISERVER_SECRET \
     -d '{"name":"<TENANT_NAME>"}'
   ```

The result returns the new Company ID (`<COMPANY_ID>`).

If needed, list existing tenants (companies) using:

   ```bash
   curl -u $APISERVER_KEY:$APISERVER_SECRET $APISERVER_URL/system.get_companies
   ```

*Create an Admin User for the new tenant:*

   ```bash
   curl $APISERVER_URL/auth.create_user \
     -H "Content-Type: application/json" \
     -u $APISERVER_KEY:$APISERVER_SECRET \
     -d '{"name":"<ADMIN_USER_NAME>","company":"<COMPANY_ID>","email":"<ADMIN_USER_EMAIL>","role":"admin","internal":"true"}'
   ```

The result returns the new User ID (`<USER_ID>`).

*Create Credentials for the new Admin User:*

   ```bash
   curl $APISERVER_URL/auth.create_credentials \
     -H "Content-Type: application/json" \
     -H "X-Clearml-Impersonate-As: <USER_ID>" \
     -u $APISERVER_KEY:$APISERVER_SECRET
   ```

The result returns a set of key and secret credentials associated with the new Admin User.

:::note 
You can use this set of credentials to set up an Agent or App Gateway for the newly created Tenant.
:::

#### Create IDP/SSO Sign-in Rules

To map new users signing into the system to existing tenants, you can use one or more of the following route methods to route new users (based on their email address) to an existing tenant.

*Route an email to a tenant based on the email's domain:*

This will instruct the server to assign any new user whose email domain matches the domain provided below to this specific tenant.

Note that providing the same domain name for multiple tenants will result in unstable behavior and should be avoided.

   ```bash
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

```bash
curl $APISERVER_URL/login.add_whitelist_entries \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"emails":["<email1>", "<email2>", ...],"is_admin":false}'
```

To remove existing email(s) from these lists, use the following API call. Note that this will not affect a user who has already logged in using one of these email addresses:

```bash
curl $APISERVER_URL/login.remove_whitelist_entries \
  -H "Content-Type: application/json" \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"emails":["<email1>", "<email2>", ...]}'
```

*Get the current login routing settings:*

To get the current IDP/SSO login rule settings for this tenant:

```bash
curl $APISERVER_URL/login.get_settings \
  -H "X-Clearml-Act-As: <USER_ID>" \
  -u $APISERVER_KEY:$APISERVER_SECRET
```

### Limit Features for all Users in a Group

The server's `clearml-values.override.yaml` can control some tenants configurations, limiting the features available to some users or groups in the system.

Example: with the following configuration, all users in the users group will only have the `applications` feature enabled.

```yaml
apiserver:
  extraEnvs:
    - name: CLEARML__services__auth__default_groups__users__features
      value: "[\"applications\"]"
```

A list of available features is available at the Appendix of this page: [Available Features](#available-features)

## Workers

Refer to the following pages for installing and configuring the [ClearML Enterprise Agent](agent_k8s.md) and [App Gateway](appgw.md).

:::note
Make sure to set up Agent and App Gateway using a Tenant's admin user credentials created with the Tenant creation APIs described above.
:::

### Tenants Separation

In multi-tenant setups, you can separate the tenants workers in different namespaces.

Create a Kubernetes Namespace for each tenant and install a dedicated ClearML Agent and AI Application Gateway in each Namespace.

A tenant Agent and Gateway need to be configured with credentials created on the ClearML server by a user of the same tenant.

Additional network separation can be achieved via Kubernetes Network Policies.

## Additional Configuration

### Override Options When Creating a New Tenant

When creating a new tenant company, you can specify several tenant options. These include:

* `features` - Add features to a company.
* `exclude_features` - Exclude features from a company.
* `allowed_users` - Set the maximum number of users for a company.

```bash
curl $APISERVER_URL/system.create_company \
  -H "Content-Type: application/json" \
  -u $APISERVER_KEY:$APISERVER_SECRET \
  -d '{"name":"<TENANT_NAME>", "defaults": { "allowed_users": "10", "features": ["experiments"], "exclude_features": ["app_management", "applications", "user_management"] }}'
```

### Limit Features for all Users

This value in the `clearml-values.override.yaml` will have priority over all tenants, and will limit the features available to any user in the system. This means that even if the feature is enabled for the tenant, if it's not in this list, the user will not see it.

Example: all users will only have the applications feature enabled.

```yaml
apiserver:
  extraEnvs:
    - name: CLEARML__services__auth__default_groups__users__features
      value: "[\"applications\"]"
```

A list of available features is available at the Appendix of this page: [Available Features](#available-features)

### Configuring Groups

Groups in ClearML are used to manage user permissions and control access to specific features within the platform. 
The following section explains the different types of groups and how to configure them, with a focus on configuration-based, cross-tenant groups.

#### Types of Groups

ClearML utilizes several types of groups:
* **Built-in Groups** - These groups exist by default in every ClearML installation:
  * **`users`**: All registered users automatically belong to this group. It typically defines the baseline set of 
  permissions and features available to everyone.  
  * **`admins`**: Users in this group have administrative privileges.  
  * **`queue_admins`**: Users in this group have specific permissions to manage execution queues.
* **Tenant-Specific Groups (UI)** - Additional groups can be created specific to a tenant (organization workspace) 
  directly through the ClearML Web UI (under **Settings > Users & Groups**). Users can be assigned to these groups via 
  the UI. These groups are managed *within* a specific tenant. For more information, see [Users & Groups](../../webapp/settings/webapp_settings_users.md).
* **Cross-Tenant Groups (Configuration)** - These groups are defined centrally in the ClearML configuration files 
  (e.g., Helm chart values, docker-compose environment variables). They offer several advantages:
  * **Cross-Tenant Definition:** Defined once in the configuration, applicable across the deployment.  
  * **Fine-Grained Feature Control:** Allows precise assignment of specific ClearML features to groups.  
  * **Automation:** Suitable for infrastructure-as-code and automated deployment setups.



#### Configuring Cross-Tenant Groups

To define a cross-tenant group, you need to set specific configuration variables. These are typically set as environment 
variables for the relevant ClearML services (like `apiserver`). The naming convention follows this
pattern: `CLEARML__services__auth__default_groups__<GroupName>__<Property>`.

Replace `<GroupName>` with the desired name for your group (e.g., `my_group_name`, `Data_Scientists`, `MLOps_Engineers`).

##### Configuration Variables

For each group you define in the configuration, you need to specify the following properties:

* **`id`**: A unique identifier for the group. This **must** be a standard UUID (Universally Unique Identifier). You can 
 generate one using various online tools or libraries.  
    
  * Variable Name: `CLEARML__services__auth__default_groups__<GroupName>__id`  
  * Example Value: `"abcd-1234-abcd-1234"`

* **`name`**: The display name of the group. This should match the `<GroupName>` used in the variable path.  
    
  * Variable Name: `CLEARML__services__auth__default_groups__<GroupName>__name`  
  * Example Value: `"My Group Name"`

* **`features`**: A JSON-formatted list of strings, where each string is a feature name to be enabled for this group. See 
  [Available Features](#available-features) for a list of valid feature names. Note that the features must be defined 
  for the tenant or for the entire server in order to affect the group. By default, all the features of the tenant are 
  available to all users.  
    
  * Variable Name: `CLEARML__services__auth__default_groups__<GroupName>__features`  
  * Example Value: `'["applications", "experiments", "pipelines", "reports", "show_dashboard", "show_projects"]'` (Note 
  the single quotes wrapping the JSON string if setting via YAML/environment variables).

* **`assignable`**: A boolean (`"true"` or `"false"`) indicating whether administrators can add users to this group via 
  the ClearML Web UI. If `false`, group membership is managed externally or implicitly. Configuration-defined groups 
  often have this set to `false`.  
    
  * Variable Name: `CLEARML__services__auth__default_groups__<GroupName>__assignable`  
  * Example Value: `"false"`

* **`system`**: A boolean flag. This should **always be set to `"false"`** for custom-defined groups.  
    
  * Variable Name: `CLEARML__services__auth__default_groups__<GroupName>__system`  
  * Example Value: `"false"`

##### Example Configuration

The following example demonstrates how you would define a group named `my_group_name` with a specific set of features 
that cannot be assigned via the UI:

```yaml
# Example configuration snippet (e.g., in Helm values.yaml or docker-compose.yml environment section)

# Unique group id for my_group_name
- name: CLEARML__services__auth__default_groups__my_group_name__id
  value: "abcd-1234-abcd-1234" # Replace with a newly generated UUID

# Group name for my_group_name
- name: CLEARML__services__auth__default_groups__my_group_name__name
  value: "My Group Name"

# List of features for my_group_name
- name: CLEARML__services__auth__default_groups__my_group_name__features
  value: '["applications", "experiments", "queues", "pipelines", "reports", "show_dashboard","show_projects"]'

# Prevent assignment via UI for my_group_name
- name: CLEARML__services__auth__default_groups__my_group_name__assignable
  value: "false"

# Always false for custom groups
- name: CLEARML__services__auth__default_groups__my_group_name__system
  value: "false"
```

### Feature Assignment Strategy

#### Combining Features

If a user belongs to multiple groups (e.g., the default `users` group and a custom `my_group_name` group), their 
effective feature set is the **union** (combination) of all features from all groups they belong to.

#### Configuring the Default 'users' Group

Because all users belong to the `users` group, and features are combined, it's crucial to configure the `users` group 
appropriately. You generally have two options:

1. **Minimum Shared Features:** Assign only the absolute minimum set of features that *every single user* should have to 
   the `users` group.  
2. **Empty Feature Set:** Assign an empty list (`[]`) to the `users` group's features. This means users only get features 
  explicitly granted by other groups they are members of. This is often the cleanest approach when using multiple custom groups.

**Example: Disabling all features by default for the `users` group:**

```yaml
- name: CLEARML__services__auth__default_groups__users__features
  value: '[]'
```

:::note
You typically don't need to define the id, name, assignable, or system properties for built-in groups like users unless 
you need to override default behavior, but you do configure their features.
:::


#### Setting Server-Level or Tenant-level Features

Features must be enabled for the entire server or for the tenant in order to allow setting it for specific groups. 
Setting server wide feature is done using a different configuration pattern: `CLEARML__services__organization__features__<FeatureName>`.

Setting one of these variables to `"true"` enables the feature globally.

**Example: Enabling `user_management_advanced` for the entire organization:**

```yaml
- name: CLEARML__services__organization__features__user_management_advanced
  value: "true"
```

To enable a feature for a specific tenant, use the following API call:

```bash
curl $APISERVER_URL/system.update_company_settings \                                                  
 -H "Content-Type: application/json" \   
 -u $APISERVER_KEY:$APISERVER_SECRET \
 -d '{                      
   "company": "<company_id>",
   "features": ["sso_management", "user_management_advanced", ...]
}'
```

By default, all users have access to all features, but this can be changed by setting specific features set per group as described above.

#### Example: Defining Full Features for Admins

While the `admins` group has inherent administrative privileges, you might want to explicitly ensure they have access to 
*all* configurable features defined via the `features` list, especially if you've restricted the default `users` group 
significantly. You might also need to enable certain features organization-wide.

```yaml
# Enable advanced user management for the whole organization
- name: CLEARML__services__organization__features__user_management_advanced
  value: "true"

# (Optional but good practice) Explicitly assign all features to the built-in admins group
- name: CLEARML__services__auth__default_groups__admins__features
  value: '["user_management", "user_management_advanced", "permissions", "applications", "app_management", "queues", "queue_management", "data_management", "config_vault", "pipelines", "reports", "resource_dashboard", "sso_management", "service_users", "resource_policy", "model_serving", "show_dashboard", "show_model_view", "show_projects"]' # List all relevant features

# You might still want to define other custom groups with fewer features...
# - name: CLEARML__services__auth__default_groups__my_group_name__id
#   value: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # Replace with a newly generated UUID
# - name: CLEARML__services__auth__default_groups__my_group_name__name
#   value: "my_group_name"
# - name: CLEARML__services__auth__default_groups__my_group_name__features
#   value: '["some_feature", "another_feature"]'
# - name: CLEARML__services__auth__default_groups__my_group_name__assignable
#   value: "false"
# - name: CLEARML__services__auth__default_groups__my_group_name__system
#   value: "false"
```

By combining configuration-defined groups, careful management of the default users group features, and organization-level 
settings, you can create a flexible and secure permission model tailored to your ClearML deployment. Remember to 
restart the relevant ClearML services after applying configuration changes.

### Per-Tenant Applications Settings

You may want your users' applications in different tenants to have their own configuration and template on Kubernetes. For this reason, the ClearML Enterprise Server and Agent support different queue modes:

- `global` (default) - A single Apps Agent on the control-plane. The application's controllers will start on the control-plane.
- `per_tenant` - Multiple Apps Agents, one per tenant (will need `agentk8sglue.appsQueue.enabled=true` on Agents). The application's controllers will start on the worker.

Configure the Serverâ€™s `clearml-values.override.yaml`:

```yaml
clearmlApplications:
  queueMode: "per_tenant"
```

Configure the Agent's `clearml-agent-values.override.yaml`:

```yaml
agentk8sglue:
  appsQueue:
    enabled: true
    # -- Here you can define queueSettings and templateOverrides as for other queues.
    # queueSettings: 
    # templateOverrides: 
```

**Note**: this feature requires the Agent to be configured using an internal admin credentials as previously mentioned in the "Create an Admin User for the new tenant" section, making sure to pass `"internal":"true"` and using the output credentials for `clearml.agentk8sglueKey` and `clearml.agentk8sglueSecret` (or `existingAgentk8sglueSecret`).

## Appendix

### Available Features

The following features can be assigned to groups via the `features` configuration variable:

| Feature Name | Description | Notes |
| :---- | :---- | :---- |
| `user_management` | Allows viewing company users and groups, and editing group memberships. | Only effective if the group is `assignable`. |
| `user_management_advanced` | Allows direct creation of users (bypassing invites) by admins and system users. | Often requires enabling at the organization level too. |
| `permissions` | Enables editing of Role-Based Access Control (RBAC) rules. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `applications` | Allows users to work with ClearML Applications (viewing, running). | Excludes management operations (upload/delete). |
| `app_management` | Allows application management operations: upload, delete, enable, disable. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `experiments` | Allows working with experiments. | *Deprecated/Not Used.* All users have access regardless of this flag. |
| `queues` | Allows working with queues. | *Deprecated/Not Used.* All users have access regardless of this flag. |
| `queue_management` | Allows create, update, and delete operations on queues. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `data_management` | Controls access to Hyper-Datasets. | Actual access might also depend on `apiserver.services.excluded`. |
| `config_vault` | Enables the configuration vaults feature. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `pipelines` | Enables access to Pipelines (building and running). | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `reports` | Enables access to Reports. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `resource_dashboard` | Enables access to the compute resource dashboard feature. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `sso_management` | Enables the SSO (Single Sign-On) configuration wizard. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `service_users` | Enables support for creating and managing service users (API keys). | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `resource_policy` | Enables the resource policy feature. | May default to a trial feature if not explicitly enabled. |
| `model_serving` | Enables access to the model serving endpoints feature. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `show_dashboard` | Makes the "Dashboard" menu item visible in the UI sidebar. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `show_model_view` | Makes the "Models" menu item visible in the UI sidebar. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `show_projects` | Makes the "Projects" menu item visible in the UI sidebar. | <img src="/docs/latest/icons/ico-optional-no.svg" alt="No" className="icon size-md center-md" /> |
| `show_orchestration` | Makes the "Orchestration" menu item visible in the UI sidebar. | Available from apiserver version 3.25 |
| `show_datasets` | Makes the "Datasets" menu item visible in the UI sidebar. | Available from apiserver version 3.25 |