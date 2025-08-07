---
title: Kubernetes
---

Agents can be deployed as Docker containers in a Kubernetes cluster. ClearML Agent adds missing scheduling capabilities 
to Kubernetes, enabling more flexible automation from code while leveraging all of ClearML Agent's features.

ClearML Agent is deployed onto a Kubernetes cluster using **Kubernetes-Glue**, which maps ClearML jobs directly to 
Kubernetes jobs. This allows seamless task execution and resource allocation across your cluster.

## How It Works
The ClearML Kubernetes-Glue performs the following:
- Pulls jobs from the ClearML execution queue.
- Prepares a Kubernetes job based on a provided YAML template.
- Inside each job pod, the `clearml-agent`:
  - Installs the required environment for the task.
  - Executes and monitors the task process.
  - Logs task data to the ClearML Server
   
## Deployment Options
You can deploy ClearML Agent onto Kubernetes using one of the following methods:

1. **K8s Glue Script**:
   Run a [K8s Glue script](https://github.com/clearml/clearml-agent/blob/master/examples/k8s_glue_example.py) on a Kubernetes CPU node. This approach is less scalable and typically suited for simpler use cases.

1. **ClearML Agent Helm Chart (Recommended)**:
   Use the ClearML Agent Helm Chart to spin up an agent pod acting as a controller. This is the recommended and 
   scalable approach. See more details below. 


## ClearML Helm Chart
The ClearML Agent is installed on Kubernetes using a Helm chart. This sets up a controller pod that listens to ClearML queues and launches jobs as needed.

1. Add the Helm Repository: 
  
   ```bash
   helm repo add clearml
   https://clearml.github.io/clearml-helm-charts
   ```

1. Update to latest version of this chart:
  
   ```bash
   helm repo update
   helm upgrade clearml-agent clearml/clearml-agent
   ```

1. Change values on existing installation:  
  
   ```bash
   helm upgrade clearml-agent clearml/clearml-agent --version <CURRENT CHART VERSION> -f custom_values.yaml
   ```
