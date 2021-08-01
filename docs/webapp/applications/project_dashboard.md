---
title: Project Dashboard
---

The Project Dashboard Application is a GUI for monitoring a project's progress and resource usage. The dashboard presents
useful information about a project, including:
* An aggregated view of the values of a metric over the dashboard's iterations
* GPU usage
* Worker usage
* Experiment status summary

In addition, the app supports Slack alerts for task failure.

![Project Dashboard](../../img/webapp_apps_dashboard.png) 

## Launching Project Dashboard App 

To launch a Project Dashboard instance:
1. Navigate to the Project Dashboard App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
    * **Name** - Name of app instance 
    * **Project** - Name of project to monitor
    * **Metric Title** - Title of metric to track
    * **Metric Series** - Series of metric to track
    * **Metric Sign** - Choose whether to track the metric's maximum or minimum value
    * **Refresh rate** - Dashboard's refresh rate in seconds
    * **Slack API Token** - Token for Slack workspace
    * **Channel** - Slack channel to send alerts to 
    * **Min iterations** - Minimum number of iterations to send Slack alert about failure. 
    
### Plots 

Once the app is launched, a few plots appear: 
* **Task status** - Pie chart of the task status percentages in the project
* **Tag summary** - Pie chart of the percentages of development experiments vs. agent experiments 
* **Experiments** - Number of tasks per status over iteration number 
* **Monitoring** - GPU utilization and GPU memory usage
* **Metric Monitoring** - Values of the specified metric over the dashboard's iterations
* **Active Workers** - Number active workers
* **Workers Table** - List of active workers