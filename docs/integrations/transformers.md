---
title: Transformers
---

HuggingFace's [Transformers](https://huggingface.co/docs/transformers/index) is a popular deep learning framework. You can 
seamlessly integrate ClearML into your Transformer's PyTorch [Trainer](https://huggingface.co/docs/transformers/v4.34.1/en/main_classes/trainer) 
code using the built-in [`ClearMLCallback`](https://huggingface.co/docs/transformers/v4.34.1/en/main_classes/callback#transformers.integrations.ClearMLCallback). 
ClearML automatically logs Transformer's models, parameters, scalars, and more. 

All you have to do is install and set up ClearML:

1. Install the `clearml` Python package:

   ```commandline
   pip install clearml
   ``` 
   
1. To keep track of your tasks and/or data, ClearML needs to communicate to a server. You have 2 server options:
    * Sign up for free to the [ClearML Hosted Service](https://app.clear.ml/) 
    * Set up your own server, see [here](../deploying_clearml/clearml_server.md).  
1. Connect the ClearML SDK to the server by creating credentials (go to the top right in the UI to **Settings > Workspace > Create new credentials**), 
   then execute the command below and follow the instructions:

   ```commandline
   clearml-init
   ```
    
That's it! In every training run from now on, the ClearML task 
manager will capture:
* Source code and uncommitted changes
* Hyperparameters - PyTorch trainer [parameters](https://huggingface.co/docs/transformers/v4.34.1/en/main_classes/trainer#transformers.TrainingArguments)
and TensorFlow definitions
* Installed packages
* Model files (make sure the `CLEARML_LOG_MODEL` environment variable is set to `True`)
* Scalars (loss, learning rates)
* Console output
* General details such as machine details, runtime, creation date etc.
* And more

All of this is captured into a [ClearML Task](../fundamentals/task.md). By default, a task called `Trainer` is created 
in the `HuggingFace Transformers` project. To change the task's name or project, use the `CLEARML_PROJECT` and `CLEARML_TASK`
environment variables

:::tip project names 
ClearML uses `/` as a delimiter for subprojects: using `example/sample` as a name will create the `sample` 
task within the `example` project. 
:::

To log the models created during training, set the `CLEARML_LOG_MODEL` environment variable to `True`. 

You can see all the captured data in the task's page of the ClearML [WebApp](../webapp/webapp_exp_track_visual.md). 

![transformers scalars](../img/integrations_transformers_scalars.png#light-mode-only)
![transformers scalars](../img/integrations_transformers_scalars_dark.png#dark-mode-only)

Additionally, you can view all of your Transformers runs tracked by ClearML in the [Task Table](../webapp/webapp_model_table.md). 
Add custom columns to the table, such as mAP values, so you can easily sort and see what is the best performing model. 
You can also select multiple tasks and directly [compare](../webapp/webapp_exp_comparing.md) them.   

See an example of Transformers and ClearML in action [here](../guides/frameworks/huggingface/transformers.md). 

## Remote Execution
ClearML logs all the information required to reproduce a task run on a different machine (installed packages, 
uncommitted changes etc.). The [ClearML Agent](../clearml_agent.md) listens to designated queues and when a task is 
enqueued, the agent pulls it, recreates its execution environment, and runs it, reporting its scalars, plots, etc. to the 
task manager.

Deploy a ClearML Agent onto any machine (e.g. a cloud VM, a local GPU machine, your own laptop) by simply running 
the following command on it:

```commandline
clearml-agent daemon --queue <queues_to_listen_to> [--docker]
```

Use the ClearML [Autoscalers](../cloud_autoscaling/autoscaling_overview.md) to help you manage cloud workloads in the 
cloud of your choice (AWS, GCP, Azure) and automatically deploy ClearML agents: the autoscaler automatically spins up 
and shuts down instances as needed, according to a resource budget that you set.


### Reproducing Tasks

![Cloning, editing, enqueuing gif](../img/gif/integrations_yolov5.gif#light-mode-only)
![Cloning, editing, enqueuing gif](../img/gif/integrations_yolov5_dark.gif#dark-mode-only)

Use ClearML's web interface to reproduce tasks and edit their details, like hyperparameters or input models, then execute the tasks 
with the new configuration on a remote machine.

When ClearML is integrated into a script, it captures and stores configurations, such as hyperparameters 
and model settings. When executing a task, the ClearML Agent will, by default, override runtime configuration values 
(such as hyperparameters and environment variables) with the values specified in the task.

However, for tasks using Transformers, the default behavior is different. By default, Transformers tasks ignore UI 
overrides and use execution-time parameters (such as environment variables).  This is done to prevent potential issues 
with environment-specific settings when running tasks on different machines. 

**To rerun a task with modified configuration:**
1. Clone the task
1. Edit the hyperparameters and/or other details. 
1. In the **CONFIGURATION > HYPERPARAMETERS > Transformers** section, set both `_ignore_hparams_ui_overrides_` and `_ignore_model_config_ui_overrides_` 
   to `False` . This allows the task to use the new hyperparameter and model
   configuration values respectively during execution.
1. Enqueue the task

The ClearML Agent executing the task will use the new values to [override any hard coded values](../clearml_agent.md). 

## Hyperparameter Optimization
Use ClearML's [`HyperParameterOptimizer`](../references/sdk/hpo_optimization_hyperparameteroptimizer.md) class to find 
the hyperparameter values that yield the best performing models. See [Hyperparameter Optimization](../getting_started/hpo.md) 
for more information.
