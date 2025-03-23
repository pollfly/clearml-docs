---
title: Kubernetes Deployment
---

:::important Enterprise Feature
The AI Application Gateway is available under the ClearML Enterprise plan.
:::

This guide details the installation of the ClearML App Gateway Router.
The App Gateway Router enables access to your AI workload applications (e.g. remote IDEs like VSCode and Jupyter, model API interface, etc.).
It acts as a proxy, identifying ClearML Tasks running within its [K8s namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) 
and making them available for network access.

:::important 
The App Gateway Router must be installed in the same K8s namespace as a dedicated ClearML Agent.
It can only configure access for ClearML Tasks within its own namespace.
:::


## Requirements

* Kubernetes cluster: `>= 1.21.0-0 < 1.32.0-0`  
* Helm installed and configured  
* Helm token to access `clearml` helm-chart repo  
* Credentials for `clearml` docker repo
* A valid ClearML Server installation

## Optional for HTTPS

* A valid DNS entry for the new TTR instance  
* A valid SSL certificate

## Helm

### Login

```
helm repo add clearml-enterprise \
https://raw.githubusercontent.com/clearml/clearml-enterprise-helm-charts/gh-pages \
--username <GITHUB_TOKEN> \
--password <GITHUB_TOKEN>
```

Replace `<GITHUB_TOKEN>` with your valid GitHub token that has access to the ClearML Enterprise Helm charts repository.

### Prepare Values

Before installing the App Gateway Router, create a Helm override file:

```
imageCredentials:
  password: ""
clearml:
  apiServerKey: ""
  apiServerSecret: ""
  apiServerUrlReference: ""
  authCookieName: ""
  sslVerify: true
ingress:
  enabled: true
  hostName: ""
tcpSession:
  routerAddress: ""
  service:
    type: LoadBalancer
  portRange:
    start: 
    end:
```

Configuration options:

* `imageCredentials.password`: ClearML DockerHub Access Token.
* `clearml.apiServerKey`: ClearML server API key.  
* `clearml.apiServerSecret`: ClearML server secret key.  
* `clearml.apiServerUrlReference`: ClearML API server URL starting with `https://api.`.  
* `clearml.authCookieName`: Cookie used by the ClearML server to store the ClearML authentication cookie.
* `clearml.sslVerify`: Enable or disable SSL certificate validation on `apiserver` calls check.  
* `ingress.hostName`: Hostname of router used by the ingress controller to access it.  
* `tcpSession.routerAddress`: The external router address (can be an IP, hostname, or load balancer address) depending on your network setup. Ensure this address is accessible for TCP connections.
* `tcpSession.service.type`: Service type used to expose TCP functionality, default is `NodePort`.
* `tcpSession.portRange.start`: Start port for the TCP Session feature.  
* `tcpSession.portRange.end`: End port for the TCP Session feature.


The full list of supported configuration is available with the command:

```
helm show readme allegroai-enterprise/clearml-enterprise-task-traffic-router
```

### Install

To install the TTR component via Helm use the following command:

```
helm upgrade --install \
<RELEASE_NAME> \
-n <WORKLOAD_NAMESPACE> \
allegroai-enterprise/clearml-enterprise-task-traffic-router \
--version <CHART_VERSION> \
-f override.yaml
```

Replace the placeholders with the following values:

* `<RELEASE_NAME>` - Unique name for the App Gateway Router within the K8s namespace. This is a required parameter in 
  Helm, which identifies a specific installation of the chart. The release name also defines the router’s name and 
  appears in the UI within AI workload application URLs (e.g. Remote IDE URLs). This can be customized to support multiple installations within the same 
  namespace by assigning different release names.
* `<WORKLOAD_NAMESPACE>` - [Kubernetes Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) 
  where workloads will be executed. This namespace must be shared between a dedicated ClearML Agent and an App 
  Gateway Router. The agent is responsible for monitoring its assigned task queues and spawning workloads within this 
  namespace. The router monitors the same namespace for AI workloads (e.g. remote IDE applications). The router has a 
  namespace-limited scope, meaning it can only detect and manage tasks within its 
  assigned namespace.
* `<CHART_VERSION>` - Version recommended by the ClearML Support Team.