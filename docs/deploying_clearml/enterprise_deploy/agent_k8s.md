ðŸŸ¡ Ready, but missing hyperlinks (see TODOs)
TODO:
- Link: GPU Operator
- Link: Additional configurations
- Link: Now proceed with AI App Gateway

---
title: ClearML Agent on Kubernetes
---

The ClearML Agent allows scheduling distributed experiments on a Kubernetes cluster.

## Prerequisites

- The ClearML Enterprise server is up and running.
- Create a set of `<ACCESS_KEY>` and `<SECRET_KEY>` credentials in the ClearML Server. The easiest way to do so is from 
  the ClearML UI (**Settings > Workspace > App Credentials > Create new credentials**).

  :::note
  Make sure that the generated keys belong to an admin user or a service user with admin privileges.
  :::
 
- The worker environment should be able to communicate to the ClearML Server over the same network.

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

### Prepare Values

Create a `clearml-agent-values.override.yaml` file with the following content:

:::note
In the following configuration, replace the `<ACCESS_KEY>` and `<SECRET_KEY>` placeholders with the admin credentials 
you have generated on the ClearML Server. The values for `<api|file|web>ServerUrlReference` should point to your ClearML 
control-plane installation.
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

:::note
You can view the full set of available and documented values of the chart by running the following command:

```bash
helm show readme clearml-enterprise/clearml-enterprise-agent
# or
helm show values clearml-enterprise/clearml-enterprise-agent
```
:::

### Report GPUs in the Dashboard

The Agent should explicitly report the total number of GPUs available on the cluster for it to appear in the dashboard reporting:

```yaml
agentk8sglue:
  # -- Agent reporting to Dashboard max GPU available. This will report 2 GPUs.
  dashboardReportMaxGpu: 2
```

### Queues

The ClearML Agent in Kubernetes monitors ClearML queues and pulls tasks that are scheduled for execution.

A single agent can monitor multiple queues, each queue sharing a Pod template (`agentk8sglue.basePodTemplate`) to be 
used when submitting a task to Kubernetes after it has been extracted from the queue.

Each queue can be configured with dedicated Pod template spec override (`templateOverrides`). This way queue definitions 
can be mixed and matched to serve multiple use-cases.

The Following are a few examples of agent queue templates.

#### GPU Queues

:::note
The GPU queues configuration and usage from the ClearML Enterprise Agent requires deploying the Nvidia GPU Operator 
on your Kubernetes cluster.
For more information, refer to the [GPU Operator](https://TODO) page.
:::

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

#### Override a Pod Template by Queue

In the following example:

- The `red` queue will inherit both the label `team=red` and the 1Gi memory limit from the `basePodTemplate` section.
- The `blue` queue will set the label `team=blue`, but will inherit the 1Gi memory from the `basePodTemplate` section.
- The `green` queue will set both the label `team=green` and a 2Gi memory limit. It will also set an annotation and an environment variable.

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

Once the ClearML Enterprise Agent is up and running, proceed with deploying the ClearML Enterprise App Gateway.

$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$

TODO link to the AI App Gateway page in documentation