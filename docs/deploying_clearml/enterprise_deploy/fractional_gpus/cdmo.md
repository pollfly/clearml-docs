---
title: Managing GPU Fragments with ClearML Dynamic MIG Operator (CDMO)
---

This guide covers using GPU fragments in Kubernetes clusters using NVIDIA MIGs and
ClearML's Dynamic MIG Operator (CDMO). CDMO enables dynamic MIG (Multi-Instance GPU) configurations. 

This guide covers:
* Installing CDMO
* Enabling MIG mode on your cluster
* Managing GPU partitioning dynamically 

## Installation

### Requirements

* Install the NVIDIA `gpu-operator` using Helm. For instructions, see [Basic Deployment](../extra_configs/gpu_operator.md).

### Installing CDMO 

1. Create a `cdmo-values.override.yaml` file with the following content: 
 
   ```yaml
   imageCredentials:
     password: "<CLEARML_DOCKERHUB_TOKEN>"
   ```

1. Install the CDMO Helm Chart using the previous override file:

   ```bash
   helm install -n cdmo cdmo clearml-enterprise/clearml-dynamic-mig-operator --create-namespace -f cdmo-values.override.yaml
   ```

1. Enable the NVIDIA MIG support on your cluster by running the following command on all nodes with a MIG-supported GPU 
  (run it for each GPU `<GPU_ID>` on the host):

   ```bash
   nvidia-smi -mig 1
   ```

   :::note notes
   * A node reboot may be required if the command output indicates so.
   
   * For convenience, this command can be run from within the `nvidia-device-plugin-daemonset` pod running on the related node.
   :::

1. Label all MIG-enabled GPU nodes `<NODE_NAME>` from the previous step:

   ```bash
   kubectl label nodes <NODE_NAME> "cdmo.clear.ml/gpu-partitioning=mig"
   ```

## Disabling MIGs

To disable MIG mode and restore standard full-GPU access:

1. Ensure no running workflows are using GPUs on the target node(s).

2. Remove the CDMO label from the target node(s) to disable the dynamic MIG reconfiguration.

    ```bash
    kubectl label nodes <NODE_NAME> "cdmo.clear.ml/gpu-partitioning-"
    ```

3. Execute a shell into the `device-plugin-daemonset` pod instance running on the target node(s) and execute the following commands:

    ```bash
    nvidia-smi mig -dci

    nvidia-smi mig -dgi

    nvidia-smi -mig 0
    ```

4. Edit the `gpu-operator.override.yaml` file to restore full-GPU access: 

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
   
5. Upgrade the `gpu-operator`:

   ```bash
   helm upgrade -n gpu-operator gpu-operator nvidia/gpu-operator -f gpu-operator.override.yaml
   ```