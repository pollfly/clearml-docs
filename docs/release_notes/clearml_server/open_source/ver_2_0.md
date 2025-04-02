---
title: Version 2.0
---

### ClearML Server 2.0.1

**New Features**
* New UI task creation options
  * Support bash as well as python scripts
  * Support file upload

**Bug Fixes**
* Fix ctrl-f does not open a search bar in UI editor modals ([ClearML Web GitHub issue #99](https://github.com/clearml/clearml-web/issues/99))
* Fix UI smoothed plots are dimmer than original plots in dark mode ([ClearML Server GitHub issue #270](https://github.com/clearml/clearml-server/issues/270))
* Fix webserver configuration environment variables don't load with single-quoted strings
* Fix image plots sometimes not rendered in UI
* Fix "All" tag filter not working in UI model selection modal in comparison pages
* Fix manual refresh function sometimes does not work in UI task 
* Fix UI embedded plot colors do not change upon UI theme change
* Fix deleting a parameter in the UI task creation modal incorrectly removes another parameter
* Fix UI global search displays aborted tasks as completed
* Fix can't show/hide specific UI plot variants
* Fix UI breadcrumbs sometimes does not display project name

### ClearML Server 2.0.0

**Breaking Changes**
MongoDB major version was upgraded from `v5.x` to `6.x`. Please note that if your current ClearML Server version is older than 
`v1.17` (where MongoDB `v5.x` was first used), you'll need to first upgrade to ClearML Server v1.17.

Upgrading to ClearML Server v1.17 from a previous version:
* If using `docker-compose`, use the following files:
  * [docker-compose file](https://github.com/clearml/clearml-server/blob/2976ce69cc91550a3614996e8a8d8cd799af2efd/upgrade/1_17_to_2_0/docker-compose.yml)
  * [docker-compose file for Windows](https://github.com/clearml/clearml-server/blob/2976ce69cc91550a3614996e8a8d8cd799af2efd/upgrade/1_17_to_2_0/docker-compose-win10.yml)

**New Features**
* New look and feel: Full light/dark themes ([ClearML GitHub issue #1297](https://github.com/clearml/clearml/issues/1297))
* New UI task creation options
  * Support bash as well as Python scripts
  * Support file upload
* New UI setting for configuring cloud storage credentials with which ClearML can clean up cloud storage artifacts on task deletion ([ClearML Server GitHub issue #144](https://github.com/clearml/clearml-server/issues/144)).
* Add UI scalar plots presentation of plots in sections grouped by metrics.
* Add UI batch export plot embed codes for all metric plots in a single click.
* Add UI pipeline presentation of steps grouped into stages

**Bug Fixes**
* Fix UI Model Endpoint's Number of Requests plot sometimes displays incorrect data
* Fix UI Incorrect project statistics in project page
* Fix UI datasets page does not filter according to project when dataset is running
* Fix UI task scalar legend does not change colors when smoothing is enabled
* Fix queue list in UI Workers and Queues page does not alphabetically sort by queue display name
* Fix queue display name is not searchable in UI Task Creation modal's queue field