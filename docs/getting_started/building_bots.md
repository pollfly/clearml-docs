---
title: Building Bots
---

You can use ClearML to build bots monitor tasks, sending notifications and alerts based on specific events or conditions.

The base `Monitor` class provides essential functionalities that enable developers to implement task monitoring logic 
tailored to their requirements. The Monitor class can be extended to create custom bot logic.

This is useful for:
* Real-Time Task Monitoring: Automate the tracking of task statuses (e.g., completed, failed) to streamline workflows 
  and reduce manual log-checking.
* Custom Notification Logic: Implement specific filtering criteria based on task names, project identifiers, or other 
  criteria to receive alerts that are relevant to your needs.
* Resource Efficiency: Utilize a customizable polling mechanism to minimize resource usage while continuously monitoring
  tasks.

The Monitor class can be extended to introduce custom bot logic. For example, by overriding the `process_task` method, you 
can define specific actions to be taken when a task reaches a certain status—whether it’s sending notifications through 
various channels (like Slack, email, etc.), logging to a database, or triggering automated responses.


Using a Slack Bot for ClearML Task Monitoring

Overview

Integrating a Slack bot with ClearML allows teams to stay informed about task statuses in real time. This is especially 
useful for monitoring machine learning experiments and automation workflows. By leveraging the ClearML automation 
monitor, you can receive Slack notifications for completed or failed tasks, helping teams react quickly and maintain
smooth operations.

$$$$$$$By using a ClearML Slack bot, teams can streamline their workflow, stay informed, and quickly address critical task updates without manually checking logs or dashboards.


Use Cases and Benefits

2. Real-Time Monitoring - Get instant Slack notifications for completed or failed ClearML tasks. Reduce the need for manual log-checking by receiving automated updates.
3. Customizable Alerts - Configure alerts to report only failed tasks, completed tasks, or both.

Set filters for specific projects, users, or iteration thresholds to avoid unnecessary notifications.

## SlackBot example

This integration is powered by `clearml.automation.monitor`, which allows for efficient task tracking. The `SlackMonitor` 
class extends the Monitor class from ClearML and enables customized Slack notifications based on task events. The bot 
retrieves task details such as:

* Task status (completed or failed)
* Console output logs
* ClearML Web UI links

The ClearML monitor is a highly flexible object that allows deep visibility into the ClearML ecosystem. It can provide 
insights into task completions, failures, and various other ClearML-generated events. One powerful use case is leveraging 
this monitor to create a Slack bot that keeps users informed about task progress. The Slack bot is built using a set of 
Slack APIs around the monitor, providing real-time notifications about task statuses.

The Slack bot is fully equipped with numerous configurable arguments, making it versatile for different workflows. While
the provided example can be used as a command-line tool, users can also customize it to fit their specific needs. The 
bot can be added to a Slack workspace and configured to report only specific types of tasks, such as failed tasks, 
completed tasks, or those from designated projects. This eliminates the need for manual monitoring and allows users to 
stay informed effortlessly.

For a full example and detailed setup, refer to the Slack Alerts Example.


