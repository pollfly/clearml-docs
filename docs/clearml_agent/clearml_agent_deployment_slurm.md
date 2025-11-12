---
title: Slurm
---

:::important Enterprise Feature
Slurm Glue is available under the ClearML Enterprise plan.
:::

Agents can be deployed inside [`Singularity`](https://docs.sylabs.io/guides/3.5/user-guide/introduction.html) 
containers in Linux clusters managed with Slurm. 

ClearML Agent Slurm Glue maps jobs to Slurm batch scripts: associate a ClearML queue to a batch script template, then 
when a Task is pushed into the queue, it will be converted and executed as an `sbatch` job according to the sbatch 
template specification attached to the queue. 

1. Install the Slurm Glue on a machine where you can run `sbatch` / `squeue` etc. 
   
   ```
   pip3 install -U --extra-index-url https://*****@*****.allegro.ai/repository/clearml_agent_slurm/simple clearml-agent-slurm
   ```
   
   :::tip Python repository credentials
   Your credentials for `--extra-index-url` are available in the WebApp under the **Help** menu  <img src="/docs/latest/icons/ico-help-outlined.svg" alt="Help menu" className="icon size-md space-sm" /> **>** 
   **ClearML Python Package setup** **>** **Install** step.
   :::

1. Create a batch template. Make sure to set the `SBATCH` variables to the resources you want to attach to the queue. 
   The script below sets up an agent to run bare-metal, creating a virtual environment per job. For example:

   ```
   #!/bin/bash
   # available template variables (default value separator ":")
   # ${CLEARML_QUEUE_NAME}
   # ${CLEARML_QUEUE_ID}
   # ${CLEARML_WORKER_ID}.
   # complex template variables  (default value separator ":")
   # ${CLEARML_TASK.id}
   # ${CLEARML_TASK.name}
   # ${CLEARML_TASK.project}
   # ${CLEARML_TASK.hyperparams.properties.user_key.value}
   # ${CLEARML_TASK.container.image}
   # ${CLEARML_TASK.container.arguments}
   
   # example
   #SBATCH --job-name=clearml_task_${CLEARML_TASK.id}       # Job name DO NOT CHANGE
   #SBATCH --ntasks=1                    # Run on a single CPU
   # #SBATCH --mem=1mb                   # Job memory request
   # #SBATCH --time=00:05:00             # Time limit hrs:min:sec
   #SBATCH --output=task-${CLEARML_TASK.id}-%j.log
   #SBATCH --partition debug
   #SBATCH --cpus-per-task=1
   #SBATCH --priority=5
   #SBATCH --nodes=${CLEARML_TASK.hyperparams.properties.num_nodes.value:1}
   
   
   ${CLEARML_PRE_SETUP}
   
   # control how multi node resource monitoring is reported
   # -1: only master node (rank zero) is reporting console/resources
   # 1: graph per node, i.e. machine/gpu graph for every node (console reported with prefix RANK x)
   # 2: series per node under a unified machine resource graph,
   #    graph per type of resource e.g. cpu/gpu utilization (console reported with prefix RANK x)
   export CLEARML_MULTI_NODE_SINGLE_TASK=1
   
   echo whoami $(whoami)
   
   ${CLEARML_AGENT_EXECUTE}
   
   ${CLEARML_POST_SETUP}
   ```

   Notice: If you are using Slurm with Singularity container support replace `${CLEARML_AGENT_EXECUTE}` in the batch 
   template with `singularity exec ${CLEARML_AGENT_EXECUTE}`. For additional required settings, see [Slurm with Singularity](#slurm-with-singularity).

   :::tip 
   You can override the default values of a Slurm job template via the ClearML Web UI. The following command in the 
   template sets the `nodes` value to be the ClearML Task’s `num_nodes` user property:  
   ```
   #SBATCH --nodes=${CLEARML_TASK.hyperparams.properties.num_nodes.value:1}
   ```
   This user property can be modified in the UI, in the task's **CONFIGURATION > User Properties** section, and when the 
   task is executed the new modified value will be used. 
   ::: 

3. Launch the ClearML Agent Slurm Glue and assign the Slurm configuration to a ClearML queue. For example, the following 
   associates the `default` queue to the `slurm.example.template` script, so any jobs pushed to this queue will use the 
   resources set by that script.  
   ```
   clearml-agent-slurm --template-files slurm.example.template --queue default
   ```
   
   You can also pass multiple templates and queues. For example:
   ```
   clearml-agent-slurm --template-files slurm.template1 slurm.template2 --queue queue1 queue2
   ```
   
   :::tip Debug mode
   To enable debug logging for the ClearML Agent Slurm Glue, set the `CLEARML_SLURM_GLUE_DEBUG=1` environment variable 
   before launching.
   :::


## Slurm with Singularity
If you are running Slurm with Singularity containers support, set the following:

1. Create a batch template. Make sure your `sbatch` template contains:
   ```
   singularity exec ${CLEARML_AGENT_EXECUTE}
   ```
   You can also add additional Singularity arguments as needed. For example:
   ```
   singularity exec --uts ${CLEARML_AGENT_EXECUTE}
   ```
   Here is a complete example template:

   ```bash
   #!/bin/bash
   # available template variables (default value separator ":")
   # ${CLEARML_QUEUE_NAME}
   # ${CLEARML_QUEUE_ID}
   # ${CLEARML_WORKER_ID}.
   # complex template variables  (default value separator ":")
   # ${CLEARML_TASK.id}
   # ${CLEARML_TASK.name}
   # ${CLEARML_TASK.project}
   # ${CLEARML_TASK.hyperparams.properties.user_key.value}
   # ${CLEARML_TASK.container.image}
   # ${CLEARML_TASK.container.arguments}
   
   # example
   #SBATCH --job-name=clearml_task_${CLEARML_TASK.id}       # Job name DO NOT CHANGE
   #SBATCH --ntasks=1                    # Run on a single CPU
   # #SBATCH --mem=1mb                   # Job memory request
   # #SBATCH --time=00:05:00             # Time limit hrs:min:sec
   #SBATCH --output=task-${CLEARML_TASK.id}-%j.log
   #SBATCH --partition debug
   #SBATCH --cpus-per-task=1
   #SBATCH --priority=5
   #SBATCH --nodes=${CLEARML_TASK.hyperparams.properties.num_nodes.value:1}
   
   
   ${CLEARML_PRE_SETUP}
   
   # control how multi node resource monitoring is reported
   # -1: only master node (rank zero) is reporting console/resources
   # 1: graph per node, i.e. machine/gpu graph for every node (console reported with prefix RANK x)
   # 2: series per node under a unified machine resource graph,
   #    graph per type of resource e.g. cpu/gpu utilization (console reported with prefix RANK x)
   export CLEARML_MULTI_NODE_SINGLE_TASK=1
   
   echo whoami $(whoami)
   
   srun singularity exec ${CLEARML_AGENT_EXECUTE}
   
   ${CLEARML_POST_SETUP}
   ``` 
1. Set the default Singularity container to use in your [clearml.conf](../configs/clearml_conf.md) file:
   ```
   agent.default_docker.image="shub://repo/hello-world"
   ```
   Or
   ```
   agent.default_docker.image="docker://ubuntu"
   ```

1. Launch the ClearML Agent Slurm Glue and assign the Slurm configuration to a ClearML queue. Make sure to add
   `--singularity-mode` to the command line. For example, the following 
   associates the `default` queue to the `slurm.example_singularity.template` script, so any jobs pushed to this queue will use the 
   resources set by that script.  

   ```
   clearml-agent-slurm --singularity-mode --template-files slurm.example_singularity.template --queue default
   ```
