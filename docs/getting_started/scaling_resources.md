---
title: Autoscaling Resources
---

Autoscaling allows organizations to dynamically manage compute resources based on demand, optimizing efficiency and cost. 

When running machine learning experiments or large-scale compute tasks, demand for resources fluctuates. Autoscaling ensures that:
- **Resources are available when needed**, preventing delays in task execution.
- **Idle resources are automatically spun down**, reducing unnecessary costs.
- **Workloads can be distributed efficiently**.

ClearML offers the following resource autoscaling solutions:
* Built-in GUI applications - Built-in applications to autoscale, no code required (available under the Pro and Enterprise plans)
  * AWS Autoscaler
  * GCP Autoscaler
* Kubernetes autoscaling
* Custom autoscaler implementation using the `AutoScaler` class

### GUI Autoscaler Applications
For users on **Pro** and **Enterprise** plans, ClearML provides a UI applications to configure autoscaling for cloud 
resources. These applications include:
* [**AWS Autoscaler**](../webapp/applications/apps_aws_autoscaler.md): Automatically provisions and shuts down AWS EC2 instances based on workload demand.
* [**GCP Autoscaler**](../webapp/applications/apps_gcp_autoscaler.md): Manages Google Cloud instances dynamically according to defined budgets.

These applications allow users to set up autoscaling with minimal configuration, defining compute budgets and resource limits directly through the UI.

### Kubernetes Autoscaling
ClearML integrates with **Kubernetes**, allowing agents to be deployed within a cluster. Kubernetes handles:
- Automatic pod creation for executing tasks.
- Resource allocation and scaling based on workload.
- Optional integration with Kubernetes' **Cluster Autoscaler**, which adjusts the number of nodes dynamically.

This is particularly useful for organizations already using Kubernetes for workload orchestration.

### Custom Autoscaler Implementation
Users can build their own autoscaler using the `clearml.automation.auto_scaler.AutoScaler` class which enables:
* Direct control over instance scaling logic.
* Custom rules for resource allocation.
* Budget-conscious decision-making based on predefined policies.

This method requires some scripting.

$$$$$See the AWS Autoscaler Example to see the `AutoScaler` class in action. This script can be adjusted to scale GCP resources 
as well

demonstrates how to use the clearml.automation.auto_scaler module to implement a service that optimizes AWS EC2 instance scaling according to a defined instance budget
