---
title: Basic Deployment - Suggested GPU Operator Values
---


## Add the Helm Repo Locally

Add the NVIDIA GPU Operator Helm repository:
```bash
helm repo add nvidia https://nvidia.github.io/gpu-operator
```

Update the repository locally:
```bash
helm repo update
```

## Installation

To prevent unprivileged containers from bypassing the Kubernetes Device Plugin API, configure the GPU operator with the 
following override values.

Create a `gpu-operator.override.yaml` file with the following content:

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

Install the `gpu-operator`:

``` bash
helm install -n gpu-operator gpu-operator nvidia/gpu-operator --create-namespace -f gpu-operator.override.yaml
```

## Fractional GPU Support

For support with fractional GPUs, refer to the dedicated guides:
* [ClearML Dynamic MIG Operator](../fractional_gpus/cdmo.md) (CDMO) – Dynamically configures MIG GPUs on supported devices.
* [ClearML Enterprise Fractional GPU Injector](../fractional_gpus/cfgi.md) (CFGI) – Enables fractional (non-MIG) GPU 
  allocation for better hardware utilization and workload distribution in Kubernetes.
* [CDMO and CFGI on the same Cluster](../fractional_gpus/cdmo_cfgi_same_cluster.md) - In clusters with multiple nodes and 
  varying GPU types, the `gpu-operator` can be used to manage different device configurations and fractioning modes.