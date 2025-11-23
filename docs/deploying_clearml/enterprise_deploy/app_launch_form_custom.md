---
title: Application Launch Form Customization
---

:::important Enterprise Feature
Applications are available under the ClearML Enterprise plan.
:::

An application instance’s launch form is defined in its [configuration file](app_custom.md).
ClearML supports modifying some of the form's properties without the need to re-package and deploy the application 
through a server configuration file. These overrides include:
* Available dropdown options
* Parameter default values
* Field hints, placeholders, and labels displayed in the application launch form


## Configuration
The launch form overrides are defined in the `services/applications.conf` server configuration file under the `app_wizard_overrides` section.
Each entry follows the format:

```
app_wizard_overrides {
   "<app-id>" {
      "<configuration–parameter>" {
         "<property_1>": "<value>"
         "<property_2>": ["<value_a>", "<value_b>", "<value_c>"]
      }
   }
}
```

* `app-id` - Application ID
* `configuration-parameter` - The application configuration file parameter identifier.
* `property` - The property to override (`options`, `default`, `placeholder`, `hint`, or `info`). See [below](#supported-properties) for more information. 
* `value` - The replacement value for that property.

Refer to the configuration file of a specific application to view the property IDs for use when overriding. 

### Supported Properties

* `options` - Accepts an array of strings or mappings in the format of `{"label": "<option label>", "value": "<option value>"}`
  * Strings - Use the same value for both label and stored value. For example:

    ```
    app_wizard_overrides {
       "jupyter-lab" {
         "container" {
           "default": "python:3.11"
           "options": ["python:3.12", "python:3.11", "python:3.8"]
         }
       }
     }
    ```	

  * Objects - Define separate display labels and stored values. For example:

    ```
    app_wizard_overrides {
       "jupyter-lab" {
          "container" {
             "default": "python:3.11"
             "options": [
                {"label": "Python 3.12 Official Image", "value": "python:3.12"},
                {"label": "Python 3.11 Official Image", "value": "python:3.11"},
                {"label": "Python 3.8 Official Image", "value": "python:3.8"}
             ]
          }
       }
    }
    ```

* `default` - Sets the initial value applied to the property when the form is presented to the user.
* `placeholder` - Text displayed inside an input field when it does not contain any value, usually used to suggest the expected format or type of input. 
* `hint` -  A short  informative message displayed below the input field to provide additional instructions to the user.
* `info` - Text that appears in a property's tooltip.