---
title: ClearML Fractional GPU Injector (CFGI)
---

The **ClearML Enterprise Fractional GPU Injector** (CFGI) allows AI workloads to run on Kubernetes using non-MIG GPU 
fractions, optimizing both hardware utilization and performance.

## Installation

### Add the Local ClearML Helm Repository

``` bash
helm repo add clearml-enterprise https://raw.githubusercontent.com/clearml/clearml-enterprise-helm-charts/gh-pages --username <GITHUB_TOKEN> --password <GITHUB_TOKEN>
helm repo update
```

### Requirements

* Install the official NVIDIA `gpu-operator` using Helm with one of the following configurations.
* The number of slices must be 8.
* Add and update the Nvidia Helm repo:

  ``` bash
  helm repo add nvidia https://nvidia.github.io/gpu-operator
  helm repo update
  ```

#### GPU Operator Configuration

##### For CFGI Version >= 1.3.0

1. Create a docker-registry secret named `clearml-dockerhub-access` in the `gpu-operator` Namespace, making sure to replace your `<CLEARML_DOCKERHUB_TOKEN>`:

  ```bash
  kubectl create secret -n gpu-operator docker-registry clearml-dockerhub-access \
    --docker-server=docker.io \
    --docker-username=allegroaienterprise \
    --docker-password="<CLEARML_DOCKERHUB_TOKEN>" \
    --docker-email=""
  ```

1. Create a `gpu-operator.override.yaml` file as follows:
  * Set `devicePlugin.repository` to `docker.io/clearml` 
  * Configure `devicePlugin.config.data.renamed-resources.sharing.timeSlicing.resources` for each GPU index on the host
  * Use `nvidia.com/gpu-<INDEX>` format for the `rename` field, and set `replicas` to `8`.

```yaml
gfd:
  imagePullSecrets:
    - "clearml-dockerhub-access"
toolkit:
  env:
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_ENVVAR_WHEN_UNPRIVILEGED
      value: "false"
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_AS_VOLUME_MOUNTS
      value: "true"
devicePlugin:
  repository: docker.io/clearml
  image: k8s-device-plugin
  version: v0.17.1-gpu-card-selection
  imagePullPolicy: Always
  imagePullSecrets:
    - "clearml-dockerhub-access"
  env:
    - name: PASS_DEVICE_SPECS
      value: "true"
    - name: FAIL_ON_INIT_ERROR
      value: "true"
    - name: DEVICE_LIST_STRATEGY # Use volume-mounts
      value: volume-mounts
    - name: DEVICE_ID_STRATEGY
      value: uuid
    - name: NVIDIA_VISIBLE_DEVICES
      value: all
    - name: NVIDIA_DRIVER_CAPABILITIES
      value: all
  config:
    name: device-plugin-config
    create: true
    default: "renamed-resources"
    data:
      renamed-resources: |-
        version: v1
        flags:
          migStrategy: none
        sharing:
          timeSlicing:
            renameByDefault: false
            failRequestsGreaterThanOne: false
            # Edit the following configuration as needed, adding as many GPU indices as many cards are installed on the Host.
            resources:
            - name: nvidia.com/gpu
              rename: nvidia.com/gpu-0
              devices:
              - "0"
              replicas: 8
            - name: nvidia.com/gpu
              rename: nvidia.com/gpu-1
              devices:
              - "1"
              replicas: 8
```

##### For CFGI version < 1.3.0 (Legacy GPU Operator)

Create a `gpu-operator.override.yaml` file:

``` yaml
toolkit:
  env:
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_ENVVAR_WHEN_UNPRIVILEGED
      value: "false"
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_AS_VOLUME_MOUNTS
      value: "true"
devicePlugin:
  env:
    - name: PASS_DEVICE_SPECS
      value: "true"
    - name: FAIL_ON_INIT_ERROR
      value: "true"
    - name: DEVICE_LIST_STRATEGY # Use volume-mounts
      value: volume-mounts
    - name: DEVICE_ID_STRATEGY
      value: uuid
    - name: NVIDIA_VISIBLE_DEVICES
      value: all
    - name: NVIDIA_DRIVER_CAPABILITIES
      value: all
  config:
    name: device-plugin-config
    create: true
    default: "any"
    data:
      any: |-
        version: v1
        flags:
          migStrategy: none
        sharing:
          timeSlicing:
            renameByDefault: false
            failRequestsGreaterThanOne: false
            resources:
              - name: nvidia.com/gpu
                replicas: 8
```

### Install

Install the nvidia `gpu-operator` using the previously created `gpu-operator.override.yaml` override file:

```bash
helm install -n gpu-operator gpu-operator nvidia/gpu-operator --create-namespace -f gpu-operator.override.yaml
```

Create a `cfgi-values.override.yaml` file with the following content:

```yaml
imageCredentials:
  password: "<CLEARML_DOCKERHUB_TOKEN>"
```

Install the CFGI Helm Chart using the previous override file:

```bash
helm install -n cfgi cfgi clearml-enterprise/clearml-fractional-gpu-injector --create-namespace -f cfgi-values.override.yaml
```

## Usage

Fractional GPU Injector will inject CUDA files on pods that have the following label:

```yaml
labels:
  clearml-injector/fraction: "<GPU_FRACTION_VALUE>"
```

where `"<GPU_FRACTION_VALUE>"` must be equal one of following values:

* "0.0625" (1/16th)
* "0.125" (1/8th)
* "0.250"
* "0.375"
* "0.500"
* "0.625"
* "0.750"
* "0.875"

Valid values for `"<GPU_FRACTION_VALUE>"` include integer representation of GPUs such as `1.000` or `2` or `2.0` etc.

### ClearML Enterprise Agent Configuration

In order to specify resource allocation when using the CFGI, the following values configuration should be set in `clearml-agent-values.override.yaml`.

The label `clearml-injector/fraction: "<GPU_FRACTION_VALUE>"` is required in order to specify a fraction of the GPU to be 
assigned to the pod started for a task pulled from the respective queue.

#### CFGI Version >= 1.3.0

Starting from version 1.3.0, there is no need to specify the resources field.

``` yaml
agentk8sglue:
  createQueues: true
  queues:
    gpu-fraction-1_000:
      templateOverrides:
        labels:
          clearml-injector/fraction: "1.000"
    gpu-fraction-0_500:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.500"
    gpu-fraction-0_250:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.250"
    gpu-fraction-0_125:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.125"
```

#### CFGI Version < 1.3.0

```yaml
agentk8sglue:
  createQueues: true
  queues:
    gpu-fraction-1_000:
      templateOverrides:
        resources:
          limits:
            nvidia.com/gpu: 8
    gpu-fraction-0_500:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.500"
        resources:
          limits:
            nvidia.com/gpu: 4
    gpu-fraction-0_250:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.250"
        resources:
          limits:
            nvidia.com/gpu: 2
    gpu-fraction-0_125:
      templateOverrides:
        labels:
          clearml-injector/fraction: "0.125"
        resources:
          limits:
            nvidia.com/gpu: 1
```

## Upgrading Chart

### Upgrades / Values Upgrades

To update to the latest version of this chart:

```bash
helm repo update
helm upgrade -n cfgi cfgi clearml-enterprise/clearml-fractional-gpu-injector
```

To change values on an existing installation:

```bash
helm upgrade -n cfgi cfgi clearml-enterprise/clearml-fractional-gpu-injector -f cfgi-values.override.yaml
```

## Disable Fractions

To toggle between timeSlicing and vanilla full GPUs, remove the `devicePlugin.config` section from the `gpu-operator.override.yaml` 
file and upgrade the `gpu-operator`:

```yaml
toolkit:
  env:
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_ENVVAR_WHEN_UNPRIVILEGED
      value: "false"
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_AS_VOLUME_MOUNTS
      value: "true"
devicePlugin:
  env:
    - name: PASS_DEVICE_SPECS
      value: "true"
    - name: FAIL_ON_INIT_ERROR
      value: "true"
    - name: DEVICE_LIST_STRATEGY # Use volume-mounts
      value: volume-mounts
    - name: DEVICE_ID_STRATEGY
      value: uuid
    - name: NVIDIA_VISIBLE_DEVICES
      value: all
    - name: NVIDIA_DRIVER_CAPABILITIES
      value: all
```