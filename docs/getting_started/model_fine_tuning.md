---
title: Programmatic Model Fine-Tuning Workflow
--- 

This guide walks through the full process of fine-tuning a model using ClearML, from dataset creation to model deployment: 

1. Organize data into a ClearML dataset  
2. Register a base model with ClearML  
3. Fine-tune the model  
4. Deploy the trained model 

The guide is accompanied by several Python scripts that demonstrate the programmatic workflow:

* `extract.py` - Fine-tuning Data ingestion  
* `upload_local_model.py` - Base model import  
* `finetune.py` - Model fine-tuning

## 1. Data Ingestion to ClearML

The `extract.py` script clones a GitHub repository, extracts Python functions using `libcst`, and prepares a dataset in 
JSONL format for model fine-tuning. The dataset is then uploaded to ClearML.

**Key functionalities:**

* **Clone a repository**   
* **Parse** `.py` files and extract functions  
* **Create a dataset** in JSONL format suitable for LLM fine-tuning  
* **Upload the dataset to ClearML** using `Dataset.create()` and `Dataset.finalize(auto_upload=True)`

Once finalized, the dataset becomes immutable for reproducibility. You can view its contents and metadata from the ClearML WebApp.

**Arguments:**

* `repo_url`: Git repository to clone  
* `--output`: Local directory for script artifacts  
* `--dataset-name`: Name of the ClearML dataset  
* `--dataset-project`: ClearML project where the dataset will be stored

### Example invocation:

```
python extract.py https://github.com/example/repo --output output_dir --dataset-name "Finetune Example" --dataset-project "Finetune Example"
```

## 2. Model Registration

Use the `upload_local_model.py` script to register a base model to ClearML’s model registry. This makes the model 
accessible to other tasks like fine-tuning, inference, and comparison.

ClearML's [**model registry**]() streamlines AI workflows by enabling effective version control, collaboration, and deployment. It allows you to track model iterations, share them across teams and projects, compare performance, and ensure the reproducibility of your results.

**Arguments:**

* `--model-path`: Path to the local model file (e.g., `.bin`, `.pt`, `.safetensors`)  
* `--model-name`: ClearML name for the model

**Example:** 

| `python upload_local_model.py \   --model-path /path/to/your/model \   --model-name "Qwen2.5 Untrained"` |
| :---- |

The script  returns the model’s unique ClearML ID, which is used in downstream training (see Step 3).

## 3\. Fine-Tuning the Baseline Model

Use `finetune.py` to fine-tune the base model with LoRA (Low-Rank Adaptation) and the previously created dataset .  Training is dispatched to a remote ClearML agent using `execute_remotely`, facilitating scalability. The script does the following:

* Gets a dataset from the ClearML Server  
* Fetches a base model from ClearML's model registry  
* Trains the model remotely with a ClearML agent  
* Uploads the fine-tuned model to ClearML

**Key ClearML components used:**

* `Task.set_packages("requirements.txt")`: Ensures reproducible environments  
* `Task.execute_remotely(queue_name=<queue_name>)`: Dispatches the training job to a ClearML agent (make sure the input queue has an agent servicing it).   
* `InputModel.get_local_copy()`: Retrieves and loads the base model  
* `Dataset.get()`: Fetches training data  
* `OutputModel.update_weights_package()`: Uploads the final model

**Arguments:**

* `--dataset`: ID of the ClearML dataset to use for training. Use the ID from the dataset registered in Step 1    
* `--model`: ID of the ClearML model to fine-tune. Use the ID of the model registered in Step 2\.   
* `--output_dir`: Directory to save training outputs  
* `--num_epochs`: Number of training epochs   
* `--batch_size`: Batch size per device  
* `--learning_rate`: Learning rate for the optimizer   
* `--lora_r`: LoRA rank, controls the size of the low-rank update matrices   
* `--lora_alpha`: Scaling factor for LoRA weights  
* `--lora_dropout`: Dropout applied to LoRA layers during training   
* `--max_length`: Maximum input sequence length including prompt \+ completion

**Example invocation:** 

| `python finetune.py \   --dataset <dataset_id> \   --model <model_id> \   --output_dir "output_dir" \   --num_epochs 3 \   --batch_size 8 \   --learning_rate 3e-4 \   --lora_r 8 \   --lora_alpha 16 \   --lora_dropout 0.05` |
| :---- |

After training:

* The LoRA adapter is saved to `output/adapter/`  
* The merged model is saved to `output/merged/` and uploaded to ClearML

The final model can now be used for inference e.g. deployed with vLLM.

## 

## 4\. Model Deployment

# After fine-tuning, the final model can be deployed using the **ClearML vLLM Model Deployment** app. This enables you to serve your model over a secure,  performant API, making it production-ready.

![][image2]

# Before launching the app, ensure that you have a ClearML Agent running on a GPU-enabled machine with sufficient GPU memory to load the full model. Assign the agent to the ClearML queue where you will send the model deployment app instance for execution.  

# To launch an app instance to serve your model, click \`+\` and fill out the following fields in the launch form: 


* Project name: ClearML Project Name

* Task name: Name of ClearML Task for your vLLM Model Deployment app instance

* Queue:- The ClearML Queue to which the vLLM Model Deployment app instance task will be enqueued (make sure an agent is assigned to that queue)

* Model: The ID of the fine-tuned model created in Step 3\. 

* Model details:  Optionally set a tokenizer, revision versions, and whether to trust remote code

* Idle Time Limit \- Maximum idle time after which the app instance will shut down

* Performance Optimization: Configure tensor parallelism, pipeline parallelism, GPU memory usage, and CPU swap space to scale deployments for larger models.

* Quantization and Precision: Set model weight formats (e.g., 4-bit quantization, safetensors) and activation dtypes (e.g., float16, bfloat16).

* LoRA Adapter Support: Optionally add LoRA modules for adapter-based fine-tuning without needing to modify the base model. 

For all configuration options, see the [vLLM Deployment Application](../webapp/applications/apps_model_deployment).

This deploys your model as a networking service over a secure endpoint.—ready for production use. 

**Note** that the vLLM Model Deployment app makes use of the ClearML AI App Gateway which implements a secure, 
authenticated network endpoint to the app UI. If the ClearML AI App Gateway is not available, the app UI might not be 
accessible.

Once your vLLM Model Deployment app instance is active,it serves your model through a secure, publicly accessible network 
endpoint. The app instance dashboard shows the base URL for the model endpoint (API Base URL), API Key to authenticate 
the endpoint, and an example command line to test the deployed model.    

The model stays live and ready to serve inference requests until it reaches the configured Idle Time Limit.

