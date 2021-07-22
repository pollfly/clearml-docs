---
title: AWS Auto-Scaler
---

UI wizard to optimize AWS EC2 instance scaling according to the instance types and budget configured. The app will know
to 

Add new plots with instances info.

All variables should be part of the CONFIGURATION tab.

Add new aws_autoscaler.conf.app file.

The app monitors your applications and can adjust instances based on the configurations that are specifed. 


אפשר להכניס custom configuration
זה יצור task של autoscaler
יראה פלוטים של usage, number of idle workes, idle time, 

* Name - name of your app
* AWS ley - enter you AWS Access Key ID
* AWS Secert - enter you AWS Secret Acess Key
* AWS Region - enter your AWS region name 
* Git User - Enter your Git username for repositry cloning 
* Git password - enter your git password
* Max idle time - enther the idle time in minutes for an instance
* Polling interval - enter the polling time in minutes for an instance
* Docker settings - enter default docker image/parameters to use

* Instance queue list
 * Instance name
 * Num instances 
 * Queue Name 
 * EC2 Type
 * Availability Zone 
 * AMI 
 * EBS device
 * EBS volume size
 * Amazon key pair
 * Security Group ID 
 * In Spot [ ] 
* Add Item

* Init script

* Custom Configuration

