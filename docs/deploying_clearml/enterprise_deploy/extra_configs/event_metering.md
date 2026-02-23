---
title: Event Metering
---

:::important Enterprise Feature
Event metering is available under the ClearML Enterprise plan.
:::

ClearML facilitates the tracking of custom usage metrics via a metering service, by enabling administrators to:
* Define their metrics of interest
* Periodically report these metrics to the metering service
* Querying the aggregated data through API/UI.

The service also supports attaching a unit price to a custom event definition. When a unit price is configured, the 
service provides both the event count and the estimated cost information. 

The metering service records daily aggregates of reported events, by either
* Summing all reported events for the day
* Keeping the maximal value reported that day.

Tenant admins can view detailed usage and spend information through the [**Settings > Analytics**](../../../webapp/settings/webapp_settings_analytics.md) page.

Platform maintainers can view tenant usage and spend information in the tenant page of the [platform management center](../../../webapp/platform_management_center.md).

## Defining Events

Before usage data can be collected, the events must first be defined in the server metering service (Usage Aggregator).

Metered events are identified by type and label, such that different events (different labels) can be grouped together by category (same type).

The metering service configuration includes:
* Which event types are accepted
* Which labels are valid for each event type
* Aggregation policy for each event type
* Cost information (for each label)

### Usage Aggregator Definitions

Events are configured in the Usage Aggregator configuration file, which by default is located at

```
/opt/clearml/usage_aggregator.conf
```

For each event type, the following definitions are required:
* `count_strategy` – How daily values are aggregated. The options are:
* `sum` - Sum all reported values for a daily total
* `max` - Store the maximum reported value for the day
* `labels` – Events reported for this type

For each event (label) pricing information can, optionally, be included:
* `price` – Event unit price
* `units` – How many reported units apply to the unit price
* `currency` – Optional (defaults to USD)

The following example defines a `users` event type with `admins` and `users` labels. It uses the `max` aggregation 
strategy, meaning only the maximum value reported each day will be stored. It also specifies pricing information such 
that admin users cost $0.2 per user per day, and non-admin users cost $0.1 per user per day.


```
pricing {
   currency: USD
}

events {
    users: {
        count_strategy: max
        labels: {
            admins {
                pricing {
                    price: 0.2
                    units: 1
                }
            }
            users {
                pricing {
                    price: 0.1
                    units: 1
                }
            }
        }
    }
}
```

### API Server Definitions

The API server forwards [reported metering events](#event-reporting) to the designated metering service according to a specified format template. 
ClearML’s metering service expects the following format:

```
{
  "id": "<event_id>",
  "timestamp": <timestamp_millis>,
  "clearml_tenant": "<tenant_id>",
  "event_type": "<event type>",
  "label": ["label1", "label2"],
  "usage": [value1, value2]
}
```

The API server supports Jinja2 to convert reported events into the required format. These templates are located in:

```
/opt/clearml/config/templates
```

:::note 
You can change the template folder location by setting:
```
CLEARML__services__custom_events__template_folder
```
:::

The API server sends the event reports it receives to the metering service after applying the event type template 
conversion to the received report. For example, the following users.j2 template converts a `users` event reported to the API server into the expected aggregator format:

```
{
  "id": "{{ event.id }}",
  "timestamp": {{ event.timestamp_millis | int }},
  "clearml_tenant": "{{ event.clearml_tenant }}",
  "event_type": "users",
  "label": ["admins", "standard"],
  "usage": [{{ event.admins }}, {{ event.standard }}]
}
```

### Enabling a Template
To enable forwarding a specific event type to the metering service and applying template formatting, set:
```
CLEARML__services__custom_events__channels__usages__events__<template_key>: <template file>
```

If the template file name is the same as the template key, then you can use the simplified format:
```
CLEARML__services__custom_events__channels__usages__events__<template_key>: true
```

## Event Reporting
Metered events are reported to designated endpoints in the ClearML API server, which feed the data into the metering service.

```
Reporters / Custom Scripts
       ↓ tenants.custom_events API
API Server (templates → formatted usage events)
       ↓
Metering Service (daily aggregation)
```

Reporting scripts are available for:
* K8S Compute nodes
* ClearML tenant users
* ClearML Fileserver storage consumption

Events are sent to the ClearML API server using the `tenants.custom_events` endpoint. 

All events in a single report must belong to the same event type, designated by the template_key parameter.
The events may belong to one or more (when reported by a platform admin) tenants 

An event report is comprised of:
* `template_key` - Identifies the event type
* `id` - A unique identifier for the event 
* `clearml_tenant` - The tenant ID the event belongs to 
* `timestamp_millis` - The time the report applies to
* Additional parameters as required by event type

For example, the following is an event report providing admin and standard user counts:
```
curl -XPOST -u "$ADMIN_USER_KEY":"$ADMIN_USER_SECRET" \
"$API_SERVER_URL/tenants.custom_events" \
-H "Content-type: application/json" \
-d '{
  "template_key": "users",
  "events": [{
      "id": "42b3859cf0324df7b7abae5cdc2004dc",
      "clearml_tenant": "d1bd92a3b039400cbafc60a7a5b1e52b",
      "timestamp_millis": 1765195356619,
      "admins": 2,
      "standard": 10
  }]
}'
```


## Accessing Aggregated Data

Data aggregated in the metering service is available in:
* Tenant admin settings UI [Analytics](../../../webapp/settings/webapp_settings_analytics.md) section
* [Platform management center](../../../webapp/platform_management_center.md) UI tenant pages
