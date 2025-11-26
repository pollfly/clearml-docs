---
title: UI Customization
---

## Task Clone Name Template

Control the template used to provide default suggestions for [cloning tasks](../webapp_exp_reproducing.md) e.g. `"Clone Of <Original task name>"`. 

The template supports dynamic variable references that are filled in when a task is cloned:
* `${name}` - The original task’s name
* `${date}` – The time the clone was created (e.g. `21/3/2025 12:45:15`)