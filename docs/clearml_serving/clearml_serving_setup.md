---
title: Setup
---

The following page goes over how to set up and upgrade `clearml-serving`.

## Prerequisites

* ClearML-Server : Model repository, Service Health, Control plane
* Kubernetes / Single-instance Machine : Deploying containers
* CLI : Configuration and model deployment interface

## Initial Setup
1. Set up your [ClearML Server](../deploying_clearml/clearml_server.md) or use the 
  [free hosted service](https://app.clear.ml)
1. Connect `clearml` SDK to the server, see instructions [here](../clearml_sdk/clearml_sdk_setup.md#install-clearml)

1. Install the `clearml-serving` CLI:
   
   ```bash
   pip3 install clearml-serving
   ```

1. Create the Serving Service Controller:
   
   ```bash
   clearml-serving create --name "serving example"
   ```
   
   This command prints the Serving Service UID:
   
   ```console
   New Serving Service created: id=aa11bb22aa11bb22
   ```
   
   Copy the Serving Service UID (e.g., `aa11bb22aa11bb22`), as you will need it in the next steps.

1. Clone the `clearml-serving` repository:
   ```bash
   git clone https://github.com/clearml/clearml-serving.git
   ```

1. Edit the environment variables file (`docker/example.env`) with your `clearml-server` API credentials and Serving Service UID. 
   For example:

   ```bash
   cat docker/example.env
   ```
   
   ```console 
    CLEARML_WEB_HOST="https://app.clear.ml"
    CLEARML_API_HOST="https://api.clear.ml"
    CLEARML_FILES_HOST="https://files.clear.ml"
    CLEARML_API_ACCESS_KEY="<access_key_here>"
    CLEARML_API_SECRET_KEY="<secret_key_here>"
    CLEARML_SERVING_TASK_ID="<serving_service_id_here>"
   ```

1. Spin up the `clearml-serving` containers with `docker-compose` (or if running on Kubernetes, use the helm chart):
   
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose.yml up
   ```
    
   If you need Triton support (Keras/PyTorch/ONNX etc.), use the triton `docker-compose` file:
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose-triton.yml up 
   ```
   
   If running on a GPU instance with Triton support (Keras/PyTorch/ONNX etc.), use the triton gpu docker-compose file:
   ```bash
   cd docker && docker-compose --env-file example.env -f docker-compose-triton-gpu.yml up
   ```
    
:::note
Any model that registers with Triton engine will run the pre/post-processing code in the Inference service container, 
and the model inference itself will be executed on the Triton Engine container.
:::

## Advanced Setup - S3/GS/Azure Access (Optional)
To enable inference containers to download models from S3, Google Cloud Storage (GS), or Azure,
add access credentials in the respective environment variables to your env files (`example.env`): 

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION

GOOGLE_APPLICATION_CREDENTIALS

AZURE_STORAGE_ACCOUNT
AZURE_STORAGE_KEY
```

For further details, see [Configuring Storage](../integrations/storage.md#configuring-storage).

## Upgrading ClearML Serving

**Upgrading to v1.1**

1. Shut down the serving containers (`docker-compose` or k8s)
1. Update the `clearml-serving` CLI: 

   ```
   pip3 install -U clearml-serving
   ```
   
1. Re-add a single existing endpoint with `clearml-serving model add ...` (press yes when asked). It will upgrade the 
   `clearml-serving` session definitions.
1. Pull the latest serving containers (`docker-compose pull ...` or k8s)
1. Re-spin serving containers (`docker-compose` or k8s)


## Tutorial

For further details, see the ClearML Serving [Tutorial](clearml_serving_tutorial.md).