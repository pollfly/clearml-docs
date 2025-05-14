---
title: Install CDMO and CFGI on the same Cluster
---

In clusters with multiple nodes and varying GPU types, the `gpu-operator` can be used to manage different device configurations
and fractioning modes.

## Configuring the NVIDIA GPU Operator

The NVIDIA `gpu-operator` supports defining multiple configurations for the Device Plugin.

The following example YAML defines two configurations: "mig" and "ts" (time-slicing).

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

## Applying Configuration to Nodes

To activate a configuration, label the Kubernetes node accordingly. After a node is labeled, 
the NVIDIA `device-plugin` will automatically reload the new configuration.

Example usage:
  * Apply the `mig` (MIG mode) config:
    ``` bash
    kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=mig
    ```

  * Apply the `ts` (time slicing) config:
    ``` bash
    kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=ts
    ```

  * Apply the `all-disabled` (standard full GPU access) config:
    ``` bash
    kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=all-disabled
    ```

## Installing CDMO and CFGI

After configuring the NVIDIA `gpu-operator` and labeling nodes, proceed with the standard installations of [CDMO](cdmo.md) 
and [CFGI](cfgi.md).

## Disabling Configurations 

### Time Slicing

To switch between time-slicing and full GPU access, update the node label using the `--overwrite` flag:

### MIG

To disable MIG mode:

1. Ensure there are no more running workflows requesting any form of GPU on the node(s) before re-configuring it.
2. Remove the CDMO label from the target node(s) to disable the dynamic MIG reconfiguration.

    ``` bash
    kubectl label nodes <NODE_NAME> "cdmo.clear.ml/gpu-partitioning-"
    ```

3. Execute a shell in the `device-plugin-daemonset` Pod instance running on the target node(s) and execute the following commands:

    ``` bash
    nvidia-smi mig -dci

    nvidia-smi mig -dgi

    nvidia-smi -mig 0
    ```

4. Relabel the target node to disable MIG:

    ``` bash
    kubectl label node <NODE_NAME> nvidia.com/device-plugin.config=all-disabled --overwrite
    ```