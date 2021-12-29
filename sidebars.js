/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
    mainSidebar: [
        {'Getting Started': ['getting_started/main', {
            'Where do I start?': [{'Data Scientists': ['getting_started/ds/ds_first_steps', 'getting_started/ds/ds_second_steps', 'getting_started/ds/best_practices']},
                {'MLOps': ['getting_started/mlops/mlops_first_steps','getting_started/mlops/mlops_second_steps','getting_started/mlops/mlops_best_practices']}]
        }, 'getting_started/architecture']},
        {'ClearML Fundamentals': ['fundamentals/task', 'fundamentals/hyperparameters', 'fundamentals/artifacts', 'fundamentals/logger', 'fundamentals/agents_and_queues',
            'fundamentals/hpo', 'fundamentals/pipelines']},
        'clearml_sdk',
        'clearml_agent',
        'clearml_data',
        {'CLI Tools': ['apps/clearml_session', 'apps/clearml_task']},
        {'Integrations': ['integrations/libraries', 'integrations/storage']},

        {'WebApp': ['webapp/webapp_overview', 'webapp/webapp_home',
            {
                'Projects Page': [
                    'webapp/webapp_project_overview',
                    {
                        'Experiments': ['webapp/webapp_exp_table', 'webapp/webapp_exp_track_visual', 'webapp/webapp_exp_reproducing', 'webapp/webapp_exp_tuning',
                            'webapp/webapp_exp_comparing', 'webapp/webapp_exp_sharing']
                    },
                    {'Models': ['webapp/webapp_model_table', 'webapp/webapp_model_viewing', 'webapp/webapp_model_modifying']},
                    'webapp/webapp_archiving']
            },
            'webapp/webapp_profile', 'webapp/webapp_workers_queues',
            'webapp/applications/app_overview'
            ]
        },
        {'Configurations': ['configs/clearml_conf', 'configs/env_vars']},
        //'References': ['references/clearml_ref','references/clearml_agent_ref'],
        {'ClearML Server': ['deploying_clearml/clearml_server',
            {
                'Deploying ClearML Server': ['deploying_clearml/clearml_server_aws_ec2_ami', 'deploying_clearml/clearml_server_gcp',
                    'deploying_clearml/clearml_server_linux_mac', 'deploying_clearml/clearml_server_win', 'deploying_clearml/clearml_server_kubernetes',
                    'deploying_clearml/clearml_server_kubernetes_helm']
            },
            {
                'Upgrading ClearML Server':['deploying_clearml/upgrade_server_aws_ec2_ami','deploying_clearml/upgrade_server_gcp',
                    'deploying_clearml/upgrade_server_linux_mac', 'deploying_clearml/upgrade_server_win',
                    'deploying_clearml/upgrade_server_kubernetes', 'deploying_clearml/upgrade_server_kubernetes_helm',
                    'deploying_clearml/clearml_server_es7_migration']
            },
            'deploying_clearml/clearml_server_config', 'deploying_clearml/clearml_config_for_clearml_server', 'deploying_clearml/clearml_server_security'
        ]},

        //'Comments': ['Notes'],



    ],
    guidesSidebar: [
            'guides/guidemain',
            {'Automation': ['guides/automation/manual_random_param_search_example', 'guides/automation/task_piping']},
            {'Data Management': ['guides/data management/data_man_simple', 'guides/data management/data_man_folder_sync', 'guides/data management/data_man_cifar_classification']},
            {'Clearml Task': ['guides/clearml-task/clearml_task_tutorial']},
            {'Distributed': ['guides/distributed/distributed_pytorch_example', 'guides/distributed/subprocess_example']},
            {'Docker': ['guides/docker/extra_docker_shell_script']},
            {'Frameworks': [
                {'Autokeras': ['guides/frameworks/autokeras/integration_autokeras', 'guides/frameworks/autokeras/autokeras_imdb_example']},
                {'FastAI': ['guides/frameworks/fastai/fastai_with_tensorboard']},
                {
                    'Keras': ['guides/frameworks/keras/allegro_clearml_keras_tb_example', 'guides/frameworks/keras/jupyter', 'guides/frameworks/keras/keras_tensorboard']
                },
                {'Matplotlib': ['guides/frameworks/matplotlib/allegro_clearml_matplotlib_example', 'guides/frameworks/matplotlib/matplotlib_example']},
                {
                    'Pytorch': ['guides/frameworks/pytorch/pytorch_distributed_example', 'guides/frameworks/pytorch/pytorch_matplotlib',
                        'guides/frameworks/pytorch/pytorch_mnist', 'guides/frameworks/pytorch/pytorch_tensorboard', 'guides/frameworks/pytorch/pytorch_tensorboardx',
                        'guides/frameworks/pytorch/tensorboard_toy_pytorch']
                },
                {'Pytorch Ignite': ['guides/frameworks/pytorch ignite/integration_pytorch_ignite']},
                {
                    'Pytorch Notebooks': [
                        {'Audio': ['guides/frameworks/pytorch/notebooks/audio/audio_classification_UrbanSound8K', 'guides/frameworks/pytorch/notebooks/audio/audio_preprocessing_example']},
                        {'Image': ['guides/frameworks/pytorch/notebooks/image/hyperparameter_search', 'guides/frameworks/pytorch/notebooks/image/image_classification_CIFAR10']},
                        {'Table': ['guides/frameworks/pytorch/notebooks/table/download_and_preprocessing', 'guides/frameworks/pytorch/notebooks/table/tabular_training_pipeline']},
                        {'Text': ['guides/frameworks/pytorch/notebooks/text/text_classification_AG_NEWS']}
                    ]
                },
                {'Scikit-Learn': ['guides/frameworks/scikit-learn/sklearn_joblib_example', 'guides/frameworks/scikit-learn/sklearn_matplotlib_example']},
                {'TensorboardX': ['guides/frameworks/tensorboardx/tensorboardx']},
                {
                    'Tensorflow': ['guides/frameworks/tensorflow/tensorboard_pr_curve', 'guides/frameworks/tensorflow/tensorboard_toy',
                        'guides/frameworks/tensorflow/tensorflow_mnist', 'guides/frameworks/tensorflow/integration_keras_tuner']
                },
                {'XGboost': ['guides/frameworks/xgboost/xgboost_sample']}
            ]},
            {'IDEs': ['guides/ide/remote_jupyter_tutorial', 'guides/ide/integration_pycharm', 'guides/ide/google_colab']},
            {'Offline Mode':['guides/set_offline']},
            {'Optimization': ['guides/optimization/hyper-parameter-optimization/examples_hyperparam_opt']},
            {'Pipelines': ['guides/pipeline/pipeline_controller']},

            {'Reporting': ['guides/reporting/explicit_reporting','guides/reporting/3d_plots_reporting', 'guides/reporting/artifacts', 'guides/reporting/clearml_logging_example', 'guides/reporting/html_reporting',
                'guides/reporting/hyper_parameters', 'guides/reporting/image_reporting', 'guides/reporting/manual_matplotlib_reporting', 'guides/reporting/media_reporting',
                'guides/reporting/model_config', 'guides/reporting/pandas_reporting', 'guides/reporting/plotly_reporting',
                'guides/reporting/scalar_reporting', 'guides/reporting/scatter_hist_confusion_mat_reporting', 'guides/reporting/text_reporting']},
            {'Services': ['guides/services/aws_autoscaler', 'guides/services/cleanup_service', 'guides/services/slack_alerts']},
            {'Storage': ['guides/storage/examples_storagehelper']},
            {'Web UI': ['guides/ui/building_leader_board','guides/ui/tuning_exp']}

    ],
    rnSidebar: {
        'Release Notes': ['release_notes/ver_1_1','release_notes/ver_1_0', 'release_notes/ver_0_17', 'release_notes/ver_0_16', 'release_notes/ver_0_15', 'release_notes/ver_0_14',
            'release_notes/ver_0_13', 'release_notes/ver_0_12', 'release_notes/ver_0_11', 'release_notes/ver_0_10',
            'release_notes/ver_0_9',
        ],
    },
    sdkSidebar: [
            'references/sdk/task',
            'references/sdk/logger',
            {'Model': ['references/sdk/model_model',
                'references/sdk/model_inputmodel', 'references/sdk/model_outputmodel',]},
            'references/sdk/storage',
            'references/sdk/dataset',
            {'Pipeline': ['references/sdk/automation_controller_pipelinecontroller',
                'references/sdk/automation_job_clearmljob']},
            {'HyperParameter Optimization': [
                'references/sdk/hpo_optimization_hyperparameteroptimizer',
                'references/sdk/hpo_optimization_gridsearch',
                'references/sdk/hpo_optimization_randomsearch',
                'references/sdk/hpo_optuna_optuna_optimizeroptuna',
                'references/sdk/hpo_hpbandster_bandster_optimizerbohb',
                'references/sdk/hpo_parameters_discreteparameterrange',
                'references/sdk/hpo_parameters_uniformintegerparameterrange',
                'references/sdk/hpo_parameters_uniformparameterrange',
                'references/sdk/hpo_parameters_parameterset',
                ]},
    ],

    hyperdatasetsSidebar: [
        'hyperdatasets/overview',
        {'Frames': [
            'hyperdatasets/frames',
            'hyperdatasets/single_frames',
            'hyperdatasets/frame_groups',
            'hyperdatasets/sources',
            'hyperdatasets/annotations',
            'hyperdatasets/masks',
            'hyperdatasets/previews',
            'hyperdatasets/custom_metadata'
            ]},
        'hyperdatasets/dataset',
        'hyperdatasets/dataviews',
        'hyperdatasets/task',
        {'WebApp': [
            {'Dataviews': [
                'hyperdatasets/webapp/webapp_dataviews',
                'hyperdatasets/webapp/webapp_exp_modifying',
                'hyperdatasets/webapp/webapp_exp_track_visual',
                'hyperdatasets/webapp/webapp_exp_comparing',
                ]},
            {'Datasets': [
                'hyperdatasets/webapp/webapp_datasets',
                'hyperdatasets/webapp/webapp_datasets_versioning',
                'hyperdatasets/webapp/webapp_datasets_frames'
                ]},
            'hyperdatasets/webapp/webapp_annotator'
        ]}
    ],


    apiSidebar: [
        'references/api/definitions',
        'references/api/endpoints',
    ],

};
