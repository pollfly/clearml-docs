---
title: Version 2.1
---

### ClearML 2.1.0

**New Features**
* Add Hyper-Datasets support (Enterprise server required)
* Update `datetime` usage ([#1491](https://github.com/clearml/clearml/pull/1491))
* Remove support for Python 3.5 and lower in required packages
* Add support for multiple ports/endpoints in `Task.request_external_endpoint()` and router (Enterprise server required)
* Improve GPU reporting on ARM GPUs
* Add model fine-tuning and model embedding examples ([#1483](https://github.com/clearml/clearml/pull/1483))

**Bug Fixes**
* Fix `Task.init()` fails for tags with tuple type ([#1468](https://github.com/clearml/clearml/pull/1468))
* Make sure git diffs are always valid inputs for `git apply` ([#1479](https://github.com/clearml/clearml/pull/1479))
* Fix duplicate files in dataset uploads ([#1463](https://github.com/clearml/clearml/pull/1479))
* Fix transient error in machine stats should not break reporting