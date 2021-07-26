---
title: Project Dashboard
---

Project Dashboard Application - UI for monitoring a project's progress, a metric’s statistics, and GPU and worker usage. 
The app also supports Slack alerts for task failure.

![Project Dashboard App](../../img/webapp_apps_hpo.png)

The dashboard app is supposed to show useful info about a project. It is ALSO about tracking metric (or metrics, later on), 
but also how many GPUs it's using, how many workers and so on. It's a dashboard for your project that shows useful information

To launch a Project Dashboard instance:
1. Navigate to the Project Dashboard App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
    * **Name** - app instance name
    * **Project** - name of project to monitor
    * **Metric Title**
    * **Metric Series**
    * **Metric Sign** - choose whether to track the metric's maximum or minimum value
    * **Refresh rate** - Dashboard's refresh rate in seconds
    * **Slack API  Token** - Token for Slack workspace
    * **Channel** - Slack channel to send alerts to 
    * **Min iterations** - minimum number of iterations to warn about failure. 
    
Once the app launched, a few plots appear: 
* **Task status** - pie chart of the task status percentages in the project
* **Tag summary** - pie chart of tag percentages in the projects
* **Experiments** - Plot of tasks and their statuses$$$ 
* **Monitoring** - Monitoring of GPU utilization and GPU memory usage
* **Metric Monitoring** - Monitoring of the specified metric throughout the project's experiments
* **Active Workers** - presents the number of active workers
* **Workers Table** - presents a list of the workers