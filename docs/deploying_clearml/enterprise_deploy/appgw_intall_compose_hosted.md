---
title: Installing AI Application Gateway with docker-compose - hosted server
---

:::important Enterprise Feature 
The Application Gateway is available under the ClearML Enterprise plan. 
:::

The AI Application Gateway enables external access to ClearML tasks, and applications running on workload nodes that
require HTTP or TCP access. The gateway is configured with an endpoint or external address, making these services 
accessible from the user's machine, outside the workload nodes’ network.

This guide details the installation of the ClearML AI Application Gateway for ClearML users who use ClearML’s SaaS control 
plane while hosting their own workload nodes.

## Requirements

* Linux OS (x86) machine with root access  
* The machine needs to be reachable from your user network  
* The machine needs to have network reachability to workload nodes  
* Credentials for the ClearML docker repository  
* A valid ClearML Server installation

## Recommendations

* For a secure connection, we recommend having a DNS entry and a valid SSL Certificate assigned to the machine IP.

## Host Configuration

### Docker Installation

Installing `docker` and `docker-compose` might vary depending on the specific operating system you're using. Here is an 
example for AmazonLinux:

```
sudo dnf -y install docker
DOCKER_CONFIG="/usr/local/lib/docker"
sudo mkdir -p $DOCKER_CONFIG/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v2.17.3/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
sudo chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
sudo systemctl enable docker
sudo systemctl start docker
 
sudo docker login
```

Use the ClearML docker hub credentials when prompted by docker login.

### Docker-compose File

This is an example of the docker-compose file you will need to create:

```
version: '3.5'
services:
  task_traffic_webserver:
    image: clearml/ai-gateway-proxy:${PROXY_TAG:?err}
    network_mode: "host"
    restart: unless-stopped
    container_name: task_traffic_webserver
    volumes:
    - ./task_traffic_router/config/nginx:/etc/nginx/conf.d:ro
    - ./task_traffic_router/config/lua:/usr/local/openresty/nginx/lua:ro
  task_traffic_router:
    image: clearml/ai-gateway-router:${ROUTER_TAG:?err}
    restart: unless-stopped
    container_name: task_traffic_router
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock
    - ./task_traffic_router/config/nginx:/etc/nginx/conf.d:rw
    - ./task_traffic_router/config/lua:/usr/local/openresty/nginx/lua:rw
    environment:
    - LOGGER_LEVEL=INFO
    - ROUTER__WEBSERVER__SERVER_PORT="8010"
    - ROUTER_NAME=${ROUTER_NAME:?err}
    - ROUTER_URL=${ROUTER_URL:?err}
    - CLEARML_API_HOST=${CLEARML_API_HOST:?err}
    - CLEARML_API_ACCESS_KEY=${CLEARML_API_ACCESS_KEY:?err}
    - CLEARML_API_SECRET_KEY=${CLEARML_API_SECRET_KEY:?err}
    - AUTH_COOKIE_NAME=${AUTH_COOKIE_NAME:?err}
    - AUTH_SECURE_ENABLED=${AUTH_SECURE_ENABLED}
    - TCP_ROUTER_ADDRESS=${TCP_ROUTER_ADDRESS}
    - TCP_PORT_START=${TCP_PORT_START}
    - TCP_PORT_END=${TCP_PORT_END}
```

### Configuration File

You will be provided with a prefilled `runtime.env` file containing the following entries:

```
# PREFILLED SECTION, PROVIDED BY CLEARML
PROXY_TAG=
ROUTER_TAG=
CLEARML_API_HOST=https://api.
AUTH_COOKIE_NAME=

# TO BE FILLED BY USER
ROUTER_NAME=main-router
ROUTER_URL=http://<ROUTER-HOST-PUBLIC-IP>:8010
CLEARML_API_ACCESS_KEY=
CLEARML_API_SECRET_KEY=
AUTH_SECURE_ENABLED=true
TCP_ROUTER_ADDRESS=<ROUTER-HOST-PUBLIC-IP>
TCP_PORT_START=
TCP_PORT_END=
```

Edit it according to the following guidelines:

* `ROUTER_NAME`: The name of the Router, which needs to be unique for each tenant.  
* `CLEARML_API_ACCESS_KEY, CLEARML_API_SECRET_KEY:` API credentials created in the ClearML web UI, for Admin user or Service Account with admin privileges. Make sure to label these credentials clearly, so that they will not be revoked by mistake.  
* `ROUTER_URL`: The URL for this router. This URL will be shown in the UI of any application for users to access (Like hosted Jupyter or LLM UI).  
* `TCP_ROUTER_ADDRESS`: The TCP Router external address, which is an IP of the host machine or a load balancer hostname, depending on the customer network configuration.  
* `TCP_PORT_START`: The start port for the TCP Tasks, chosen by the customer. Ensure that ports are open and can be allocated on the host.  
* `TCP_PORT_END`: The end port for the TCP Tasks, chosen by the customer. Ensure that ports are open and can be allocated on the host.

### Installation

Run the following command to start the router:

```
sudo docker compose --env-file runtime.env up -d
```

### Advanced

#### Running without Certificates

When running on docker-compose with an HTTP interface and without certificates please set the following entry in the *runtime.env* as below:

```
AUTH_SECURE_ENABLED=false
```

#### Install Multiple Routers for the Same Tenant

To install multiple routers in the same tenant it is necessary to set parameters to identify and split the workload. Using this setting, each router will only handle routing to tasks that have originated from the specific queues it was assigned. This is important in case you have two different networks with two different agents, and tasks started by Agent A can only be reached by Router A (in the same network), but simply cannot be reached by Router B. The assumption in this case is that Agent A and Agent B will service different queues, and the Routers handling routing to the tasks executed by each agent will need to match the queue definitions.  
Multiple routers in the same tenant must have different `ROUTER_NAME` and listen to different queues (`LISTEN_QUEUE_NAME`).

**Router-A** *runtime.env*

```
ROUTER_NAME=router-a
LISTEN_QUEUE_NAME=queue1,queue2
```

**Router-2** *runtime.env*

```
ROUTER_NAME=router-b
LISTEN_QUEUE_NAME=queue3,queue4
```

The environment variable `LISTEN_QUEUE_NAME` needs to be specified in the docker-compose file in case.  
The `LISTEN_QUEUE_NAME` is a list of string names split by a comma. It supports wildcards.