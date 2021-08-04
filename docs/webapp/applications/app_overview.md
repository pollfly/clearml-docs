---
title: ClearML Applications
---

ClearML Applications are a new, experimental approach for extending ClearML functionality.
The applications are a collection of wizards that offer a variety of functionalities where users don't have to 
handle code. Allowing you to take any Task in the system and make it an "application" (a python script running on one of the service agents), 
with the ability to configure it with a wizard, and allow you to add reports as well (with the same Task logger interface).


![ClearML Applications main page](../../img/webapp_apps_overview.png)

The applications include:
* [AWS auto-scaler](aws_auto_scaler.md) - Optimize AWS EC2 instance scaling according to the instance types and budget configured 
* [Hyperparameter optimization](hyperparam_opt.md) - Perform optimization with ability to specify an optimization strategy, 
  targets, parameter values and ranges, and experiment and time limits
* [Nvidia Clara](nvidia_clara.md) - Create an instance of Clara, Nvidia's framework for healthcare and life sciences developers
* [Project Dashboard](project_dashboard.md) - Monitor a project's progress, a metric’s statistics, and GPU and worker usage. The app also supports Slack alerts for task failure. 

## App layout

Once entering an app, the app is split into a left column and the main section of the app. 

In the left column of the app appears a list of all the **APP INSTANCES** that were launched. From there, new instances can 
be created and [app actions](#app-actions) can be accessed.

When an app instance is chosen on the list on the left, app results appear on the main part of the 
page. Once an app is launched, the page presents information about the instance, including
plots and console logs. 

## App actions

Hover over an app instance in the instance list, and click the menu button <img src="/docs/latest/icons/ico-dots-v-menu.svg" alt="dots menu" className="icon size-sm space-sm" /> 
that appears in order to access app actions. 

|button|action|
|--|--|
|<img src="/docs/latest/icons/ico-settings.svg" alt="settings" className="icon size-sm space-sm" /> | See the instance configurations and update configurations |
|<img src="/docs/latest/icons/ico-status-aborted.svg" alt="stop" className="icon size-sm space-sm" /> |Abort instance |
|<img src="/docs/latest/icons/ico-clone.svg" alt="clone" className="icon size-sm space-sm" /> | Clone instance |
|<img src="/docs/latest/icons/ico-trash.svg" alt="garbage" className="icon size-sm space-sm" />|Delete instance |


