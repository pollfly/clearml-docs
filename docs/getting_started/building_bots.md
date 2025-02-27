---
title: Building Bots
---
Using a Slack Bot for ClearML Task Monitoring

Overview

Integrating a Slack bot with ClearML allows teams to stay informed about task statuses in real time. This is especially useful for monitoring machine learning experiments and automation workflows. By leveraging the ClearML automation monitor, you can receive Slack notifications for completed or failed tasks, helping teams react quickly and maintain smooth operations.

Use Cases and Benefits

1. Real-Time Monitoring

Get instant Slack notifications for completed or failed ClearML tasks.

Reduce the need for manual log-checking by receiving automated updates.

2. Enhanced Collaboration

Teams can stay informed about experiment progress without constantly checking the ClearML UI.

Shared alerts ensure that failures or completions are visible to relevant team members.

3. Customizable Alerts

Configure alerts to report only failed tasks, completed tasks, or both.

Set filters for specific projects, users, or iteration thresholds to avoid unnecessary notifications.

ClearML Integration

This integration is powered by clearml.automation.monitor, which allows for efficient task tracking. The SlackMonitor class extends the Monitor class from ClearML and enables customized Slack notifications based on task events. The bot retrieves task details such as:

Task status (completed or failed)

Console output logs

ClearML Web UI links

The ClearML monitor is a highly flexible object that allows deep visibility into the ClearML ecosystem. It can provide insights into task completions, failures, and various other ClearML-generated events. One powerful use case is leveraging this monitor to create a Slack bot that keeps users informed about task progress. The Slack bot is built using a set of Slack APIs around the monitor, providing real-time notifications about task statuses.

The Slack bot is fully equipped with numerous configurable arguments, making it versatile for different workflows. While the provided example can be used as a command-line tool, users can also customize it to fit their specific needs. The bot can be added to a Slack workspace and configured to report only specific types of tasks, such as failed tasks, completed tasks, or those from designated projects. This eliminates the need for manual monitoring and allows users to stay informed effortlessly.

Setting Up the Slack Bot

To configure and use the Slack Bot:

Create a Slack App:

Visit Slack API and create a new app.

Define the bot's name and workspace.

Set up necessary permissions (channels:join, channels:read, chat:write).

Generate a Bot User OAuth Access Token.

Run the Monitoring Service:

Deploy the script locally or through ClearML Agent services mode.



Example Implementation

A working example of the Slack integration is available in ClearML. The script slack_alerts.py demonstrates how to monitor tasks and send alerts. Key features include:

Configurable parameters (e.g., monitoring specific projects, excluding users, adjusting refresh rates).

Slack message formatting with task details and output links.

Remote execution using Task.execute_remotely().

For a full example and detailed setup, refer to the Slack Alerts Example.

By using a ClearML Slack bot, teams can streamline their workflow, stay informed, and quickly address critical task updates without manually checking logs or dashboards.

