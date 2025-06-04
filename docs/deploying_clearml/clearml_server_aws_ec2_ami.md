---
title: AWS EC2 AMIs
---

Deployment of ClearML Server on AWS is easily performed using AWS AMIs, which are available in the AWS community AMI catalog.
The [ClearML Server community AMIs](#clearml-server-aws-community-amis) are configured by default without authentication
to allow quick access and onboarding.

After deploying the AMI, configure the ClearML Server instance to provide the authentication scheme that 
best matches the workflow.

For information about upgrading a ClearML Server in an AWS instance, see [here](upgrade_server_aws_ec2_ami.md).

:::important
If ClearML Server is being reinstalled, clearing browser cookies for ClearML Server is recommended. For example, 
for Firefox, go to Developer Tools > Storage > Cookies, and for Chrome, go to Developer Tools > Application > Cookies,
and delete all cookies under the ClearML Server URL.
:::

## Launching

:::warning
By default, ClearML Server deploys as an open network. To restrict ClearML Server access, follow the instructions 
in the [Security](clearml_server_security.md) page.
:::

The minimum recommended amount of RAM is 8 GB. For example, a `t3.large` or `t3a.large` EC2 instance type would accommodate the recommended RAM size.

**To launch a ClearML Server AWS community AMI**, use one of the [ClearML Server AWS community AMIs](#clearml-server-aws-community-amis) 
and see:

* The AWS Knowledge Center page, [How do I launch an EC2 instance from a custom Amazon Machine Image (AMI)?](https://aws.amazon.com/premiumsupport/knowledge-center/launch-instance-custom-ami/)
* Detailed instructions in the AWS Documentation for [Launching an Instance Using the Launch Instance Wizard](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-instance.html).

## Accessing ClearML Server

Once deployed, ClearML Server exposes the following services:

* Web server on `TCP port 8080`
* API server on `TCP port 8008`
* File Server on `TCP port 8081`

**To locate ClearML Server address:**

1. Go to AWS EC2 Console.
1. In the **Details** tab, **Public DNS (IPv4)** shows the ClearML Server address.

**To access ClearML Server WebApp (UI):**

* Direct browser to its web server URL: `http://<Server Address>:8080`

**To SSH into ClearML Server:**

* Log into the AWS AMI using the default username `ec2-user`. Control the SSH credentials from the AWS management console.

### Logging in to the WebApp (UI)

Enter any name to log in to the ClearML WebApp (UI). If needed, modify the default login behavior to match workflow policy, 
see [Configuring Web Login Authentication](clearml_server_config.md#web-login-authentication) 
on the "Configuring Your Own ClearML Server" page.

## Storage Configuration

The pre-built ClearML Server storage configuration is the following:

* MongoDB: `/opt/clearml/data/mongo_4/`
* Elasticsearch: `/opt/clearml/data/elastic_7/`
* File Server: `/opt/clearml/data/fileserver/`


## Backing Up and Restoring Data and Configuration

:::warning
Stop your server before backing up or restoring data and configuration
:::

:::note
If data is being moved between a **Trains Server** and a **ClearML Server** installation, make sure to use the correct paths 
for backup and restore (`/opt/trains` and `/opt/clearml` respectively).
:::

The commands in this section are examples for backing up and restoring data and configuration.

If data and configuration folders are in `/opt/clearml`, then archive all data into `~/clearml_backup_data.tgz`, and 
configuration into `~/clearml_backup_config.tgz`:

```bash
sudo tar czvf ~/clearml_backup_data.tgz -C /opt/clearml/data .
sudo tar czvf ~/clearml_backup_config.tgz -C /opt/clearml/config .
```

**If data and configuration need to be restored**:

1. Verify you have the backup files.
1. Replace any existing data with the backup data:

   ```bash
   sudo rm -fR /opt/clearml/data/* /opt/clearml/config/*
   sudo tar -xzf ~/clearml_backup_data.tgz -C /opt/clearml/data
   sudo tar -xzf ~/clearml_backup_config.tgz -C /opt/clearml/config
   ```
1. Grant access to the data:

   ```bash
   sudo chown -R 1000:1000 /opt/clearml
   ```
        

## ClearML Server AWS Community AMIs

The following section contains a list of AMI Image IDs per-region for the latest ClearML Server version.



### Latest Version

#### v2.1.0

* **af-south-1** : ami-0c02f50931989c82c
* **ap-east-1** : ami-09f1923e5a508d1ff
* **ap-northeast-1** : ami-02ca0c43f301f7302
* **ap-northeast-2** : ami-08a17fdd961b11a95
* **ap-northeast-3** : ami-001c15a40ce2abfd9
* **ap-south-1** : ami-06c84aa5aeb0cee85
* **ap-south-2** : ami-0f73b2cb16f6a4c8d
* **ap-southeast-1** : ami-02438427c412541bd
* **ap-southeast-2** : ami-0ca5327c5659da2d8
* **ap-southeast-3** : ami-02c2510f93e9103c2
* **ap-southeast-4** : ami-043cc0463fd0d5f65
* **ap-southeast-5** : ami-0a89c5a9c39fd05a7
* **ca-central-1** : ami-0c902f35c96b30c39
* **ca-west-1** : ami-0f5ec5964e548adfd
* **eu-central-1** : ami-0879367e77eb2f09f
* **eu-central-2** : ami-096caaa4aada8a7d8
* **eu-north-1** : ami-0800c04d58a0192c6
* **eu-south-1** : ami-0b95afb1fa7fb718c
* **eu-south-2** : ami-0393bdf1fb5212db5
* **eu-west-1** : ami-0faee29c9e77fd277
* **eu-west-2** : ami-0e1a7b05c74d47a17
* **eu-west-3** : ami-0927e68e0d333890e
* **il-central-1** : ami-0282774a5d6f5bbef
* **me-central-1** : ami-0245376f5c1690b9d
* **me-south-1** : ami-0df5d9605c6bcbd87
* **sa-east-1** : ami-07e28e8e282e8fc34
* **us-east-1** : ami-066f2e1182971cd2e
* **us-east-2** : ami-007206d639ecc9430
* **us-west-1** : ami-057d8ca86daa6f675
* **us-west-2** : ami-06d802321b6a20774

## Next Step

To keep track of your experiments and/or data, the `clearml` package needs to communicate with your server. 
For instruction to connect the ClearML SDK to the server, see [ClearML Setup](../clearml_sdk/clearml_sdk_setup.md).
