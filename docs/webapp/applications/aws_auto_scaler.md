---
title: AWS Auto-Scaler
---

The AWS auto-scaler application is a GUI app to optimize AWS EC2 instance scaling according to the instance types and budget 
configured. 

In the app, use a wizard to input configurations for the auto-scaler according to your budget, and then ClearML does the rest 
and creates the instance.



## Launching an instance 

To launch an AWS auto-scaler instance:
1. Navigate to the AWS Auto-Scaler App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
 - **Name** - Name of your app 
 - **AWS Key** - AWS Access Key ID
 - **AWS Secret** - AWS Secret Access Key
 - **AWS Region** - AWS region name. See [AWS Regions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions) 
 - **Git User** - Git username for repository cloning 
 - **Git password**
 - **Max idle time** - Maximum time in minutes that an AWS EC2 instance can be idle before the ClearML AWS auto-scaler 
   spins it down
 - **Polling interval** - How often does the instance check for idle instances (in minutes)
 - **Docker settings** - Default Docker image to use for the AWS EC2 instance 
 
 - **Instance queue list** - Configure the machine types for the auto-scaler
    - **Instance name** - Assign a name to the resource / instance type (used in the budget section). For example 'aws4gpu'. 
    - **Num instances** - Maximum number of instances to spin for the specified queue
    - **Queue Name** - Queue to monitor 
    - **EC2 Type** - Choose an EC2 instance according to your needs. See [Instance Types](https://aws.amazon.com/ec2/instance-types).
    - **Availability Zone** - Input an [availability zone](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.AvailabilityZones)
    - **AMI** - Amazon Machine Image ID
    - **EBS device** - Amazon EBS device
    - **EBS volume size** - Amazon EBS volume size in GB
    - **Amazon key pair** - Amazon Key Pair name 
    - **Security Group ID** - Amazon Security Group ID (comma delimited values)
    - **In Spot** - Check box to use a spot instance. Else, a reserved instance is used. 
    - **+ Add Item** - Configure another queue
 
 - **Init script** - A bash script to execute when creating an instance, before ClearML Agent executes
 - **Custom Configuration** - A ClearML configuration file to use for executing experiments in ClearML Agent

Once launched, the instance appears on the **APP INSTANCES** 
list on the left column 


## Plots

The app monitors your applications and can adjust instances based on the configurations that are specified. 
Once launched, an auto-scaler task is created. 

Once the app launched, a few plots appear: 
* Workers - How many workers are in an idle state
* Resources and queues - Queues and the type of instances they will launch
* Usage - How many workers are running out of total workers

## Console
In addition, a log will appear with all of the app's console outputs. 

