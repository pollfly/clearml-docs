---
title: Cleanup Service
---

The Cleanup Service Application is a GUI for deleting old archived experiments and their artifacts and models.
This service helps in maintaining an organized workspace by clearing out the archive clutter.

## Launching a Cleanup Service instance

To launch a Cleanup Service instance:
1. Navigate to the Cleanup Service App
1. Click <img src="/docs/latest/icons/ico-add.svg" alt="add instance" className="icon size-sm space-sm" />
1. Insert configurations:       
   * **Name** - name of app instance* 
   * **Projects** - Projects to monitor. To monitor whole workspace, leave blank.
     * **+ Add item**  - Add project name
   * **Deletion Threshold** - Archived experiments older than this many days will be deleted
   * **Cleanup Period** - Days between cleanups
   * **Delete Artifacts** - Choose whether to delete artifacts and models of tasks that are deleted
1. Click **LAUNCH NEW**
   

Once the instance is launched, you will be able to see the **Total deleted experiments** of the instance, 
and the number of **Experiments deleted last iteration**. 