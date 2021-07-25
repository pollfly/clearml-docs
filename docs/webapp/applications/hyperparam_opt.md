---
title: Hyperparameter Optimization
---

A UI wizard for performing optimization with ability to specify an optimization strategy, targets, parameter values and ranges, 
and experiment and time limits

This is a wizard to make it more accessible to execute hyperparameter optimization. Hyperparameter optimization is the process
of finding the parameters that create the best results in an experiment. ClearML supports hyperparameter optimization 
in its SDK (see [Hyperparameter Optimization](../../fundamentals/hpo.md))

$$$If I understand correctly, discrete parameters is to choose specific values 
to try out for a parameter, and uniform parameters to choose a range of parameter values and step size between. 

## Launching a hyperparameter optimization instance

To launch an AWS auto-scaler instance:
1. Go into the AWS Auto-Scaler App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
  - **Name** - App instance name 
  - **Base Task ID** - ID of the task whose hyperparameters are going to be optimized
  - **Optimization Strategy** - choose a strategy from a drop down menu (e.g. random, grid, Optuna)
  - **Concurrent Tasks** - maximum number of concurrent tasks
  - **Title** - title of metric to optimize
  - **Series** - series of metric to optimize
  - **Sign** - choose optimization goal, whether to maximize or minimize the metric value
  - **Queue** - queue to enqueue tasks to (make sure an agent/s is assigned to that queue) 
  - **Discrete Parameters** 
    - **Parameter** - parameter name (include section name, e.g. `Args/lr`)
    - **Values** - list specific values to try, separated by commas 
  - **Uniform Parameters**
    - **Parameter** - parameter name (include section name, e.g. `Args/batch_size`)
    - **Minimum Value** - minimum value of the parameter 
    - **Maximum Value** - maximum value of the parameter
    - **Step Size** - step size between parameter values
  - **Max Experiments** - maximum number of experiments per parameter search 
  - **Experiments to save** - number of last experiments to save
  - **Time Limit** - time limit (in minutes) per experiment
  - **Min Iterations** - minimum iterations per experiment
  - **Max iterations** - maximum iterations per experiment 

### Plots
Once launched, a few plots will appear in the app:
* Optimization objective  
* summary 
* budget
* Resources
* metrics

