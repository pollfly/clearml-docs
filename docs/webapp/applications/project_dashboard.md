---
title: Project Dashboard
---

Project Dashboard Application - UI for monitoring a project's progress, a metric’s statistics, and GPU and worker usage. 
The app also supports Slack alerts for task failure.

The dashboard app is supposed to show useful info about a project. It is ALSO about tracking metric (or metrics, later on), 
but also how many GPUs it's using, how many workers and so on

So it's a...dashboard for you project that shows useful information


* Name - app name
* Project - project to monitor
* Metric Title
* Metric Series
* Metric Sign - choose whether to track the metric's maximum or minimum value
* Refresh rate - Dashboard's refresh rate in seconds
* Slack API  Token - Token for Slack workspace
* Channel - Slack channel to send messages to 
* Min iterations - minimum number of iterations to warn about failure. 


Once the app launched, a few plots appear: 
* task status
* tag summary
* experiments 
* monitoring
* metric monitoring
* active workers
* workers table