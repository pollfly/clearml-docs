---
title: AWS Auto-Scaler
---

The AWS auto-scaler is a GUI app to optimize AWS EC2 instance scaling according to the instance types and budget configured. 
In the app, use a wizard to input confiugrations for the auto-scaler according to your budget, and then ClearML does the rest 
and creates the instance. 


## Launching an instance 

To launch an AWS auto-scaler instance:
1. Go into the AWS Auto-Scaler App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
 - Name - name of your app 
 - AWS Key - AWS Access Key ID
 - AWS Secret - AWS Secret Access Key
 - AWS Region - AWS region name. See [Regions, Availability, Zones, and Local Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) 
 - Git User - Git username for repository cloning 
 - Git password
 - Max idle time - idle time in minutes for an instance
 - Polling interval - polling time in minutes for an instance
 - Docker settings - default docker image / parameters to use
 
 - Instance queue list - Configure the machine types for the auto-scaler
    - Instance name
    - Num instances 
    - Queue Name 
    - EC2 Type
    - Availability Zone 
    - AMI 
    - EBS device
    - EBS volume size
    - Amazon key pair
    - Security Group ID 
    - In Spot [ ] 
    - Add Item
 
 - Init script
 - Custom Configuration

Once launched, the instance appears on the **APP INSTANCES** 
list on the left column 

## Plots

The app monitors your applications and can adjust instances based on the configurations that are specified. 
Once launched, an auto-scaler task is created. On the page app, plots will appear with information about 
worker usage, number of idle workers, idle time, and more. Additionally, there is a console log with the console output. 


