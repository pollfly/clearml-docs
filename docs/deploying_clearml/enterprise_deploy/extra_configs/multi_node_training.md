---
title: Multi-Node Training
--- 

The ClearML Enterprise Agent supports horizontal multi-node training, allowing a single Task to run across multiple pods 
on different nodes.

Below is a configuration example using `clearml-agent-values.override.yaml`:

```yaml
agentk8sglue:
  # Cluster access is required to run multi-node Tasks
  serviceAccountClusterAccess: true
  multiNode:
    enabled: true
  createQueues: true
  queues:
    multi-node-example:
      queueSettings:
        # Defines the distribution of GPUs Tasks across multiple nodes. The format [x, y, ...] specifies the distribution of Tasks as 'x' GPUs on a node and 'y' GPUs on another node. Multiple Pods will be spawned respectively based on the lowest-common-denominator defined.
        multiNode: [ 4, 2 ]
      templateOverrides:
        resources:
          limits:
            # Note you will need to use the lowest-common-denominator of the GPUs distribution defined in `queueSettings.multiNode`.
            nvidia.com/gpu: 2
```