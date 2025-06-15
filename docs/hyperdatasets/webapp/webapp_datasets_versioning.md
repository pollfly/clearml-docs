---
title: Dataset Versions
---

:::important ENTERPRISE FEATURE
Hyper-Datasets are available under the ClearML Enterprise plan.
:::

Use the Dataset versioning WebApp (UI) features for viewing, creating, modifying, and 
deleting [Dataset versions](../dataset.md#dataset-versioning).

![Dataset versions page](../../img/hyperdatasets/dataset_versions.png#light-mode-only)
![Dataset versions page](../../img/hyperdatasets/dataset_versions_dark.png#dark-mode-only)

## Dataset Version History
The WebApp (UI) presents your dataset version structure in tree view <img src="/docs/latest/icons/ico-tree-view.svg" alt="Tree view" className="icon size-md space-sm" />
or list view <img src="/docs/latest/icons/ico-list-view.svg" alt="List view" className="icon size-md space-sm" />. 

The tree view shows the lineage of the dataset's versions.

<div class="max-w-50">

![Versions tree view](../../img/hyperdatasets/dataset_simple_adv_02.png#light-mode-only)
![Versions tree view](../../img/hyperdatasets/dataset_simple_adv_02_dark.png#dark-mode-only)

</div>

The list view lists the dataset's versions chronologically by last update time.

<div class="max-w-50">

![Versions list view](../../img/hyperdatasets/dataset_simple_adv_01.png#light-mode-only)
![Versions list view](../../img/hyperdatasets/dataset_simple_adv_01_dark.png#dark-mode-only)

</div>

Click <img src="/docs/latest/icons/ico-sort.svg" alt="Sort order" className="icon size-md space-sm" /> to order the 
dataset versions in ascending or descending order based on their last update time. 

Use the search bar to find specific versions. You can query by version name, version description, or version ID. The search returns 
all versions that match the query.

In tree view, parent versions that do not match the query where a child version does appear in a muted color.

<div class="max-w-50">

![Dataset version search](../../img/hyperdatasets/hyperdataset_search_2.png#light-mode-only)
![Dataset version search](../../img/hyperdatasets/hyperdataset_search_2_dark.png#dark-mode-only)

</div>

### Version Actions 

Access dataset version actions, by right-clicking a version, or through the menu button <img src="/docs/latest/icons/ico-dots-v-menu.svg" alt="Dot menu" className="icon size-md space-sm" /> (available on hover).

* **Rename** - Change the version's name
* **Create New Version** - Creates a child version of a *Published* dataset version. The new version is created in a *draft*
  state, and inherits all the parent version's frames
* **Delete** - Delete the version. Only *Draft* versions can be deleted.  
* **Publish** - Make a *Draft* version read-only to preserve its contents. 
 
:::tip Publishing versions
When publishing a version, you can create an additional working copy. The new version is created in a *draft* state, and 
inherits all the published version's frames. 

<div class="max-w-75">

![Publish version modal](../../img/hyperdatasets/hyperdataset_publish_version.png#light-mode-only)
![Publish version modal](../../img/hyperdatasets/hyperdataset_publish_version_dark.png#dark-mode-only)

</div>

:::

## Version Data
A selected dataset version's information and contents are presented on the main section of the page, to the right of 
the dataset's version list.

The version information is presented in the following tabs:
* [Frames](#frames)
* [Statistics](#statistics)
* [Metadata](#metadata) 
* [Info](#info) 
   
## Frames
The **Frames** tab displays the contents of the selected dataset version.

View the version's frames as thumbnail previews or in a table. Use the view toggle to switch between thumbnail 
view <img src="/docs/latest/icons/ico-grid-view.svg" alt="thumbnail view" className="icon size-md space-sm" /> and 
table view <img src="/docs/latest/icons/ico-table-view.svg" alt="table view" className="icon size-md space-sm" />. 

Use the thumbnail view for a visual preview of the version's frames. You can increase <img src="/docs/latest/icons/ico-zoom-in.svg" alt="Zoom in" className="icon size-md space-sm" /> 
and decrease <img src="/docs/latest/icons/ico-zoom-out.svg" alt="Zoom out" className="icon size-md space-sm" /> the size of 
the previews.

![Frame browser thumbnails](../../img/hyperdatasets/frame_browser_thumbnails.png#light-mode-only)
![Frame browser thumbnails](../../img/hyperdatasets/frame_browser_thumbnails_dark.png#dark-mode-only)

Use the table view to list the version's frames in a customizable table. Click <img src="/docs/latest/icons/ico-settings.svg" alt="Setting Gear" className="icon size-md" />
for column customization options.

![Frame browser list](../../img/hyperdatasets/frame_browser_list.png#light-mode-only)
![Frame browser list](../../img/hyperdatasets/frame_browser_list_dark.png#dark-mode-only)

The dataset version's frames can be filtered by multiple criteria. The resulting frames can be [exported as a JSON file](#exporting-frames). 

To view the details of a specific frame, click on its preview, which will open the [Frame Viewer](webapp_datasets_frames.md#frame-viewer).

### Frame Filtering

A combination of ROI, frame, and source rules can be specified to apply more elaborate and specific 
filters.

**To apply filters:**
1. In the **FRAMES** tab, click <img src="/docs/latest/icons/ico-advanced-filters.svg" alt="Advanced filters" className="icon size-md space-sm" /> (**Filters**).
1. In a **FRAME FILTER**, create one of the following rules:
   * ROI rule - Use "Include" and "Exclude" conditions to match frames according to an ROI label. If the "Include" 
   condition is used, frames match the rule if they contain at least one annotation object (ROI) with ALL labels in the 
   rule. If the "Exclude" condition is used, frames match the rule if NONE of their ROIs contain the label. Multiple ROI 
   rules in the same filter are evaluated independently against all frame ROIs. Meaning, a frame will match the filter 
   if it contains at least one annotation matching each rule, even if the annotations are in different ROIs. Click <img src="/docs/latest/icons/ico-code.svg" alt="Lucene query mode" className="icon size-md space-sm" /> 
   to explicitly specify your rule with Lucene 
   * Frame rule - Query frame metadata. Enter a Lucene query of frame metadata fields in the format `meta.<key>:<value>` 
   (can use AND, OR, and NOT operators).
   * Source rule - Query frame source information. Enter a Lucene query of frame metadata fields in the format 
   `sources.<key>:<value>` (can use AND, OR, and NOT operators).
   
A frame filter can contain a number of rules. For each frame filter, the rules are applied with a logical AND operator. For example, the dataset version in the image below has one filter. "Frame Filter 1" has two rules: 
1. ROI rule - the frame must include an ROI with the `cat` label
2. Source rule - the frames must be 640 pixels wide. 

The returned frames are those that match the first rule AND the second rule within the frame filter.

![Multiple rules filter](../../img/hyperdatasets/multiple_rules.png#light-mode-only)
![Multiple rules filter](../../img/hyperdatasets/multiple_rules_dark.png#dark-mode-only)

Create additional frame filters by clicking <img src="/docs/latest/icons/ico-add.svg" alt="Add new" className="icon size-md space-sm" />. 
Multiple frame filters are applied with a logical OR operator. 

For example, the dataset version in the image below has two frame filters. "Frame Filter 1" has the same two rules 
described in the example above. "Frame Filter 2" specifies an ROI rule for the frame to contain an ROI with the label 
`dog`. So the frames returned are those that match ALL of Frame Filter 1's rules OR ALL of Frame Filter 2's rules.  

![Multiple filters](../../img/hyperdatasets/multiple_filters.png#light-mode-only)
![Multiple filters](../../img/hyperdatasets/multiple_filters_dark.png#dark-mode-only)

To clear all filters click <img src="/docs/latest/icons/ico-filter-reset.svg" alt="Clear filters" className="icon size-md" />. 

### Vector Search

**Vector search** finds the most similar frames to a specific reference vector. Frames are evaluated based on vector 
embeddings that have been registered to them through the SDK.

To find the frames most similar to one of the frames in the version: 
1. Hover over the desired frame
1. Click <img src="/docs/latest/icons/ico-dots-v-menu.svg" alt="Dot menu" className="icon size-md space-sm" />
1. Select `Find Nearest Frames By`
1. Choose the frame’s vector field  that will be compared against the reference vector
1. Input the [search configuration](#search-configuration)

To find the frames  most similar to an arbitrary vector:
1. In the **FRAMES** tab, click  <img src="/docs/latest/icons/ico-filter-off.svg" alt="Filter" className="icon size-md" /> (filters)
1. Under **Vector search**, enter the vector values under **Reference vector**.
1. Input the [search configuration](#search-configuration)

#### Search Configuration
* **Vector field** - Select the FrameGroup's vector field that will be compared against the reference vector.
* **Number of neighbors** - Choose how many nearest neighbors to show.
* **Search strategy** - Either of:
  * `KNN` (K-nearest neighbors) 
  * `HNSW` (Hierarchical Navigable Small World) - Available with cosine similarity only.
* **Similarity function** - Select `Cosine similarity`, `Euclidean distance`, or `Dot product`. 

After entering the search configuration, click **Apply**.

The frames are returned in order of their similarity to the reference vector. The calculated similarity is displayed on 
each frame preview:

![Vector Search](../../img/hyperdatasets/vector_search.png#light-mode-only)
![Vector Search](../../img/hyperdatasets/vector_search_dark.png#dark-mode-only)

Vector search results adhere to configured frame filters. For example, if you filter for frames containing the ROI label
`cat`, the search will return only the nearest neighbors among frames with that ROI.

### Filtering Examples

<Collapsible type="screenshot" title="ROI Rules"> 

* Create one ROI rule for the `teddy bear` label. Only frame containing at least one ROL labeled `teddy bear` match the 
  filter

![Adding an ROI rule](../../img/hyperdatasets/frame_filtering_03.png#light-mode-only)
![Adding an ROI rule](../../img/hyperdatasets/frame_filtering_03_dark.png#dark-mode-only)

* In the ROI rule, add a second label. Add `partially_occluded`. Only frames containing at least one ROI labeled as both 
  `teddy bear` and `partially_occluded` match the filter.
  
![Add label to ROI rule](../../img/hyperdatasets/frame_filtering_04.png#light-mode-only)
![Add label to ROI rule](../../img/hyperdatasets/frame_filtering_04_dark.png#dark-mode-only)
   
* By opening a frame in the frame viewer, you can see an ROI labeled with both.

![Labeled ROIs in frame viewer](../../img/hyperdatasets/frame_filtering_05.png#light-mode-only)
![Labeled ROIs in frame viewer](../../img/hyperdatasets/frame_filtering_05_dark.png#dark-mode-only)

* To find frames that contain multiple ROIs, each with a different label, use separate ROI rules. Create an ROI rule for
  the `teddy bear` label and, in the same filter, add another ROI rule for the `person` label. This will return all 
  frames that include at least one ROIs with a `person` label AND at least one (other) ROI with a `teddy bear` label. 

![Add multiple ROI Rules](../../img/hyperdatasets/frame_filtering_06.png#light-mode-only)
![Add multiple ROI Rules](../../img/hyperdatasets/frame_filtering_06_dark.png#dark-mode-only)

* You can also exclude certain ROI labels. Create an ROI rule to include `teddy bear` and, in the same filter, an ROI 
  rule to exclude `person`. This will return all frames that include at least one ROI with the label `teddy bear` AND have
  NO ROI with the `person` label

![Add Exclude ROI Rule](../../img/hyperdatasets/frame_filtering_07.png#light-mode-only)
![Add Exclude ROI Rule](../../img/hyperdatasets/frame_filtering_07_dark.png#dark-mode-only)

</Collapsible>

<Collapsible type="screenshot" title="Frame Rules: Metadata">

Filter by metadata using Lucene queries.

* Add a frame rule to filter by the metadata key `dangerous` for the value of `yes`.
  
![Filter by metadata](../../img/hyperdatasets/frame_filtering_08.png#light-mode-only)
![Filter by metadata](../../img/hyperdatasets/frame_filtering_08_dark.png#dark-mode-only)

* Open a frame in the frame viewer to see its metadata.
  
![Frame metadata in frame viewer](../../img/hyperdatasets/frame_filtering_09.png#light-mode-only)
![Frame metadata in frame viewer](../../img/hyperdatasets/frame_filtering_09_dark.png#dark-mode-only)

</Collapsible>

<Collapsible type="screenshot" title="Frame Rules: Date and Time Fields">

If your dataset includes a metadata field that stores date and time information, you can filter 
based on date ranges or specific time intervals. 

Filter by date/time metadata fields using Lucene queries.

* **Data range filter**
  * Add a frame rule to filter by the metadata key `updated` for the value of `[2024-10-20 TO 2024-10-20]`. The query 
  will match all frames where the `updated` value matches October 20th 2024. Use the format `meta.<field_name>.[YYYY-MM-DD TO YYYY-MM-DD]`. 

    ![Filter by date](../../img/hyperdatasets/frame_filtering_11.png#light-mode-only)
    ![Filter by date](../../img/hyperdatasets/frame_filtering_11_dark.png#dark-mode-only)

  * Open a frame in the frame viewer to see its metadata.

    ![Frame date metadata in frame viewer](../../img/hyperdatasets/frame_filtering_12.png#light-mode-only)
    ![Frame date metadata in frame viewer](../../img/hyperdatasets/frame_filtering_12_dark.png#dark-mode-only)

* **Time interval filter** 
  * Add a frame rule to filter by the metadata key `updated` for the value of `[2024-10-20T08:00:00 TO 2024-10-20T09:00:00]`. 
  The query will match all frames where the updated value is between 08:00 and 09:00 on October 20th 2024. 
  Use the format `meta.<field_name>.[YYYY-MM-DDThh:mm:ss TO YYYY-MM-DDThh:mm:ss]`. 
  
    ![Filter by datetime](../../img/hyperdatasets/frame_filtering_13.png#light-mode-only)
    ![Filter by datetime](../../img/hyperdatasets/frame_filtering_13_dark.png#dark-mode-only)
  
  * Open a frame in the frame viewer to see its metadata.  

    ![Frame datetime metadata in frame viewer](../../img/hyperdatasets/frame_filtering_14.png#light-mode-only)
    ![Frame datetime metadata in frame viewer](../../img/hyperdatasets/frame_filtering_14_dark.png#dark-mode-only)
  
</Collapsible>

<Collapsible type="screenshot" title="Source Rules">

Filter by sources using Lucene queries.    

* Add a source rule to filter for source URIs with wildcards.
  
![Filter by source](../../img/hyperdatasets/frame_filtering_10.png#light-mode-only)
![Filter by source](../../img/hyperdatasets/frame_filtering_10_dark.png#dark-mode-only)

Lucene queries can also be used in ROI label filters and frame rules.

</Collapsible>      

### Sorting Frames 

Sort the dataset version’s frames by any of the following attributes:
* ID 
* Last update time
* Dimensions (height)
* Timestamp
* Context ID
* Metadata key - Click `+ Metadata Key` and select the desired key for sorting

Click <img src="/docs/latest/icons/ico-sort.svg" alt="Sort order" className="icon size-md space-sm" /> to toggle between ascending and descending sort orders.

![Dataset frame sorting](../../img/hyperdatasets/dataset_frame_sorting.png#light-mode-only)
![Dataset frame sorting](../../img/hyperdatasets/dataset_frame_sorting_dark.png#dark-mode-only)

### Exporting Frames

To export (download) the filtered frames as a JSON file, click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" /> > **EXPORT FRAMES**. 

### Frame Browser Configuration
Click <img src="/docs/latest/icons/ico-bars-menu.svg" alt="Menu" className="icon size-md space-sm" />  to open the
frame browser configuration settings. 

<div class="max-w-75">

![Frame browser config menu](../../img/hyperdatasets/frame_browser_menu.png#light-mode-only)
![Frame browser config menu](../../img/hyperdatasets/frame_browser_menu_dark.png#dark-mode-only)

</div>

#### Grouping Previews

Use the **Grouping** menu to set how to display frames that share a common property:
* **Split Preview** - Show a separate preview for each individual FrameGroup
* **Group by URL** - Show a single preview for all FrameGroups with the same context ID. For example, users can set the 
same `context_id` to multiple FrameGroups that represent frames in a single video.
* **Sample by Property** - Specify a frame or ROI property whose value to group frames by and set the number of frames 
to preview for each group. For example, in the image below, frames are grouped by ROI labels. Each group displays five 
samples of frames that contain an ROI with the same label.

![Sample by property](../../img/hyperdatasets/dataset_sample_by_roi_property.png#light-mode-only)
![Sample by property](../../img/hyperdatasets/dataset_sample_by_roi_property_dark.png#dark-mode-only)

**To sample by property:**
1. In the **Grouping** menu, click **Sample by Property**
1. In the **Sample by Property** modal, input the following:
      * Select the Property type:
         * ROI - Properties associated with the frame ROIs (e.g. ROI label names, IDs, confidence, etc.) 
         * Frame -  Properties associated with the frames (e.g. update time, metadata, timestamp, etc.)
      * Property name - Property whose value to group the frames by 
      * Sample size - Number of frames to preview for each group
      * ROI match query (*For grouping by ROI property only*) - A Lucene query to filter which of a frame's ROIs
      to use in grouping by their properties. For example, in a Hyper-Dataset where ROIs have object labels and type labels, 
      view a sample of frames with different types of the same object by grouping frames according to `label.keyword`
      with a match query for the object of interest.
      <br/>      
      <div class="max-w-50">
   
      ![Sample by Property modal](../../img/hyperdatasets/sample_by_property_modal.png#light-mode-only)
      ![Sample by Property modal](../../img/hyperdatasets/sample_by_property_modal_dark.png#dark-mode-only)
      
      </div>
   
      The image below shows a sample of 3 frames which have ROIs of each type (`pedestrian`, `rider`, `sitting`) of `person`.

      ![ROI Match Query](../../img/hyperdatasets/roi_match_query.png#light-mode-only)
      ![ROI Match Query](../../img/hyperdatasets/roi_match_query_dark.png#dark-mode-only)
      :::note Property N/A group
      If there are frames which have no value for the grouped by property, a sample of them will be provided as a final
      group. If you sample according to an ROI property, this group will NOT include frames that have no ROIS at all.
      :::
1. Click **Save**

Once saved, whenever you select the **Sample by Property** option in the **Grouping** menu, the frame will be grouped 
according to the previously configured setting. 

**To modify the grouping property:**
1. Hover over **Sample by Property** 
1. Click <img src="/docs/latest/icons/ico-edit.svg" alt="Edit pencil" className="icon size-md space-sm" />
1. Modify the **Sample by Property** configuration
1. Click **Save**



#### Preview Source
When using multi-source FrameGroups, users can choose which of the FrameGroups' sources will be displayed as the preview. 

Select a source from the **Current Source** menu.
Choose the `Default preview source` option to present the first available source for each frame (sources are retrieved in ASCIIbetical order).

Choose the `All sources` option to present all the FrameGroup’s sources in a grid. In this view, the annotation panel 
shows annotations grouped by their respective sources. Additionally, annotation tools  (e.g. create/delete/modify 
annotations) are not available in this view.    

![All sources preview](../../img/hyperdatasets/preview_all_sources.png#light-mode-only)
![All sources preview](../../img/hyperdatasets/preview_all_sources_dark.png#dark-mode-only)

:::note Unavailable Source
If a FrameGroup doesn't have the selected preview source, the preview displays the "Source not available" message.
::: 

## Statistics

The **Statistics** tab allows exploring frame and ROI property distribution across a Hyper-Dataset version:
1. Query the frames to include in the statistics calculations under using [frame filters](#frame-filtering). 
   If no filter is applied, all frames in the dataset version will be included in the calculation. 
1. Select the property whose distribution should be calculated 
   * Select the property **Type**:
      * **ROI** - Frame ROI properties (e.g. ROI label, ID, confidence, etc.). This will calculate the distribution of 
     the specified property across all ROIs in the version's frames.
      * **Frame** - Frames properties (e.g. update time, metadata keys, timestamp, etc.)
   * Input the **Property** key (e.g. `meta.location`) 
   * If **ROI** property was selected, you can also limit the scope of ROIs included in the calculation with the
   **Count ROIs matching** filter: Input a Lucene query to specify which ROIs to count
1. Click **Apply** to calculate the statistics 

For example, calculating the distribution for the `label` ROI property, specifying `rois.confidence: 1` for ROI matching 
will show the label distribution across only ROIs with a confidence level of 1.

![Distribution by ROI property](../../img/hyperdatasets/dataset_version_statistics_roi.png#light-mode-only)
![Distribution by ROI property](../../img/hyperdatasets/dataset_version_statistics_roi_dark.png#dark-mode-only)

By default, the ROI label distribution across the entire Hyper-Dataset version is shown.
The tab displays the following information
* Object counts:
    * Number of annotations matching specification
    * Number of annotated frames in the current frame filter selection
    * Total number of frames in the current frame filter selection
* Each property is listed along with its number of occurrences in the current frame filter selection
* The pie chart visualizes this distribution. Hover over a chart segment and its associated property and count will 
appear in a tooltip and its usage percentage will appear at the center of the chart.
  
![Version label statistics](../../img/hyperdatasets/dataset_version_statistics.png#light-mode-only)
![Version label statistics](../../img/hyperdatasets/dataset_version_statistics_dark.png#dark-mode-only)

## Metadata
The **Metadata** tab presents any additional metadata that has been attached to the dataset version.

**To edit a version's metadata,**

1. Hover over the metadata box and click **EDIT**
1. Edit the section contents (JSON format)
1. Click **OK**

![Version metadata](../../img/hyperdatasets/dataset_version_metadata.png#light-mode-only)
![Version metadata](../../img/hyperdatasets/dataset_version_metadata_dark.png#dark-mode-only)

## Info

The **Info** tab presents a version's general information:
* Version ID 
* Version name  
* Dataset ID 
* Dataset name 
* Dataset description
* Dataset tags  
* Status (*Draft* or *Published*) 
* Creating user
* Version update time
* Number of frames
* Percentage of annotated frames  
* Version description (editable, hover over element and click <img src="/docs/latest/icons/ico-edit.svg" alt="Edit pencil" className="icon size-md space-sm" />) 

![Version info](../../img/hyperdatasets/dataset_version_info_panel.png#light-mode-only)
![Version info](../../img/hyperdatasets/dataset_version_info_panel_dark.png#dark-mode-only)

