---
title: Hyperparameter Optimization
---

The Hyperparameter Optimization Application is a GUI for finding the parameters that create the best results in an experiment--without
handling any code! 

Use the app's wizard to specify an optimization strategy, targets, parameter values and ranges, 
and experiment and time limits. Then the app does the rest: enqueueing clones of the base task with different parameter values, 
then monitoring the results in order to find the optimal parameter values.

![Hyperparameter Optimization App](../../img/webapp_apps_hpo.png)

## Launching a Hyperparameter Optimization App Instance

To launch a Hyperparameter Optimization instance:
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
    - **App Instance Name** - Name that will appear in the **APP INSTANCE** list 
    - **Base Task ID** - ID of the task whose hyperparameters will be optimized
    - **Target Project** - Name of project where optimization tasks will be saved. If the project doesn't exist, it will 
      be created on-the-fly
    - **Optimization Strategy** - Choose an optimization framework or strategy from the drop down menu (e.g. random, 
      grid, Optuna)
    - **Concurrent Tasks** - Maximum number of concurrent tasks
    - **Metric Title** - Title of metric to optimize
    - **Metric Series** - Metric series (variant) to optimize
    - **Optimization Objective** - Choose the optimization target, whether to maximize or minimize the value of the metric
      specified above
    - **Execution Queue** - Queue for enqueuing optimization tasks (make sure an agent is assigned to that queue) 
    - **Discrete Parameters** - A list of discrete parameters and values to sample
        - **Parameter** - Parameter name. Include section name (e.g. `Args/lr`)
        - **Values** - Parameter values to sample, separated by commas 
    - **Uniform Parameters** - A list of parameter ranges to sample
        - **Parameter** - Parameter name. Include section name (e.g. `Args/batch_size`)
        - **Minimum Value** and **Maximum Value** of parameter
        - **Step Size** - Step size between parameter values
    - **Max Experiments** - Maximum total number of optimization experiments 
    - **Experiments to Save** - Number of best performing experiments to save (the rest are archived).
    - **Time Limit** - Time limit per experiment (in minutes)
    - **Min Iterations** - Minimum iterations per experiment before stopping
    - **Max Iterations** - Maximum iterations per experiment 
    - **Max Optimization Time** - Max time in minutes of whole optimization process (leave empty for no time limit)
1. Click **LAUNCH NEW**

### Plots
Once launched, a few plots will appear in the app:
* **Optimization Metric** - Last reported and maximum / minimum values of objective metric, over iteration number
* **Optimization Objective** -  Scatter plot presenting the values of the metric being maximized / minimized, over iteration number
* **Summary** - Tabular summary of the optimization results, which includes the metric and parameter values. 
* **Budget** - Remaining budget percentages for compute time, iterations, and jobs  
* **Resources** - Number of workers listening to the execution queue, and the number of running tasks over iteration number 


