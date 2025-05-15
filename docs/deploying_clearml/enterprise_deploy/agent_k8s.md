---
title: ClearML Agent on Kubernetes
---

The ClearML Agent enables scheduling and executing distributed experiments on a Kubernetes cluster.

## Prerequisites

- A ClearML Enterprise server is up and running.
- Generate a set of `<ACCESS_KEY>` and `<SECRET_KEY>` credentials in the ClearML Server. The easiest way is via 
  the ClearML UI (**Settings > Workspace > API Credentials > Create new credentials**). For more information, see [ClearML API Credentials](../../webapp/settings/webapp_settings_profile.md#clearml-api-credentials). 

  :::note
  Make sure these credentials belong to an admin user or a service user with admin privileges.
  :::
 
- The worker environment must be able to access the ClearML Server over the same network.
- * Helm token to access `clearml-enterprise` helm-chart repo

## Installation

### Add the Helm Repo Locally

Add the ClearML Helm repository:
```bash
helm repo add clearml-enterprise https://raw.githubusercontent.com/clearml/clearml-enterprise-helm-charts/gh-pages --username <HELM_REPO_TOKEN> --password <HELM_REPO_TOKEN>
```

Update the repository locally:
```bash
helm repo update
```

### Create a Values Override File

Create a `clearml-agent-values.override.yaml` file with the following content:

:::note
Replace the `<ACCESS_KEY>` and `<SECRET_KEY>` with the admin credentials 
you created earlier. Set `<api|file|web>ServerUrlReference` to the relevant URLs of your ClearML 
Server installation.
:::

```yaml
imageCredentials:
  password: "<CLEARML_DOCKERHUB_TOKEN>"
clearml:
  agentk8sglueKey: "<ACCESS_KEY>"
  agentk8sglueSecret: "<SECRET_KEY>"
agentk8sglue:
  apiServerUrlReference: "<CLEARML_API_SERVER_REFERENCE>"
  fileServerUrlReference: "<CLEARML_FILE_SERVER_REFERENCE>"
  webServerUrlReference: "<CLEARML_WEB_SERVER_REFERENCE>"
  createQueues: true
  queues:
    exampleQueue:
      templateOverrides: {}
      queueSettings: {}
```

### Install the Chart

Install the ClearML Enterprise Agent Helm chart using the previous values override file:

```bash
helm upgrade -i -n <WORKER_NAMESPACE> clearml-agent clearml-enterprise/clearml-enterprise-agent --create-namespace -f clearml-agent-values.override.yaml
```

## Additional Configuration Options

To view all configurable options for the Helm chart, run the following command:

```bash
helm show readme clearml-enterprise/clearml-enterprise-agent
# or
helm show values clearml-enterprise/clearml-enterprise-agent
```

### Set GPU Availability in Orchestration Dashboard

To show GPU availability in the [Orchestration Dashboard](../../webapp/webapp_orchestration_dash.md), explicitly set the number of GPUs:

```yaml
agentk8sglue:
  # -- Agent reporting to Dashboard max GPU available. This will report 2 GPUs.
  dashboardReportMaxGpu: 2
```

### Queues

The ClearML Agent monitors ClearML queues and pulls tasks that are scheduled for execution.

A single agent can monitor multiple queues. By default, the queues share a base pod template (`agentk8sglue.basePodTemplate`) 
used when submitting a task to Kubernetes after it has been extracted from the queue.

Each queue can be configured with dedicated Pod template spec override (`templateOverrides`). This way queue definitions 
can be tailored to different use cases.

The following are a few examples of agent queue templates:

#### Example: GPU Queues


GPU queue support requires deploying the NVIDIA GPU Operator on your Kubernetes cluster.

For more information, see [GPU Operator](extra_configs/gpu_operator.md).


``` yaml
agentk8sglue:
  createQueues: true
  queues:
    1xGPU:
      templateOverrides:
        resources:
          limits:
            nvidia.com/gpu: 1
    2xGPU:
      templateOverrides:
        resources:
          limits:
            nvidia.com/gpu: 2
```

#### Example: Overriding Pod Templates per Queue

In this example:

- The `red` queue inherits both the label `team=red` and the 1Gi memory limit from the `basePodTemplate` section.
- The `blue` queue overrides the label by setting it to `team=blue`, and inherits the 1Gi memory from the `basePodTemplate` section.
- The `green` queue overrides the label by setting it to `team=green`, and overrides the memory limit by setting it to 2Gi. 
  It also sets an annotation and an environment variable.

```yaml
agentk8sglue:
  # Defines common template
  basePodTemplate:
    labels:
      team: red
    resources:
      limits:
        memory: 1Gi
  createQueues: true
  queues:
    red:
      # Does not override
      templateOverrides: {}
    blue:
      # Overrides labels
      templateOverrides:
        labels:
          team: blue
    green:
      # Overrides labels and resources, plus set new fields
      templateOverrides:
        labels:
          team: green
        annotations:
          example: "example value"
        resources:
          limits:
            memory: 2Gi
        env:
          - name: MY_ENV
            value: "my_value"
```

## Next Steps

Once the agent is up and running, proceed with deploying the[ ClearML Enterprise App Gateway](appgw_install_k8s.md).

