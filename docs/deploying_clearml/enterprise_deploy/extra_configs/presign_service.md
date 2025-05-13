# ClearML Presign Service

The ClearML Presign Service is a secure component for generating and redirecting pre-signed storage URLs for authenticated users.

# Prerequisites

- The ClearML Enterprise server is up and running.
- Create a set of `<ACCESS_KEY>` and `<SECRET_KEY>` credentials in the ClearML Server. The easiest way to do so is from the ClearML UI (Settings â†’ Workspace â†’ App Credentials â†’ Create new credentials).
Note: Make sure that the generated keys belong to an admin user or a service user with admin privileges.
- The worker environment should be able to communicate to the ClearML Server over the same network.

# Installation

## Add the Helm Repo Locally

Add the ClearML Helm repository:
``` bash
helm repo add clearml-enterprise https://raw.githubusercontent.com/clearml/clearml-enterprise-helm-charts/gh-pages --username <HELM_REPO_TOKEN> --password <HELM_REPO_TOKEN>
```

Update the repository locally:
``` bash
helm repo update
```

## Prepare Values

Create a `presign-service.override.yaml` override file, replacing placeholders.

``` yaml
imageCredentials:
  password: "<CLEARML_DOCKERHUB_TOKEN>"
clearml:
  apiServerUrlReference: "<CLEARML_API_SERVER_URL>"
  apiKey: "<ACCESS_KEY>"
  apiSecret: "<SECRET_KEY>"
ingress:
  enabled: true
  hostName: "<PRESIGN_SERVICE_URL>"
```

## Install

Install the clearml-presign-service helm chart in the same namespace as the ClearML Enterprise server:

``` bash
helm install -n clearml clearml-presign-service clearml-enterprise/clearml-presign-service -f presign-service.override.yaml
```

## Configure ClearML Enterprise Server

After installing, edit the ClearML Enterprise `clearml-values.override.yaml` file adding an extra environment variable to the apiserver component as follows, making sure to replace the `<PRESIGN_SERVICE_URL>` placeholder, then perform a helm upgrade.

``` yaml
apiserver:
  extraEnvs:
    - name: CLEARML__SERVICES__SYSTEM__COMPANY__DEFAULT__SERVICES
      value: "[{\"type\":\"presign\",\"url\":\"https://<PRESIGN_SERVICE_URL>\",\"use_fallback\":\"false\",\"match_sets\":[{\"rules\":[{\"field\":\"\",\"obj_type\":\"\",\"regex\":\"^s3://\"}]}]}]"
```