---
title: LLM UI
---

:::important Enterprise Feature
The LLM UI applications is available under the ClearML Enterprise plan.
::: 

Use the ClearML LLM UI application to launch an Open WebUI instance of a deployed model. This allows you to query and 
reconfigure your model through a visual interface. 

:::info AI Application Gateway
The LLM UI app makes use of the App Gateway Router which implements a secure, authenticated 
network endpoint for the model.

If the ClearML AI application Gateway is not available, the model endpoint might not be accessible.
For more information, see [AI Application Gateway](../../deploying_clearml/enterprise_deploy/appgw.md).
:::

Once you start a LLM UI instance, you can view the following information in its dashboard:
* Status indicator
  * <img src="/docs/latest/icons/ico-llm-ui-active.svg" alt="Active instance" className="icon size-md space-sm" /> - App instance is running and is actively in use
  * <img src="/docs/latest/icons/ico-llm-ui-loading.svg" alt="Loading instance" className="icon size-md space-sm" /> - App instance is setting up
  * <img src="/docs/latest/icons/ico-llm-ui-idle.svg" alt="Idle instance" className="icon size-md space-sm" /> - App instance is idle
  * <img src="/docs/latest/icons/ico-llm-ui-stopped.svg" alt="Stopped instance" className="icon size-md space-sm" /> - App instance is stopped
* Idle time - Time elapsed since last activity 
* Restored workspace - If a previous session’s workspace was restored, this will display that session's ID 
* Current session ID
* App - The publicly accessible URL to directly access the model.
* Chat window 
* Console log - The console log shows the app instance's console output: setup progress, status changes, error messages, etc.

![LLM UI dashboard](../../img/apps_llm_ui.png#light-mode-only)
![LLM UI dashboard](../../img/apps_llm_ui_dark.png#dark-mode-only)

## LLM UI Instance Configuration

When configuring a new LLM UI instance, you can fill in the required parameters or reuse the 
configuration of a previously launched instance. 

Launch an app instance with the configuration of a previously launched instance using one of the following options:
* Cloning a previously launched app instance will open the instance launch form with the original instance's 
configuration prefilled.
* Importing an app configuration file. You can export the configuration of a previously launched instance as a JSON file 
when viewing its configuration.

The prefilled configuration form can be edited before launching the new app instance.

To configure a new app instance, click `Launch New` <img src="/docs/latest/icons/ico-add.svg" alt="Add new" className="icon size-md space-sm" /> 
to open the app's configuration form.

### Configuration Options

* Instance Name: Name for the LLM UI app instance. This will appear in the instance list
* Service Project - Access Control: The ClearML project in which the app instance is created. Note that access control 
  to the service will be given based on the access control of the Project (i.e. all read-access users will be able to access the service)
* Queue: The queue serviced by the ClearML Agent which will execute the application instance.
* RAG Embedding Model: 
  * Embedding Model Endpoint URL: The embedding model endpoint URL.
  * Model Name: The Embedding Model's name 
* Restore LLM UI ID - Specify a LLM UI ID to be restored
* Idle options: 
  * Idle Time Limit (Hours) - Maximum idle time after which the app instance will shut down
  * Last Action Report Interval (Seconds) - Frequency at which last activity is reported. Prevents idle shutdown while still active.

## Using Knowledge Bases
You can provide your deployed model with additional context through **Knowledge Bases**. This allows the model to reference 
your uploaded documents when queried. 

1. In the model UI, click **Menu > Workspace > Knowledge > + (Create Knowledge Base)**
1. In the `Create Knowledge Base` window:
   * Name and describe the knowledge base. 
   * Click **Create Knowledge**
1. Drag and drop your data files to upload them (supports `.pdf` and `.txt` files) 
1. Click **New Chat**
1. To reference a Knowledge Base, begin the chat with `#<YourKnowledgeBaseName>`. 

The model will search the referenced knowledge base and generate a response using the relevant document snippets.
