---
title: Nvidia Clara
---

[Nvidia Clara](https://developer.nvidia.com/clara) is a framework for data annotation, training, and deployment for medical 
applications. $$makes it easy to get started with AI by providing tools that make annotation, training, deployment seamless for 
medical applications. 

Use the application to specify configurations, and ClearML will do the rest and create an instance of Nvidia Clara 
quickly and painlessly--no setup required on your part!

## Launching an Nvidia Clara instance

To launch an Nvidia Clara instance:
1. Navigate to the Nvidia Clara App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
  - **Name** - Name for the app instace
  - **Dataset task** -  Insert the ID of dataset task that contains the data 
  - **Training arch** - Insert training configuration based on architecture (currently, only UNET is supported)
  - **Config file** - If you don't choose a training architecture, there is also an option to insert the configuration you like 
  in this section. If you choose a training architecture, it will choose the training configuration file for you, and you can 
  skip this section
  - **Environment file** - JSON script. If you don't want to use the default environment file, you can input your own environment configurations. 
  - **MMAR** - Medical Model Archive which defines a standard structure for organizing artifacts created during the model 
    development. framework to configure and enable model training environment. $$$$This one just suites the UNet and the container and data we are running. See [MMAR](https://docs.nvidia.com/clara/clara-train-sdk/pt/mmar.html).
  - **Set** - $$$$$$$$$$
    * DATASET_JSON  - The configuration file with annotated data used for model training and validation
    * MMAR_CKPT_DIR  - Directory for saving training results. Always the “models” folder in the MMAR
  - **Execution queue** - choose where to enqueue your app. Make sure that an agent is listening to the queue, so it will execute 
the app.



Once the app is launched, plots will appear on most of the pages. Plots that present training scalars.
Additionally, lower down on the page, there will be a console log.