---
title: Nvidia Clara
---

The Nvidia Clara Application is a GUI for creating an instance of Nvidia Clara quickly and painlessly--no setup required on your part!
[Nvidia Clara](https://developer.nvidia.com/clara) is a framework for data annotation, training, and deployment for medical 
applications. Use the application to specify configurations, and ClearML will do the rest the of the work.

## Launching an Nvidia Clara instance

To launch an Nvidia Clara instance:
1. Navigate to the Nvidia Clara App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:
    - **Name** - Name for the app instance
    - **Dataset task** -  ID of the dataset task that contains the data to be used 
    - **Training arch** - Insert architecture which training configuration will be based on 
    - **Config file** - If training architecture isn't chosen above, there is also an option to insert a configuration. 
    If a training architecture was chosen, skip this configuration, the training configuration file will be chosen based on 
    the architecture. 
    - **Environment file** - If you don't want to use the default environment file, input your own environment configurations  
    - **MMAR** - Medical Model Archive which defines a standard structure for organizing artifacts created during the model 
    development. framework to configure and enable model training environment. $$$$This one just suites the UNet and the container and data we are running. See [MMAR](https://docs.nvidia.com/clara/clara-train-sdk/pt/mmar.html).
    - **Set** - $$$$$$$$$$ Override variables, mostly MMAR_CKPT_DIR
        * DATASET_JSON  - The configuration file with annotated data used for model training and validation
        * MMAR_CKPT_DIR  - Directory for saving training results. It is always the “models” folder in the MMAR
    - **Execution queue** - Queue to enqueue app. Make sure that an agent is listening to the queue

    
Once the app is launched, some plots will appear:
* **Training scalars**
    * val_mean_dice
    * val_acc
    * train_loss
    * train_acc
* **Models Table** - Training model names and paths

Lower down on the page, there is a log with all of the app's console outputs. 