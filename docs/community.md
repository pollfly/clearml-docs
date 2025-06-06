---
title: Community Resources
---

## Join the ClearML Conversation

For feature requests or bug reports, see **ClearML** [GitHub issues](https://github.com/clearml/clearml/issues).

If you have any questions, post on the **ClearML** [Slack channel](https://joinslack.clear.ml).

Or, tag your questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/clearml) with the **clearml** tag.

You can always find us at [support@clear.ml](mailto:support@clear.ml?subject=ClearML).

## Additional ClearML Resources

Read the [ClearML Blog](https://clear.ml/blog/).

Subscribe to the **ClearML** [YouTube Channel](https://www.youtube.com/c/ClearML) and view the tutorials, presentations, and discussions.

Join us on Twitter [@clearmlapp](https://twitter.com/clearmlapp) for **ClearML** announcements and community discussions.

Follow **ClearML** on [LinkedIn](https://www.linkedin.com/company/clearml).

## Guidelines for Contributing

Firstly, thank you for taking the time to contribute!

Contributions come in many forms:

* Reporting [issues](https://github.com/clearml/clearml/issues) you've come upon
* Participating in issue discussions in the [issue tracker](https://github.com/clearml/clearml/issues) and the
  [ClearML Community Slack space](https://joinslack.clear.ml)
* Suggesting new features or enhancements
* Implementing new features or fixing outstanding issues

The list above is primarily guidelines, not rules. Use your best judgment and feel free to propose changes to this document in a pull request.

## Reporting Issues

By following these guidelines, you help maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before reporting an issue, please check whether it already appears [here](https://github.com/clearml/clearml/issues). If 
it does, join the ongoing discussion instead.

:::note
If you find a **Closed** issue that may be the same issue that you are currently experiencing, then open a **New** issue 
and include a link to the original (Closed) issue in the body of your new one.
:::

When reporting an issue, please include as much detail as possible; explain the problem and include additional details to 
help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps necessary to reproduce the problem** in as much detail as possible. Please do not just summarize what you did. Make sure to explain how you did it.
* **Provide the specific environment setup.** Include the ``pip freeze`` output, specific environment variables, Python version, and other relevant information.
* **Provide specific examples to demonstrate the steps.** Include links to files or GitHub projects, or copy / paste snippets which you use in those examples.
* **If you are reporting any ClearML crash,** include a crash report with a stack trace from the operating system. Make 
  sure to add the crash report in the issue and place it in a [code block](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks), 
  a [file attachment](https://help.github.com/articles/file-attachments-on-issues-and-pull-requests), or put it in 
  a [gist](https://gist.github.com) (and provide a link to that gist).
* **Describe the behavior you observed after following the steps** and the exact problem with that behavior.
* **Explain which behavior you expected to see and why.**
* **For WebApp (UI) issues, please include screenshots and animated GIFs** that recreate the described steps and clearly demonstrate 
  the problem. You can use [LICEcap](https://www.cockos.com/licecap) to record GIFs on macOS and Windows, and [silentcast](https://github.com/colinkeenan/silentcast)
  or [byzanz](https://github.com/threedaymonk/byzanz) on Linux.

## Suggesting New Features and Enhancements

By following these guidelines, you help maintainers and the community understand your suggestion and find related suggestions.

Enhancement suggestions are tracked as GitHub issues. After you determine which repository your enhancement suggestion is related to, create an issue on that repository and provide the following:

* **A clear and descriptive title** for the issue to identify the suggestion.
* **A step-by-step description of the suggested enhancement** in as much detail as possible.
* **Specific examples to demonstrate the steps.** Include copy / pasteable snippets which you use in those examples as 
  [Markdown code blocks](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks).
* **Describe the current behavior and explain which behavior you expected to see instead and why.**
* **Include screenshots or animated GIFs** that help you demonstrate the steps or point out the part of ClearML which the 
  suggestion is related to. You can use [LICEcap](https://www.cockos.com/licecap) to record GIFs on macOS and Windows, and 
  [silentcast](https://github.com/colinkeenan/silentcast) or [byzanz](https://github.com/threedaymonk/byzanz) on Linux.

## Pull Requests


Before you submit a new PR:

* Verify that the work you plan to merge addresses an existing [issue](https://github.com/clearml/clearml/issues) (if not, open a new one)
* Check related discussions in the [ClearML Slack community](https://joinslack.clear.ml) 
  (or start your own discussion on the ``#clearml-dev`` channel)
* Make sure your code conforms to the ClearML coding standards by running:
  
  ```
  flake8 --max-line-length=120 --statistics --show-source --extend-ignore=E501 ./clearml*
  ```

In your PR include:

* A reference to the issue it addresses
* A brief description of your implementation approach 