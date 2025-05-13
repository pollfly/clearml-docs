---
title: Install CDMO and CFGI on the same Cluster
---

In clusters with multiple nodes with different GPU types, the `gpu-operator` can be used to manage different devices and 
fractioning modes.

## Configuring the NVIDIA GPU Operator

The NVIDIA `gpu-operator` allows defining multiple configurations for the Device Plugin.

The following YAML values define two usable configs as "mig" and "ts" (time-slicing).

``` yaml
migManager:
  enabled: false
mig:
  strategy: mixed
toolkit:
  env:
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_ENVVAR_WHEN_UNPRIVILEGED
      value: "false"
    - name: ACCEPT_NVIDIA_VISIBLE_DEVICES_AS_VOLUME_MOUNTS
      value: "true"
devicePlugin:
  enabled: true
  env:
    - name: PASS_DEVICE_SPECS
      value: "true"
    - name: FAIL_ON_INIT_ERROR
      value: "true"
    - name: DEVICE_LIST_STRATEGY
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
    default: "all-disabled"
    data:
      all-disabled: |-
        version: v1
        flags:
          migStrategy: none
      ts: |-
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
      mig: |-
        version: v1
        flags:
          migStrategy: mixed
```

## Usage

Previously defined configurations need to be applied to Kubernetes nodes using labels. After a label is added to a node, 
the NVIDIA `device-plugin` will automatically reconfigure it.

The following is an example using the previous configuration.

* Apply the MIG `mig` config:
  ``` bash
  kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=mig
  ```

* Apply the time slicing `ts` config:
  ``` bash
  kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=ts
  ```

* Apply the vanilla full GPUs `all-disabled` config:
  ``` bash
  kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=all-disabled
  ```

## Install CDMO and CFGI

After configuring the NVIDIA `gpu-operator` and labeling nodes, proceed with the standard [CDMO](cdmo.md) and [CFGI](cfgi.md) 
installation.

## Disabling

### Time Slicing

To toggle between time slicing and vanilla full GPUs, simply toggle the label value between `ts` and `all-disabled` using 
the `--overwrite` flag in kubectl.

### MIG

To disable MIG, follow these steps:

1. Ensure there are no more running workflows requesting any form of GPU on the Node(s) before re-configuring it.
2. Remove the CDMO label from the target Node(s) to disable the dynamic MIG reconfiguration.

    ``` bash
    kubectl label nodes <NODE_NAME> "cdmo.clear.ml/gpu-partitioning-"
    ```

3. Execute a shell into the `device-plugin-daemonset` Pod instance running on the target Node(s) and execute the following commands:

    ``` bash
    nvidia-smi mig -dci

    nvidia-smi mig -dgi

    nvidia-smi -mig 0
    ```

4. Label the target node to disable MIG.

    ``` bash
    kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=all-disabled --overwrite
    ```