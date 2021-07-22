---
title: Nvidia Clara
---

[Nvidia Clara](https://developer.nvidia.com/clara) is a framework for data annotation, training, and deployment for medical 
applications. 

Use the application to specify configurations, and ClearML will do the rest and create an instance of Nvidia Clara 
quickly and painlessly--no setup required on your part!

## Creating an Nvidia Clara instance

On the left side of the app's page. There is a section that says **APP INSTANCES**, on the top of the list, press the **+** 
icon to create a new instance, then a form pops up. 

* Name - Name for your app
* Dataset task -  Insert a dataset task ID from which the instance will take the data 
* Training arch - Insert training configuration based on architecture (currently, only UNET is supported)
* Config file - If you don't choose a training architecture, there is also an option to insert the configuration you like 
  in this section. If you choose a training architecture, it will choose the training configuration file for you, and you can 
  skip this section
* Environment file - Json script. If you don't want to use the default environment file, you can input your own environment configurations. 
* MMAR - THIS IS SOME FOLDER THAT NEEDS TO BE DEFINED. Medical Model Archive which defines a standard structure for organizing artifacts created from model development. This one just suites the UNet and the container and data we are running
* Set - $$$$$$$$$$
* Execution queue - choose where to enqueue your app. Make sure that an agent is listening to the queue, so it will execute 
the app. 

* Create a new app for Nvidia Clara:
  * add plots with information.
  * All variables should be part of the CONFIGURATION tab. 
  * add new nvidia_clara.conf.app file
* Clara runs on clara docker, 
* Mmar - folder that needs to be defined
* In task - can see the scalars.


Once the app is launched, plots will appear on most of the pages. Plots that present training scalars.
Additionally, lower down on the page, there will be a console log. 
