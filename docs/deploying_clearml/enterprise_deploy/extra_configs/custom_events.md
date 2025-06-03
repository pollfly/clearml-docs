---
title: Custom Events
---

ClearML Enterprise supports sending custom events to selected Kafka topics. These events are triggered by API calls 
and are only available to tenants with the `custom_events` feature configured.


## Prerequisites

* A Kafka instance must be deployed and reachable from the ClearML `apiserver`

## Enabling Custom Events on the Server

To enable custom evens, edit ClearML Server' `clearml-values.override.yaml` file adding the following:

```yaml
apiserver:
  extraEnvs:
    # Enable custom events.
    - name: CLEARML__services__custom_events__enabled
      value: "true"
    # Folder where the ClearML Apiserver container can find the custom message templates.
    - name: CLEARML__services__custom_events__template_folder
      value: "/mnt/custom_events/templates"
    # Kafka host configuration for custom events.
    - name: CLEARML__hosts__kafka__custom_events__host
      value: "[<KAFKA_HOST_ADDRESS>:<KAFKA_HOST_PORT>]"
    # Kafka security parameters. Below is the example for SASL plaintext security.
    - name: CLEARML__SECURE__KAFKA__CUSTOM_EVENTS__security_protocol
      value: "SASL_PLAINTEXT" 
    - name: CLEARML__SECURE__KAFKA__CUSTOM_EVENTS__sasl_mechanism
      value: "SCRAM-SHA-512" 
    - name: CLEARML__SECURE__KAFKA__CUSTOM_EVENTS__sasl_plain_username
      value: "<USERNAME>" 
    - name: CLEARML__SECURE__KAFKA__CUSTOM_EVENTS__sasl_plain_password
      value: "<PASSWORD>"
    # Kafka topics names for lifecycle and inventory messages.
    - name: CLEARML__services__custom_events__channels__main__topics__service_instance_lifecycle
      value: "lifecycle"
    - name: CLEARML__services__custom_events__channels__main__topics__service_instance_inventory
      value: "inventory"
```

After editing the configuration, upgrade the Helm chart to apply the changes.

## Enabling Custom Events for Tenants


Each tenant must be explicitly configured to use custom events. Use the following API call to set up the custom events 
properties required by the event message templates:

```bash
curl $APISERVER_URL/system.update_company_custom_events_config -H "Content-Type: application/json" -u $APISERVER_KEY:$APISERVER_SECRET -d'{
  "company": "<company_id>",
  "fields": {
    "service_instance_id": "<value>",
    "service_instance_name": "<value>",
    "service_instance_customer_tenant_name": "<value>",
    "service_instance_customer_space_name": "<value>",
    "service_instance_customer_space_id": "<value>",
    "parameters_connection_points": ["<value1>", "<value2>"]
}}'  
```

## Event Emitters

ClearML services that send custom events include:

* `apiserver` — Sends environment lifecycle events.
* `clearml-pods-monitor-exporter` - Monitors running Pods (Tasks) and sends lifecycle events. Should run one per cluster 
  with a unique identifier (an explicit UUID is required for the installation).
* `clearml-pods-inventory` - Sends periodic inventory events about active Pods.
* `clearml-company-inventory` - Monitors ClearML tenants and emits environment-level inventory events.

## Install custom-events

The `clearml-custom-events` Helm chart bundles all custom event services and their dependencies (e.g., Redis). It serves 
as the umbrella chart for custom event functionality.

### Prepare Values

Create a `clearml-custom-events-values.override.yaml` file with the following content (make sure to replace `<PLACEHOLDERS>`):

```yaml
global:
  imageCredentials:
    password: "<CLEARML_DOCKERHUB_TOKEN>"
  clearml:
    apiServerUrlReference: "<CLEARML_APISERVER_URL>"
    apiServerKey: "<ACCESSKEY>"
    apiServerSecret: "<SECRETKEY>"

clearml-pods-monitor-exporter:
  checkIntervalSeconds: 60
  # -- *REQUIRED* Universal Unique string to identify Pods Monitor instances across worker clusters. Cannot be empty.
  # Uniqueness is required across different clusters installations to preserve the reported data status.
  podsMonitorUUID: ""

clearml-pods-inventory:
  cronJob:
    schedule: "@daily"

clearml-company-inventory:
  cronJob:
    schedule: "@daily"
```

### Install

Install the Custom Events chart:

```bash
helm install clearml-custom-events clearml-enterprise/clearml-custom-events -f clearml-custom-events-values.override.yaml
```