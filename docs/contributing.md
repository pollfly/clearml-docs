---
title: Contributing
---

<div class="vid">
<iframe 
        src="https://www.youtube.com/embed/cd4u-UShOFk?si=BBXtkImzS0Vi8Xth" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
        allowfullscreen>
</iframe>
</div>

<br/>

Thank you for your interest in contributing to ClearML! There are many ways you can help improve the project, such as:

* Reporting issues you encounter on [GitHub](https://github.com/allegroai/clearml/issues)  
* Participating in discussions on GitHub issues or in the [ClearML Slack channel](https://joinslack.clear.ml)  
* Suggesting new features or improvements  
* Submitting pull requests to fix bugs or implement new features

The following are just guidelines to get you started, but feel free to use your judgment and propose changes to this document or the project.

## ClearML GitHub Repositories

ClearML is maintained across multiple repositories on GitHub. You can explore and contribute to any of the following:

* [**clearml**](https://github.com/clearml/clearml): The ClearML  SDK and command line utilities, which includes experiment management and automation tools.  
* [**clearml-server**](https://github.com/clearml/clearml-server): The backend server code that powers ClearML.  
* [**clearml-agent**](https://github.com/clearml/clearml-agent): The orchestration agent for running tasks on remote machines.  
* [**clearml-web**](https://github.com/clearml/clearml-web): The web interface to the ClearML server.  
* [**clearml-serving**](https://github.com/clearml/clearml-serving): Tools for model deployment and orchestration.  
* [**clearml-docs**](https://github.com/clearml/clearml-docs): The repository where the documentation is maintained.

### Documentation

One of the easiest ways to contribute is by helping with the documentation. If you find areas that could be clearer or 
more accurate, feel free to submit an issue or a pull request on the **clearml-docs** repository. We welcome examples, explanations, and improvements.

### SDK

If you're working with the ClearML SDK, here are some valuable ways to contribute:

* **Add ClearML as an External Logger:** ClearML can be integrated as an external logger in third-party experiment 
  managers like HuggingFace and YOLOv5 (as long as maintainers approve 😀).   
* **Examples**: Share workflows, pipelines, or use cases demonstrating ClearML’s capabilities.  
* **Extend the auto-magic**: ClearML's integration with external libraries like TensorFlow and PyTorch allows for automatic 
  logging of metrics, models, and other information. This functionality relies on 
  [bindings](https://github.com/clearml/clearml/tree/master/clearml/binding): ClearML essentially wraps the library's 
  functions to perform their original tasks while also capturing and logging data. Feel free to enhance these integrations 
  or introduce new ones.  
* **Custom hyperparameter searches or automations**: Share tools or automations you've built to optimize experiments.  
* **CLI improvements**: Suggest enhancements or new command-line arguments.


## Reporting Issues and Suggesting New Features

To help maintainers and the community understand your report, reproduce the behavior, and find related discussions, 
follow these guidelines:

Before reporting an issue, please check whether it already appears [here](https://github.com/clearml/clearml/issues). If 
it does, join the ongoing discussion instead.

:::note
If you find a `Closed` issue that may be the same issue that you are currently experiencing, then open a new issue and 
include a link to the original (Closed) issue in the body of your new one.
:::

When reporting an issue, please include as much detail as possible:

* A clear and descriptive title that summarizes the issue  
* Step-by-step instructions to reproduce the problem  
* Your environment setup, including:  
  * `pip freeze` output  
  * Relevant environment variables  
  * Python version  
  * Other relevant information.  
* Specific examples demonstrating the issue. Include links to files or GitHub projects, or copy / paste snippets which 
 you use in those examples.  
* Crash reports (if applicable): Provide stack traces from the operating system, as a [code block](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks), 
  a [file attachment](https://help.github.com/articles/file-attachments-on-issues-and-pull-requests), or a GitHub 
  [gist](https://gist.github.com/) (and provide a link to that gist).  
* Observed vs. expected behavior: Explain what happened and what you expected.  
* For WebApp (UI) issues, please include screenshots and animated GIFs that recreate the described steps and clearly 
  demonstrate the problem. You can use [LICEcap](https://www.cockos.com/licecap) to record GIFs on macOS and Windows, 
  and [silentcast](https://github.com/colinkeenan/silentcast) or [byzanz](https://github.com/threedaymonk/byzanz) on Linux.

## Submitting Pull Requests

When you're ready to submit a pull request (PR), please make sure your contribution meets the following criteria:

1. **Address an existing issue**: Ideally, your PR should correspond to an existing issue on GitHub. If not, open one and explain the problem your PR solves.  
2. **Join the discussion**: Check the ClearML Slack community or the GitHub issue tracker to see if there’s ongoing conversation about your proposed changes.  
3. **Follow ClearML's coding standards**: Before submitting, run the following command to ensure your code meets our style guidelines:  

   ```  
   flake8 --max-line-length=120 --statistics --show-source --extend-ignore=E501 ./clearml*
   ```

In your PR, include:

* A reference to the GitHub issue that it addresses.  
* A brief summary of your approach and any important design decisions.

Your contributions help make ClearML better for everyone, and we're grateful for your efforts. Thank you for your support\!