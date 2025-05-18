---
title: ClearML Tenant with Self Signed Certificates
---

This guide covers how to configure the [AI Application Gateway](#ai-application-gateway) and [ClearML Agent](#clearml-agent) 
to use self-signed or custom SSL certificates. 

## AI Application Gateway

To configure certificates for the Application Gateway, update your `clearml-app-gateway-values.override.yaml` file:

```yaml
# -- Custom certificates
customCertificates:
  # -- Override system crt certificate bundle. Mutual exclusive with extraCerts.
  overrideCaCertificatesCrt:
  # -- Extra certs usable in case of needs of adding more certificates to the standard bundle, Requires root permissions to run update-ca-certificates. Mutual exclusive with overrideCaCertificatesCrt.
  extraCerts:
     - alias: certificateName
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
```

You have two configuration options:

- [**Replace**](#replace-entire-ca-certificatescrt-file) the entire `ca-certificates.crt` file
- [**Append**](#append-extra-certificates-to-the-existing-ca-certificatescrt) extra certificates to the existing `ca-certificates.crt`


### Replace Entire ca-certificates.crt File

To replace the whole ca-bundle, provide a concatenated list of all trusted CA certificates in `pem` format as 
they are stored in a standard `ca-certificates.crt`.

```yaml
# -- Custom certificates
customCertificates:
  # -- Override system crt certificate bundle. Mutual exclusive with extraCerts.
  overrideCaCertificatesCrt: |
    -----BEGIN CERTIFICATE-----
    ### CERT 1
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    ### CERT 2
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    ### CERT 3
    -----END CERTIFICATE-----
   ...
```

### Append Extra Certificates to the Existing ca-certificates.crt

You can add certificates to the existing CA bundle. Each certificate must have a unique `alias`.

```yaml
# -- Custom certificates
customCertificates:
  # -- Extra certs usable in case of needs of adding more certificates to the standard bundle, Requires root permissions to run update-ca-certificates. Mutual exclusive with overrideCaCertificatesCrt.
  extraCerts:
     - alias: certificate-name-1
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
     - alias: certificate-name-2
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
```

### Apply Changes

To apply the changes, run the update command:

```bash
helm upgrade -i <RELEASE_NAME> -n <WORKLOAD_NAMESPACE> clearml-enterprise/clearml-enterprise-app-gateway --version <CHART_VERSION> -f clearml-app-gateway-values.override.yaml
```

## ClearML Agent

For the ClearML Agent, configure certificates in the `clearml-agent-values.override.yaml` file:

```yaml
# -- Custom certificates
customCertificates:
  # -- Override system crt certificate bundle. Mutual exclusive with extraCerts.
  overrideCaCertificatesCrt:
  # -- Extra certs usable in case of needs of adding more certificates to the standard bundle, Requires root permissions to run update-ca-certificates. Mutual exclusive with overrideCaCertificatesCrt.
  extraCerts:
     - alias: certificateName
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
```

You have two configuration options:

- [**Replace**](#replace-entire-ca-certificatescrt-file-1) the entire `ca-certificates.crt` file
- [**Append**](#append-extra-certificates-to-the-existing-ca-certificatescrt-1) extra certificates to the existing `ca-certificates.crt`


### Replace Entire ca-certificates.crt File

To replace the whole ca-bundle, provide a concatenated list of all trusted CA certificates in `pem` format as 
they are stored in a standard `ca-certificates.crt`.


```yaml
# -- Custom certificates
customCertificates:
  # -- Override system crt certificate bundle. Mutual exclusive with extraCerts.
  overrideCaCertificatesCrt: |
    -----BEGIN CERTIFICATE-----
    ### CERT 1
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    ### CERT 2
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    ### CERT 3
    -----END CERTIFICATE-----
   ...
```

### Append Extra Certificates to the Existing ca-certificates.crt

You can add certificates to the existing CA bundle. Each certificate must have a unique `alias`.

```yaml
# -- Custom certificates
customCertificates:
  # -- Extra certs usable in case of needs of adding more certificates to the standard bundle, Requires root permissions to run update-ca-certificates. Mutual exclusive with overrideCaCertificatesCrt.
  extraCerts:
     - alias: certificate-name-1
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
     - alias: certificate-name-2
       pem: |
         -----BEGIN CERTIFICATE-----
         ###
         -----END CERTIFICATE-----
```

### Add Certificates to Task Pods

If your workloads need access to these certificates (e.g., for HTTPS requests), configure the agent to inject them into pods:

```yaml
agentk8sglue:
  basePodTemplate:
    initContainers:
      - command:
        - /bin/sh
        - -c
        - update-ca-certificates
        image: allegroai/clearml-enterprise-agent-k8s-base:<AGENT-VERSION-AVAIABLE-ON-REPO>
        imagePullPolicy: IfNotPresent
        name: init-task
        volumeMounts:
          - name: etc-ssl-certs
            mountPath: "/etc/ssl/certs"
          - name: clearml-extra-ca-certs
            mountPath: "/usr/local/share/ca-certificates"
    env:
      - name: REQUESTS_CA_BUNDLE
        value: /etc/ssl/certs/ca-certificates.crt
    volumeMounts:
      - name: etc-ssl-certs
        mountPath: "/etc/ssl/certs"
    volumes:
      - name: etc-ssl-certs
        emptyDir: {}
      - name: clearml-extra-ca-certs
        projected:
          defaultMode: 420
          sources:
# LIST HERE CONFIGMAPS CREATED BY THE AGENT CHART, THE CARDINALITY DEPENDS ON THE NUMBER OF CERTS PROVIDED.
          - configMap:
              name: clearml-agent-clearml-enterprise-agent-custom-ca-0
          - configMap:
              name: clearml-agent-clearml-enterprise-agent-custom-ca-1
```

The `clearml-extra-ca-certs` volume must include all `ConfigMap` resources generated by the agent for the custom certificates.
These `ConfigMaps` are automatically created by the Helm chart based on the number of certificates provided.
Their names are usually prefixed with the Helm release name, so adjust accordingly if you used a custom release name.

### Apply Changes

Apply the changes by running the update command:

``` bash
helm upgrade -i -n <WORKER_NAMESPACE> clearml-agent clearml-enterprise/clearml-enterprise-agent --create-namespace -f clearml-agent-values.override.yaml
```