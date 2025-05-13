# ClearML Tenant with Self Signed Certificates

This guide covers the configuration to support SSL Custom certificates for the following components:

- ClearML Enterprise AI Application Gateway 
- ClearML Enterprise Agent

## AI Application Gateway

Add the following section in the `clearml-app-gateway-values.override.yaml` file:

``` yaml
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

In the section, there are two options:

- Replace the whole `ca-certificates.crt` file
- Add extra certificates to the existing `ca-certificates.crt`

Letâ€™s see them in detail.

### Replace the whole `ca-certificates.crt` file

If you need to replace the whole ca-bundle you can attach a concatenation of all your valid CA in a `pem` format like they are stored in a standard `ca-certificates.crt`.

``` yaml
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

### Add extra certificates to the existing `ca-certificates.crt`

To add extra certificates to the standard provided CA available in the container you can define any specific certificate in the list.

Ensure to provide different aliases.

``` yaml
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

### Apply changes

After applying the changes ensure to run the update command:

``` bash
helm upgrade -i <RELEASE_NAME> -n <WORKLOAD_NAMESPACE> clearml-enterprise/clearml-enterprise-app-gateway --version <CHART_VERSION> -f clearml-app-gateway-values.override.yaml
```

## ClearML Enterprise Agent

Add the following section in the `clearml-agent-values.override.yaml` file:

``` yaml
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

In the section, there are two options:

- Replace the whole `ca-certificates.crt` file
- Add extra certificates to the existing `ca-certificates.crt`

Letâ€™s see them in detail.

### Replace the whole `ca-certificates.crt` file

If you need to replace the whole ca-bundle you can attach a concatenation of all your valid CA in a `pem` format like they are stored in a standard `ca-certificates.crt`.

``` yaml
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

### Add extra certificates to the existing `ca-certificates.crt`

To add extra certificates to the standard provided CA available in the container you can define any specific certificate in the list.

Ensure to provide different aliases.

``` yaml
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

### Add certificates to Tasks

``` yaml
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

Please note the `clearml-extra-ca-certs` volume, ensure to add each configMap created by the agent.

The name can differ based on the release name used during the installation.

### Apply changes

After applying the changes ensure to run the update command:

``` bash
helm upgrade -i -n <WORKER_NAMESPACE> clearml-agent clearml-enterprise/clearml-enterprise-agent --create-namespace -f clearml-agent-values.override.yaml
```