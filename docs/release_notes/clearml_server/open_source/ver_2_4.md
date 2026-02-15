---
title: Version 2.4
---

### ClearML Server 2.4.0

**New features and Improvements**
* Add show/hide matching filter control to UI Task Scalars and Plots ([ClearML #744](https://github.com/clearml/clearml/issues/744), 
  [ClearML #1253](https://github.com/clearml/clearml/issues/1253))
* Task Comparison view: Display task color indicators in task list instead of task legend ([ClearML #1461](https://github.com/clearml/clearml/issues/1461))
* Add support for setting task type during UI task creation ([ClearML Web #115](https://github.com/clearml/clearml-web/issues/115))
* Add configuration-based overrides for default Elasticsearch mappings
* Add UI task clone options to reset Python requirements
* Update Elastic to version 8.19.9
* Make Task Repository URL in Task Execution tab clickable
* Support short project names (fewer than 3 characters)

**Bug Fixes**
* Fix API Server sometimes crashes on sharded Redis deployments ([ClearML Server #305](https://github.com/clearml/clearml-server/issues/305))
* Fix UI bulk task reset affecting published tasks ([ClearML #1490](https://github.com/clearml/clearml/issues/1490))
* UI Object table filters:
  * Fix "User" filter in UI "All Models" table not displaying users who have no tasks
  * Fix "User" filter displaying outdated usernames after name change
* Fix tasks not appearing in the correct queue after being moved in **UI Orchestration > Queues**
* Fix UI Task Scalars tab hiding multiple graphs with the same name when toggling one
* Fix scientific notation can't be used in integer/float fields in UI Pipeline "New Run" modal
* Fix "Enqueue" button is enabled in UI Task "Enqueue" / " Retry" modal when "Queue" field is blank
* Global search
  * Fix filter section not displaying by default when switching from Advanced to Basic search modes
  * Fix filter indicator appearing on all search tabs instead of the active tab
  * Fix spaces being removed while typing in search term
* Fix Project Path icon displayed on Root Project folder in UI Reports page
* Fix last graph legends in UI task table comparison view are obscured
* Fix project tag filters displaying task tags in UI Projects
* Fix sorting not working in UI task comparison selection
* Fix missing "Edit" button in task Configuration tab
* Fix UI comparison plots incorrectly merging subplots with multiple variants
* Fix "No data to show" message incorrectly appearing while UI pages load
* Fix Projects Workload graph's tooltip does not display all legends
