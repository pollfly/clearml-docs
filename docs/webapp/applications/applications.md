---
title: Custom Applications
---

Applications are a method to extend ClearML's functionality with the help of a simple UI wizard and a visualization dashboard.
ClearML Provides a few applications out of the box.
Each application has an application template (which defines the inputs and visualizations of the application).
Running an application creates a new application instance with its own name and configuration.
Behind the scenes, each application instance is actually a Task in ClearML.

## Application Overview

Application have 2 main sections:

1. Wizard - This is where the user configures the application itself.
1. Dashboard - This is where the application visualizes information. It can hold text, scalar metrics, plots and more!

## Defining an Application

An application contains a multiple components:
1. python code (single file or multiple files)
1. requirements.txt file for the python library dependencies
1. app.conf file, defining the application's description, entry point, wizard fields, dashboard widgets and more
1. assets folder containing the application's assets such as preview and icon 


## Defining an app.conf File

Every app.conf file is divided into 4 sections:

1. General section - contains general information such as app's id, description, icon etc...
1. Task - contains the application's entry point information and default parameters
1. Wizard - contains wizard's input fields definitions
1. Dashboard - contains the dashboard's visualizations. Which plots will be shown and where.

### General Section

This section defines the application's general information, such as its name, description, icon, etc.

1. **id** - application id, each application requires a unique a id
1. **version** - version for internal tracking (formatted x.x.x)
1. **name** - application's name, will appear in the application page
1. **provider** - application's vendor. Built-in applications' vendor is ClearML
1. **description** - application's description. This appears in the main applications page as well as in the application window.
1. **icon** - path of the icon - supports all browser viewable formats (jpg, png, svg)
1. **badges** - badges shown on the application card
1. **details_page** - task or project. For debug purposes, should be disabled when released.
1. **no_info_image** - path to a placeholder image that demonstrates how the application's dashboard would look like after running the application.
1. **no_info_html** - path to a placeholder HTML that demonstrates how the application's dashboard would look like after running the application. Comes instead of the *no_info_image*. 

```yaml
id: "my_app"
version: "1.0.0"
name: "My First Application"
provider: "ClearML"
description: """This really is my first app!"""
icon: "apps_assets/my_apps_icon.png"
badges: []
details_page: "task"
no_info_image: "apps_assets/apps-dashboard-preview.svg"
```

### Task
The task section defines the actual application code.

**Sections**
1. **script** - this is information about the actual python code that runs.
    - *repository* - git repository where the code is stored
    - *entry_point* - python code file name 
    - *working_dir* - directory in repository where the script is stored at
    - *tag* - specific git tag
    - *branch* - specific git branch
1. **hyperparams** - this section allows to provide default values for parameters in the code. These parameters need to be defined in the code itself and are broken to sections.
                 parameters defined here will override the code defaults, but can be overriden further from user inputs.
```yaml
task {
  # task fields to use when creating the application task
  # will probably be a dump from an existing task by the creator of the app
  script {
    repository: "https://github.com/allegroai/clearml.git"
    entry_point: "my_app.py"
    working_dir: "apps/hpo/"
    tag: ""
    branch: ""
  }
   hyperparams {
    Args {
      learning_rate: 0.0001,
      batch_size: 32,
    }
    General {
      momentum: 0.01
    }
  }
}
```

TODO - Show example of python code defining parameters, and then how to override them from this section.

### Wizard
TODO HERE COMES A WIZARD IMAGE with title, hint, placeholder, info

The wizard is the application developer's way of allowing users to configure its application. It is comprised of entries.
The wizard interfaces with the python code using hyperparameters and configuration objects. 
Once a wizard is filled and submitted, each field will write the value given by the user to a hyperparameter. Once the python code launches, the 
parameters provided by the wizard will override the code's default ones for this execution.

 ```yaml
wizard {
  entries: [
    {
      type: string
      name: task_id
      title: Optimization Base Task ID
      info: """Provide an <b>existing</b> Task ID to optimize (To obtain the Task ID, choose the Task and click on the ID button on the top of the Task card).
             The HPO process clones it, each cloned Task represents a single optimization experiment with a unique set hyperparameters"""
      target {
        field: hyperparams
        section: Args
        name: base_task_id
      }
    },
    {
      type: dropdown
      name: strategy
      title: Optimization Method
      choices = ["Optuna", "HpBandSter", "Random", "Grid"]
      default: "Optuna"
      target {
        field: hyperparams
        section: Args
        name: strategy
      }
    }
  ]
}
```
**Entry fields**

1. **type**  - This is the field's type. ClearML application supports native types (string. boolean, integer, etc...), lists, dropdown etc... see [here](google.com) for all types
1. **name**  - unique field identifier - Gully - why do we need it? 
1. **title** - this is the text that appear above the input field
1. **hint**  - this is help text that appears below the input field
1. **info**  - adding this field will add an 'i' (TODO add image here) icon next to the field's title. Text in info will apear when hovering above the 'i' icon.
               (TODO - Add hover text image)
1. **placeholder** - fills the field with greyed out text. This text is informative for the user and helps explain the field's purpose, it does not affect the
                     value in the field and if left untouched, will be considered as an empty field. 
1. **required** - by default, all fields must be filled to complete the wizard, for optional field set the required field to *false*
1. **default**  - default value for the field. Makes the field prepopulated
1. **target**   - defines the code object that the field's value will be copied to once the wizard is submitted.    Each target is broken down to 3 sections:
    - *field*   - choose between hyperparams (which are hyperparameters in the application's Task), configuration (which are dictionary configuration objects)
                  and [predefined](https://clear.ml/docs/latest/docs/references/api/definitions#taskssection_params) Task fields, such as name
    - *section* - hyperparam section, Args \ General or custom section. these sections are defined in the application's python code.
    - *name* - name of the specific field

#### Targets
The ClearML application wizard saves the inputs provided by the users into objects in the underlying application Task.
There are 3 possible targets:
1. **hyperparam** - This is the simplest target, it is a hyperparameter that is overriden by the application, just like in the [task section](#task)

    ```yaml
    target {
        field: hyperparams
        section: Args
        name: metric_series
    }
    ```
    This will override the value of Args/metric_series in the application's Task.
    (TODO Add here a python code snippet defining the corresponding field as well as image from the webapp)

1. **configuration** - This target is a configuration object (TODO - add link to docs here) which is a key:value dictionary. This is useful for list fields
                       which their length isn't predefined.
   ```yaml
        target: {
        field: configuration
        name: parameters_list
        format: null
      }
   ```     
   To access information stored in *parameters_list* from the code, (TODO - Ask Moshik \ Gully how to explain this)

1. **predefined task field** - The value of this field overrides The application Task's field values, such as name.
                               You can see all available targets [here](https://clear.ml/docs/latest/docs/references/api/definitions#taskssection_params)
   ```yaml
   {
      type: string
      name: name
      title: Application title
      info: "This will be the application's instance title"
      required: false
      target: name
   }
   ```
   :::note
   Modifying the Task's name will modify the Application instance name in the UI
   :::  
 

#### Types
1. native types - integer, string, float
1. dropdown - a dropdown list of possible choices, an entry should be defined with a *choices* field:
```yaml
   {
      type: dropdown
      name: dropdown
      title: This is A Dropdown List
      choices = ["One", "Two", "Three"]
      target {
        field: hyperparams
        section: Args
        name: dropdown_info
      }
   }
```
   (TODO - ADD List's Image Here)

   adding the *radio: true* field to a dropdown field, will make the options appear as radio buttons. 
   (TODO - Add Image of radio Here)
   
1. list - a list contains variable number of element and is a good widget for when number of inputs is not fixed. A list contains modifiable items that can 
          have fields of their own. <Write what's it good for>
          Each list has an *item_template* field that defines item, which can have single or multiple field of any valid type (native \ dropdown \ etc...).
          A list also has the `min_items` field that defines the minimum amount of items a user has to input.
```yaml
      {
      type: list
      name: unif_param_list
      title: Parameter
      min_items: 0
      target: {
        field: configuration
        name: params
        format: null
      }
      item_template: [
        {
          name: param
          title: Name
          type: string
        },
        {
          name: min_val
          title: Minimum Value
          type: string
        }
        {
          name: max_val
          title: Maximum Value
          type: string
        }
        {
          name: step_size
          title: Step Size
          type: string
        }
      ]
    },
```
1. checkbox
1. multiline_text

### Dashboard
The dashboard configures the visual outputs of the application.
(TODO - Add image of the dashboard)
The dashboard is broken into line, and each line can have multiple widgets in it.
Dashboard display either text or graphs and plots reported by the Application's Task.

Example:
```yaml
dashboard {
  lines: [
    {
      contents: [
        {
          title: "Accuracy"
          type: scalar-histogram
          metric: "accuracy"
          variant: ["last reported","max"]
        },
        {
          title: "Histogram"
          type: plot
          metric: "histogram"
          variant: "latest_histogram"
        }
      ]
    },
    {
      contents: [
        {
          title: "Parallel Coordinates"
          type: plot
          metric: "Parallel Coordinates"
          variant: ""
        },
      ]
    },
  ]
}
```

#### Widget Fields
1. **title** - Name of the field, will appear above it in the dashboard
1. **type**  - Widget type, supported types are: scalar-histogram, plot and html, debug-images, log, hyperparams (section, name), configuration(name) (TODO - Ask shy if it's working)
1. **metric** - Title of metric reported by the Application Task. Relevant for scalar-histogram and plot
1. **variant** - Series of metric reported by the Application Task. Relevant for scalar-histogram and plot
1. **text** - Text to display, Relevant for HTML widgets.

#### Widget Types
There are 3 types of widgets
1. **scalar-histogram** - these are scalars reported to the Application's Task. 
    ```yaml
    {
      title: "Accuracy"
      type: scalar-histogram
      metric: "accuracy"
      variant: ["last reported","max"]
    }
    ```
Each widget shows a single scalar from the Application Task and it's possible choose variants by providing a string or list of strings. (TODO - anything else to add?)
(TODO - Add an image of a scalar-histogram)
1. **plot** - these are plots reported to the Application's Task. It supports all [plots](http://localhost:3000/docs/fundamentals/logger#explicit-reporting-examples) (TODO - is this the best link?) supported in ClearML.
   ```yaml
   {
      title: "Task Type Summary"
      type: plot
      metric: "task info"
      variant: "Tag"
   }
   ```

1. **text** - this is a textbox. It's possible to add HTML tags to the text.
(TODO - Image of the text box)

### Multiline text
For convenience, when writing long texts (in the *info* section for example), you can break it into multiple lines by wrapping like this """text""".
This applies for any fields that show text such as *description*, *info* and *hint*.
```yaml
description: """This is a really good application that improves your life!
                You should really try this application out! it's very good.
                Also, visualizations are amazing! """
```