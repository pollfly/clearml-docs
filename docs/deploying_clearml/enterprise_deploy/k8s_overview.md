---
title: Complete ClearML Enterprise K8s Installation and Configuration
---

This guides walks you through installing and configuring ClearML Enterprise on Kubernetes, from basic installation 
to advanced configuration options.

Follow the steps in the order presented for a smooth setup process.

## Prerequisites

Before installing ClearML Enterprise, verify that the following components are in place:

- Kubernetes Cluster: A vanilla Kubernetes cluster is recommended for optimal GPU support.
- CLI Tools: `kubectl` and `helm` must be installed and configured.
- Ingress Controller:  Required to expose services via HTTP/S (e.g., `nginx-ingress`). If you need external access, also 
  configure a LoadBalancer (e.g., `MetalLB`).
- Server and workers communicating on HTTP/S (ports 80 and 443). Additionally, the TCP session feature requires a range 
  of ports for TCP traffic based on your configuration (see [AI App Gateway installation](appgw_install_k8s.md)).
- DNS Configuration: A domain with subdomain support is required, ideally with trusted TLS certificates. All entries must 
  be resolvable by the Ingress controller. Example subdomains:
  - Server:
    - `api.<BASE_DOMAIN>`
    - `app.<BASE_DOMAIN>`
    - `files.<BASE_DOMAIN>`
  - Worker:
    - `router.<BASE_DOMAIN>`
    - `tcp-router.<BASE_DOMAIN>` (optional, for TCP sessions)
- Storage: A configured StorageClass and an accessible storage backend.
- ClearML Enterprise Access:
  - Helm repository token (`<HELM_REPO_TOKEN>`)
  - DockerHub registry token (`<CLEARML_DOCKERHUB_TOKEN>`)

### Recommended Cluster Specifications

A 3-node cluster is recommended for production setups, with each node provisioned with:

- 8 vCPUs
- 32 GB RAM
- 500 GB storage

## Installation

### ClearML Enterprise Server

The ClearML Enterprise Server (control plane) includes the ClearML `apiserver`, `fileserver`, and `webserver` components. 
The package also includes MongoDB, ElasticSearch, and Redis as Helm dependencies.

See the [ClearML Server on Kubernetes installation guide](k8s.md).

### ClearML Applications

ClearML Applications are like plugins that allow you to manage ML workloads and automatically run recurring workflows 
without any coding. Applications are installed on top of the ClearML Server and are provided by the ClearML team.

See the [Application Installation guide](extra_configs/apps.md).

### ClearML Enterprise Agent

The ClearML Enterprise Agent Enables scheduling and execution of distributed workloads (Tasks) on your Kubernetes cluster.

See the [ClearML Agent installation guide](agent_k8s.md).

### AI Application Gateway

The ClearML AI Application Gateway provides secure and authenticated routing of HTTPS connections from a 
user's browser running the ClearML WebApp to pods running interactive ClearML applications.

Some ClearML applications (e.g., JupyterLab, Streamlit)  may require users to access running ClearML tasks in a secure 
and authenticated manner, based on ClearML user permissions. To provide access to these tasks running inside pods, an AI 
App Gateway service must run on the same network as the agents and pods running the tasks.

See the [AI Application Gateway installation guide](appgw_install_k8s.md).

## Additional Configurations

### Setup GPUs

#### GPU Operator


$$$$$$$$$$$$$$$$$$$$In order to use Nvidia GPUs in ClearML.

See the [guide for deploying the NVIDIA GPU Operator alongside ClearML Enterprise](extra_configs/gpu_operator.md)

### Fractional GPU Support

Enable allocating a fraction of the available GPU cores and memory for better utilization of shared GPU nodes.

$$$$$$TODO link

### Multi-Tenant Setup

Enable isolated tenants within the same ClearML Server, each with separate configuration, users, and project namespaces.

See the [multi-tenant service installation guide](multi_tenant_k8s.md).

### SSO (Identity Provider) Setup

Configure Single sign-on identity providers on ClearML Enterprise.

See the [SSO Setup guide](extra_configs/sso_login.md).

### ClearML Custom Events

ClearML Enterprise supports sending custom events to selected Kafka topics. 

See the [Custom Event guide](extra_configs/custom_events.md).

### ClearML Presign Service

The ClearML Presign Service is a secure component for generating and redirecting pre-signed storage URLs for
authenticated users.

See the [ClearML Presign Service guide](extra_configs/presign_service.md).

### Install with a non-root user

In some Helm charts, you will find a values file called `values-enterprise-non-root-privileged.yaml` to be used for a 
non-root installation.

These values are for Enterprise versions only, and they need to be adapted to specific infrastructure needs. The 
`containerSecurityContext` is related to the Kubernetes distribution used/configuration and will need to be customized accordingly.