---
title: Project Dashboard
---

The Project Dashboard Application provides overviews of projects' progress. 
Once an app instance is launch, its dashboard presents useful information about a project, including:
* An aggregated view of the values of a metric over the dashboard's iterations
* GPU usage
* Worker usage
* Experiment status summary

In addition, the app supports Slack alerts for task failure.

![Project Dashboard](../../img/webapp_apps_dashboard.png) 

## Launching Project Dashboard App Instance 

To launch a Project Dashboard instance:
1. Navigate to the Project Dashboard App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
    * **App Instance Name** 
    * **Project** - Name of project to monitor
    * **Metric Title** - Title of metric to track
    * **Metric Series** - Metric series (variant) to track
    * **Metric Sign** - Choose whether to track the metric's maximum or minimum value
    * **Refresh Rate** - Dashboard's refresh rate in seconds
    * **Slack API Token** - Token for Slack workspace for the purpose of sending alerts about task failure (optional)
    * **Channel** - Slack channel to receive task failure alerts (optional) 
    * **Min Iterations** - Minimum iterations to trigger Slack alerts about task failure
   
### Plots 

Once the app is launched, a few plots appear in the dashboard: 
* **Task Status** - Pie chart of the task status percentages in the project
* **Tag Summary** - Pie chart of the percentages of development experiments vs. agent experiments 
* **Experiments** - Number of tasks per status over iteration number 
* **Monitoring** - GPU utilization and GPU memory usage
* **Metric Monitoring** - Values of the specified metric over the dashboard's iterations
* **Active Workers** - Number active workers
* **Workers Table** - List of active workers