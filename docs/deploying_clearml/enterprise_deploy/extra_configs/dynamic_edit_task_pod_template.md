ðŸŸ¢ Ready
TODO in future:
- Add NFS Example - https://allegroai.atlassian.net/wiki/x/AoCUiQ?atlOrigin=eyJpIjoiMjNiNTcxYTJiMzUxNDVhMThiODlhMTcwYzE1YWE3ZTUiLCJwIjoiYyJ9

---

# Dynamically Edit Task Pod Template

The ClearML Enterprise Agent supports defining custom Python code for interacting with a Task's Pod template before it gets applied to Kubernetes.

This allows to dynamically edit a Task Pod manifest in the context of a ClearML Enterprise Agent and can be useful in a variety of scenarios such as customizing fields based on variables.

# Agent Configuration

The `CLEARML_K8S_GLUE_TEMPLATE_MODULE` environment variable is used to indicate a Python module and function inside that module for the ClearML Enterprise Agent to run before applying a Task Pod template. The Agent will run this code from its own context, pass some arguments (including the actual template) to the function and use the returned template to create the final Task Pod in Kubernetes.

Arguments passed to the function include:

`queue` - ID of the queue (string) from which the task was pulled.

`queue_name` - Name of the queue (string) from which the task was pulled.

`template` - Base template (python dictionary) created from the agentâ€™s values, with any specific overrides for the queue from which the task was pulled.

`task_data` - Task data structure (object) containing the taskâ€™s information (as returned by the tasks.get_by_id API call). For example, use task_data.project to get the taskâ€™s project ID.

`providers_info` - Providers info (dictionary) containing optional information collected for the user running this task when the user logged into the system (requires additional server configuration).

`task_config` - Task configuration (clearml_agent.backend_config.Config object) containing the configuration used to run this task. This includes any overrides added in Vaults applicable for the user running this task. Use task_config.get("...") to get specific configuration values.

`worker` - the agent Python object, in case custom calls might be required.

## Usage

Edit the `clearml-agent-values.override.yaml` file adding the following:

``` yaml
agentk8sglue:
  extraEnvs:
   - name: CLEARML_K8S_GLUE_TEMPLATE_MODULE
     value: "custom_code:update_template"
  fileMounts:
    - name: "custom_code.py"
      folderPath: "/root"
      fileContent: |-
        import json
        from pprint import pformat 
        
        def update_template(queue, task_data, providers_info, template, task_config, worker, queue_name, *args, **kwargs):
          print(pformat(template))
          
          my_var_name = "foo"
          my_var_value = "bar"
          
          try:
              template["spec"]["containers"][0]["env"][0]["name"] = str(my_var_name)
              template["spec"]["containers"][0]["env"][0]["value"] = str(my_var_value)
          except KeyError as ex:
              raise Exception("Failed modifying template: {}".format(ex))

          return {"template": template}
```

## Notes

**Note**: Make sure to include `*args, **kwargs` at the end of the functionâ€™s argument list and to only use keyword arguments. This is needed to maintain backward compatibility and make sure any added named arguments or changes in the arguments order in new agent versions wonâ€™t affect your implementation.

**Note**: Custom code modules can be included as a file in the Pod's container and the environment variable can be used to simply point to the file and entry point.

**Note**: When defining a custom code module, by default the ClearML Etnerprise Agent will start watching Pods in all namespaces across the Cluster. If you do not intend to give a ClusterRole permission, make sure to set the `CLEARML_K8S_GLUE_MONITOR_ALL_NAMESPACES` env to `"0"` to prevent the ClearML Enterprise Agent to try listing Pods in all namespaces. Instead, set it to `"1"` if namespace-related changes are needed in the code.

``` yaml
agentk8sglue:
  extraEnvs:
    - name: CLEARML_K8S_GLUE_MONITOR_ALL_NAMESPACES
      value: "0"
```

**Note**: If you want instead to modify the Bash script used to start the Task Pod or the Agent, see here instead:

``` yaml
agentk8sglue:
  # -- Custom Bash script for the Agent pod ran by Glue Agent
  customBashScript: ""
  # -- Custom Bash script for the Task Pods ran by Glue Agent
  containerCustomBashScript: ""
```

# Examples

## Example â€“ Edit Template based on ENV var

``` yaml
agentk8sglue:
  extraEnvs:
   - name: CLEARML_K8S_GLUE_TEMPLATE_MODULE
     value: "custom_code:update_template"
  fileMounts:
    - name: "custom_code.py"
      folderPath: "/root"
      fileContent: |-
        import json
        from pprint import pformat 
        def update_template(queue, task_data, providers_info, template, task_config, worker, queue_name, *args, **kwargs):
          print(pformat(template))
          
          my_var = "some_var"
          
          try:
              template["spec"]["initContainers"][0]["command"][-1] = \
                  template["spec"]["initContainers"][0]["command"][-1].replace("MY_VAR", str(my_var))
              template["spec"]["containers"][0]["volumeMounts"][0]["subPath"] = str(my_var)
          except KeyError as ex:
              raise Exception("Failed modifying template with MY_VAR: {}".format(ex))

          return {"template": template}
  basePodTemplate:
    initContainers:
      - name: myInitContainer
        image: docker/ubuntu:18.04
        command:
          - /bin/bash
          - -c
          - >
            echo MY_VAR;
        volumeMounts:
        - name: myTemplatedMount
          mountPath: MY_VAR
    volumes:
      - name: myTemplatedMount
        emptyDir: {}
```

## Example â€“ NFS Mount Path

``` yaml
agentk8sglue:
  extraEnvs:
   - name: CLEARML_K8S_GLUE_TEMPLATE_MODULE
     value: "custom_code:update_template"
  fileMounts:
    - name: "custom_code.py"
      folderPath: "/root"
      fileContent: |-
        import json
        from pprint import pformat
        def update_template(queue, task_data, providers_info, template, task_config, worker, queue_name, *args, **kwargs):
            nfs = task_config.get("nfs")
            # ad_role = providers_info.get("ad-role")
            if nfs: # and ad_role == "some-value"
                print(pformat(template))
        
                try:
                    template["spec"]["containers"][0]["volumeMounts"].append(
                      {"name": "custom-mount", "mountPath": nfs.get("mountPath")}
                    )
                    template["spec"]["containers"][0]["volumes"].append(
                      {"name": "custom-mount", "nfs": {"server": nfs.get("server.ip"), "path": nfs.get("server.path")}}
                    )
                except KeyError as ex:
                    raise Exception("Failed modifying template: {}".format(ex))
        
            return {"template": template}
```

# Bind Additional Resources to Task Pod (PVC Example)

In this example, a dedicated PVC is dynamically created and attached to every Pod created from a dedicated queue, then deleted after the Pod deletion.

The following code block is commented to explain the context.

The key points are:

- `CLEARML_K8S_GLUE_POD_PRE_APPLY_CMD` and `CLEARML_K8S_GLUE_POD_POST_DELETE_CMD` env vars let you define custom bash code hooks to be executed around the main apply command by the Agent, such as creating and deleting a PVC object.

- `CLEARML_K8S_GLUE_TEMPLATE_MODULE` env var and a file mount let you define custom Python code in a specific context, useful to dynamically update the main Pod template before the Agent applies it.

**Note**: This example uses a queue named `pvc-test`, make sure to replace all occurrences of it.

**Note**: `CLEARML_K8S_GLUE_POD_PRE_APPLY_CMD` can reference templated vars as `{queue_name}, {pod_name}, {namespace}` that will get replaced with the actual value by the Agent at execution time.

``` yaml
agentk8sglue:
  # Bind a pre-defined custom 'custom-agent-role' Role with the ability to handle 'persistentvolumeclaims'
  additionalRoleBindings:
    - custom-agent-role
  extraEnvs:
    # Need this or permissions to list all namespaces
    - name: CLEARML_K8S_GLUE_MONITOR_ALL_NAMESPACES
      value: "0"
    # Executed before applying the Task Pod. Replace the $PVC_NAME placeholder in the manifest template with the Pod name and apply it, only in a specific queue.
    - name: CLEARML_K8S_GLUE_POD_PRE_APPLY_CMD
      value: "[[ {queue_name} == 'pvc-test' ]] && sed 's/\\$PVC_NAME/{pod_name}/g' /mnt/yaml-manifests/pvc.yaml | kubectl apply -n {namespace} -f - || echo 'Skipping PRE_APPLY PVC creation...'"
    # Executed after deleting the Task Pod. Delete the PVC.
    - name: CLEARML_K8S_GLUE_POD_POST_DELETE_CMD
      value: "kubectl delete pvc {pod_name} -n {namespace} || echo 'Skipping POST_DELETE PVC deletion...'"
    # Define a custom code module for updating the Pod template
    - name: CLEARML_K8S_GLUE_TEMPLATE_MODULE
      value: "custom_code:update_template"
  fileMounts:
    # Mount a PVC manifest file with a templated $PVC_NAME name
    - name: "pvc.yaml"
      folderPath: "/mnt/yaml-manifests"
      fileContent: |
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: $PVC_NAME
        spec:
          resources:
            requests:
              storage: 5Gi
          volumeMode: Filesystem
          storageClassName: standard
          accessModes:
            - ReadWriteOnce
    # Custom code module for updating the Pod template
    - name: "custom_code.py"
      folderPath: "/root"
      fileContent: |-
        import json
        from pprint import pformat 
        def update_template(queue, task_data, providers_info, template, task_config, worker, queue_name, *args, **kwargs):
          if queue_name == "pvc-test":
            # Set PVC_NAME as the name of the Pod
            PVC_NAME = f"clearml-id-{task_data.id}"
            try:
              # Replace the claimName placeholder with a dynamic value
              template["spec"]["volumes"][0]["persistentVolumeClaim"]["claimName"] = str(PVC_NAME)
            except KeyError as ex:
              raise Exception("Failed modifying template with PVC_NAME: {}".format(ex))
          # Return the edited template
          return {"template": template}
  createQueues: true
  queues:
    # Define a queue with an override `volumes` and `volumeMounts` section for binding a PVC
    pvc-test:
      templateOverrides:
        volumes:
          - name: task-pvc
            persistentVolumeClaim:
              # PVC_NAME placeholder. This will get replaced in the custom code module.
              claimName: PVC_NAME
        volumeMounts:
          - mountPath: "/tmp/task/"
            name: task-pvc
```

Example of `custom-agent-role` Role with permissions to handle `persistentvolumeclaims`:

``` yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: custom-agent-role
rules:
- apiGroups:
  - ""
  resources:
  - persistentvolumeclaims
  verbs:
  - get
  - list
  - watch
  - create
  - patch
  - delete
```