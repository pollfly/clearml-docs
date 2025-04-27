---
title: Text Reporting
---

The [text_reporting.py](https://github.com/clearml/clearml/blob/master/examples/reporting/text_reporting.py) script 
demonstrates reporting text output and samples. 

When the script runs, it creates a task named `text reporting` in the `examples` project.



## Reporting Text to Console
To report text to the task console, call [`Logger.report_text()`](../../references/sdk/logger.md#report_text)

```python
# report text
Logger.current_logger().report_text("hello, this is plain text")
```

Text reported with `Logger.report_text()` appears in the task's **CONSOLE** tab in the ClearML Web UI. 

![Text to console](../../img/examples_reporting_text.png#light-mode-only)
![Text to console](../../img/examples_reporting_text_dark.png#dark-mode-only)

## Reporting Text as Debug Samples
To report longer text as a debug sample (e.g., logs, large text outputs, or structured text files),
use [`Logger.report_media()`](../../references/sdk/logger.md#report_media) with a text stream and `.txt` file extension.

```python
text_to_send = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Suspendisse ac justo ut dolor scelerisque posuere.
...
"""

Logger.current_logger().report_media(
    title="text title",
    series="text series",
    iteration=1,
    stream=six.StringIO(text_to_send),
    file_extension=".txt",
)
```

Text samples appear in the task's **DEBUG SAMPLES** tab in the ClearML Web UI.

![Text debug sample](../../img/examples_reporting_text_debug.png#light-mode-only)
![Text debug sample](../../img/examples_reporting_text_debug_dark.png#dark-mode-only)
