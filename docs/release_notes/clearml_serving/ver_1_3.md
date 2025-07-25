---
title: Version 1.3
---

### ClearML Serving 1.3.1 
**New Features and Bug Fixes**
* Add missing `await` ([#55](https://github.com/clearml/clearml-serving/pull/55))
* Add traceback for failing to load `preprocess` class ([#57](https://github.com/clearml/clearml-serving/issues/57))
* Fix Triton `config.pbtxt` for missing values or colliding specifications ([#62](https://github.com/clearml/clearml-serving/issues/62))
* Add safer code for pulling from Kafka
* Add `str` type to Triton type conversion
* Fix ignore auto-detected platform when passing `config.pbtxt` with platform entry
* Fix Triton engine model with multiple versions was not properly supported
* Fix serving session keep alive is also sent on idle
* Log preprocess exceptions with full stack trace to serving session console output


### ClearML Serving 1.3.0
**New Features and Improvements**
* 20% Overall performance increase 
* gRPC channel configuration ([#49](https://github.com/clearml/clearml-serving/issues/49)) 
* Hugging Face Transformer example 

**Bug fixes**
* Fix NumPy compatibility ([#47](https://github.com/clearml/clearml-serving/issues/47) and [#46](https://github.com/clearml/clearml-serving/issues/46))
* Fix Triton examples  ([#48](https://github.com/clearml/clearml-serving/issues/48))
* Add storage environment variables ([#45](https://github.com/clearml/clearml-serving/pull/45))