ðŸŸ¡ Ready, missing link
---
TODO:
- Link: fractional GPUs

---

# Basic Deployment - Suggested GPU Operator Values

## Add the Helm Repo Locally

Add the ClearML Helm repository:
``` bash
helm repo add nvidia https://nvidia.github.io/gpu-operator
```

Update the repository locally:
``` bash
helm repo update
```

## Installation

As mentioned by NVIDIA, this configuration is needed to prevent unprivileged containers from bypassing the Kubernetes Device Plugin API.

Create a `gpu-operator.override.yaml` file with the following content:

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
```

Install the gpu-operator:

``` bash
helm install -n gpu-operator gpu-operator nvidia/gpu-operator --create-namespace -f gpu-operator.override.yaml
```

# Fractioning

For fractional GPU support, refer to the dedicated guides.

TODO link to the fractional_gpus directory page in documentation