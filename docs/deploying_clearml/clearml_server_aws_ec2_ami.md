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

#### v2.3.0

* **af-south-1** : ami-0360211da7a36d4da
* **ap-east-1** : ami-04afa4937749b9f75
* **ap-east-2** : ami-0262eb11563e2694c
* **ap-northeast-1** : ami-0028ede3d1cc6de7a
* **ap-northeast-2** : ami-047b6e274110e24cf
* **ap-northeast-3** : ami-03cd0f76ca3527c1c
* **ap-south-1** : ami-027037d0cf04ff342
* **ap-south-2** : ami-0a109f72e9468dbdf
* **ap-southeast-1** : ami-0fcb67777f9d577b7
* **ap-southeast-2** : ami-082e3b95ed1eed582
* **ap-southeast-3** : ami-0a202a0eb4ebe8ecd
* **ap-southeast-4** : ami-08fc373bd7b47b945
* **ap-southeast-5** : ami-03e3976e294a20184
* **ap-southeast-6** : ami-0b7e571a62aa8c6d0
* **ap-southeast-7** : ami-03e69780f76e5165b
* **ca-central-1** : ami-0d8021918ea8995cc
* **ca-west-1** : ami-0d3780a8325c8cf83
* **eu-central-1** : ami-0f425fa8efb65277b
* **eu-central-2** : ami-08877c4368ae761e4
* **eu-north-1** : ami-0b885bbf8cbfdc844
* **eu-south-1** : ami-0250ec18dfd6d738f
* **eu-south-2** : ami-0a17bf40ac8912533
* **eu-west-1** : ami-07f683c10ded4bfc2
* **eu-west-2** : ami-02062e5a266f3e393
* **eu-west-3** : ami-00da184c142a0c48c
* **il-central-1** : ami-079cad3c400f46994
* **me-central-1** : ami-0fecb25246d93f202
* **me-south-1** : ami-0433cc85d932f11df
* **mx-central-1** : ami-03463e7a6f6ea8a77
* **sa-east-1** : ami-0ed910ef5a12f2906
* **us-east-1** : ami-0a74813db888f5931
* **us-east-2** : ami-06dcfd0c9438960f6
* **us-west-1** : ami-08edb99a9bb9c77e8
* **us-west-2** : ami-08e3400068cc009a0

## Next Step

To keep track of your experiments and/or data, the `clearml` package needs to communicate with your server. 
For instruction to connect the ClearML SDK to the server, see [ClearML Setup](../clearml_sdk/clearml_sdk_setup.md).
