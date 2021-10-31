---
title: AWS Autoscaler
---

The AWS Autoscaler Application is a GUI to optimize AWS EC2 instance scaling according to EC2 instance types and budget 
configured. The autoscaler spins EC2 instances automatically based on demand. It polls the queues, and automatically spins 
up EC2 instances when there aren't enough to execute pending tasks, and automatically spins down idle instances after a 
specified amount of time. 

Once an application instance is launched, ClearML monitors the instance and provides information about the available 
instances and their status in the app Dashboard.


## Launching an AWS Autoscaler App Instance 

To launch an AWS Autoscaler instance:
1. Navigate to the AWS Autoscaler App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
   - **App Instance Name**  
   - **AWS Access Key ID** and **AWS Secret Access Key** - These are used for accessing your AWS account and spinning up EC2 instances
   - **AWS Region** - [AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.Regions) 
     where the instances will be spun up
   - **EC2 Tags** - AWS instance tags. Insert `key=value` pairs, separated by commas
   - **Git User** and **Git Password** - Git information used for cloning repositories to the EC2 instance
   - **Max Idle Time** - Maximum time that an EC2 instance can be idle before the autoscaler spins it down (in minutes)
   - **Queue Polling Interval** - How often the autoscaler polls queues for tasks (in minutes). If there aren't enough resources 
     to execute the tasks, new instances are spun up. 
   - **Docker Image** - Default Docker image used to run experiments in
   - **Resource List** - Configure the machine types that will be auto-scaled
      - **Resource Name** - Assign a name to the EC2 instance type. For example 'aws4gpu'. 
      - **Max Instances** - Maximum number of concurrent instances of this type to spin
      - **Queue Name** - Queue associated with the instance type. The tasks enqueued to this queue will be executed by 
        this instance type 
      - **EC2 Type** - See [Instance Types](https://aws.amazon.com/ec2/instance-types) for full list of types
      - **Availability Zone** - See [availability zone](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html#Concepts.RegionsAndAvailabilityZones.AvailabilityZones) 
        options
      - **AMI** - Amazon Machine Image ID
      - **EBS Device** - Disc mount point
      - **EBS Volume Size** - Disc size in GB
      - **Instance Key Pair** - The Amazon key pair name
      - **Security Group ID** - Amazon Security Group IDs separated by commas
      - **Use Spot Instance** - Check box to use a spot instance. Else, a reserved instance is used
      - **+ Add Item** - Configure another queue
   - **Init script** - A bash script to execute when creating an instance
   - **Custom Configuration** - A ClearML configuration file to use for executing experiments in ClearML Agent


## Plots

Once the app launched, a few plots will appear in the dashboard: 
* **Workers** - Number of workers in an idle state
* **Resources and Queues** - Queues and the type of instances they will launch
* **Usage** - Number of workers running out of total workers

## Console

The complete experiment log containing everything printed to stdout and stderr appears in the console log below the plots.

