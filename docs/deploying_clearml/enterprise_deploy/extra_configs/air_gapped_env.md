---
title: Air-Gapped Environments
---

## ClearML Applications

Various application dependencies that are auto-downloaded from the internet can be locally hosted and specified to the 
applications.

When environment variables should be provided to applications (see below), these can be set using one of the following:

- ClearML Administrator Vault setting the `agent.extra_docker_arguments` setting
- Pre-configuring the specific agents configuration (when using agents installed on VMs or bare-metal machines) using the `agent.extra_docker_arguments`
- Preconfiguring the `basePodTemplate` in Kubernetes ClearML Agent deployments

Also, make sure of the following: 

- All containers/pods should be configured to use your local registry.
- If you are going to use custom images, make sure python 3 is installed.
- Make sure the following python packages are locally hosted in your pypi proxy or python packages artifactory, and available using some local URL. Or, if you are going to use custom images, make sure they are installed.

  ```requirements
  jupyter
  jupyterlab>4,<4.4
  traitlets
  mitmproxy<10.2
  werkzeug>2,<3.0 ; python_version < '3.9'
  clearml>=1.9
  clearml_session==0.16.0
  tqdm
  boto3>=1.9
  pylint
  clearml-agent
  ```

- If hosting the previous python packages locally, make sure to set `PIP_EXTRA_INDEX_URL=<LOCAL_REPO_URL>` for containers running ClearML tasks. Following is an example in Kubernetes using the ClearML Agent helm values override:

  ```yaml
  agentk8sglue:
    queues:
      myQueue:
        templateOverrides:
          env:
            - name: PIP_EXTRA_INDEX_URL
              value: "<LOCAL_REPO_URL>"
  ```

### VSCode App Resources

Provide the environment variables mentioned below to all containers started by the ClearML Agent running GPU workloads:

- **VSCode Server debian package**, set using the `CLEARML_SESSION_VSCODE_SERVER_DEB=<PATH_TO_DEB_FILE>` environment variable. Package can be found [here](https://github.com/coder/code-server/releases/download/v4.96.2/code-server_4.96.2_amd64.deb) (version number can be updated, see https://github.com/coder/code-server/releases).
- **VSCode Python extension**, set using the `CLEARML_SESSION_VSCODE_PY_EXT=<PATH_TO_EXTENSION_FILE>` environment variable, pointing to the Visual Studio marketplace. Package can be found at https://marketplace.visualstudio.com/_apis/public/gallery/publishers/ms-python/vsextensions/python/2022.12.0/vspackage (version number can be updated, see https://marketplace.visualstudio.com/items?itemName=ms-python.python).

Example in Kubernetes using the ClearML Agent helm values override:

```yaml
agentk8sglue:
  queues:
    myQueue:
      templateOverrides:
        env:
          - name: CLEARML_SESSION_VSCODE_SERVER_DEB
            value: "<PATH_TO_DEB_FILE>"
          - name: CLEARML_SESSION_VSCODE_PY_EXT
            value: "<PATH_TO_EXTENSION_FILE>"
```

### SSH App Resources

If choosing to use the DropBear server instead of the SSH server (required for non-privileged containers), make sure the following packages are locally hosted and available using some local URL.

Provide the environment variables mentioned below to all containers started by the ClearML Agent running GPU workloads:

- DropBear ssh server, set using the `CLEARML_DROPBEAR_EXEC` environment variable. Package can be found [here](https://github.com/allegroai/dropbear/releases/download/DROPBEAR_CLEARML_2023.02/dropbearmulti).

## Kubernetes Environments

### Use a Custom imagePullSecret

To use a custom defined `imagePullSecret` for a **ClearML Agent** and the tasks Pods it creates, configure the following in your `clearml-agent-values.override.yaml` file.

```yaml
imageCredentials:
  extraImagePullSecrets:
    - name: "<IMAGE_PULL_SECRET_NAME>"
```

To use a custom defined `imagePullSecret` for the **ClearML Server**, configure the following in your `clearml-values.override.yaml` file.

```yaml
imageCredentials:
  existingImagePullSecrets:
    - name: "<IMAGE_PULL_SECRET_NAME>"
```

To use a custom defined `imagePullSecret` for the **ClearML App Gateway**, configure the following in your `clearml-app-gateway-values.override.yaml` file.

```yaml
imageCredentials:
  existingImagePullSecrets:
    - name: "<IMAGE_PULL_SECRET_NAME>"
```

### Create a Custom imagePullSecret

To create a registry secret in Kubernetes, you can use the following command example. The secret needs to be created in the namespace where it will be used.

```bash
kubectl create secret docker-registry -n <NAMESPACE> <SECRET_NAME> \
  --docker-server=<REPO_URL> \
  --docker-username=<USERNAME> \
  --docker-password=<PASSWORD> \
  --docker-email=<EMAIL_OR_EMPTY_STRING>
```