/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {themes as prismThemes} from 'prism-react-renderer';

const path = require('path');

const config = {
  future: {
    experimental_faster: true,
  },
};

module.exports = {
  title: 'ClearML',
  tagline: 'Auto-Magical Suite of tools to streamline your AI workflow',
  url: 'https://clear.ml',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'clearml', // Usually your GitHub org/user name.
  projectName: 'ClearML', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
    imageZoom: {
      // CSS selector to apply the plugin to, defaults to '.markdown img'
      selector: '.markdown img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        margin: 24,
        background: "transparent"
      },
    },

    //algolia algolia: {
      //algolia appId: 'ALGOLIA_APP_ID', // The application ID provided by Algolia
      //algolia apiKey: 'ALGOLIA_APP_KEY',  // Public API key
      //algolia indexName: 'ALGOLIA_INDEX_NAME', // index name

      // Optional: see doc section below
      //algolia contextualSearch: true,},
    zoomSelector: '.markdown :not(em) > img',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
      // switchConfig: {
        // darkIcon: '\u{1F319}',
        // lightIcon: '\u{1F315}',
        // darkIconStyle: {
          // marginLeft: '2px',
        // },
        // lightIconStyle: {
          // marginLeft: '1px',
        // },
      // },
    },
    announcementBar: {
      id: 'supportus',
      content: 'If you ❤️ ️<b>ClearML</b>, ⭐️ us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/clearml/clearml">GitHub</a>!',
      isCloseable: true,
    },
    navbar: {
      style: 'dark',
      hideOnScroll: true,
      title: ' ',
      logo: {
        alt: 'ClearML',
        src: 'img/logo.svg',
        href: 'https://clear.ml/'
      },
      items: [
        {
          to: '/docs/',
          label: 'Overview',
          position: 'left',
          activeBaseRegex: '^/docs/latest/docs/(fundamentals/agents_and_queues|hyper_datasets|clearml_agent(/(clearml_agent_dynamic_gpus|clearml_agent_fractional_gpus)?|)?|cloud_autoscaling/autoscaling_overview|remote_session|model_registry|deploying_clearml/enterprise_deploy/appgw|build_interactive_models|deploying_models|custom_apps)?$',
        },
        {
          label: 'Setup',
          position: 'left', // or 'right'
          to: '/docs/clearml_sdk/clearml_sdk_setup',
          activeBaseRegex: '^/docs/latest/docs/(deploying_clearml(?!/enterprise_deploy/appgw(/.*)?$)(/.*)?$|clearml_sdk/clearml_sdk_setup|user_management(/.*)?|clearml_agent/(clearml_agent_setup|clearml_agent_deployment_bare_metal|clearml_agent_deployment_k8s|clearml_agent_deployment_slurm|clearml_agent_execution_env|clearml_agent_env_caching)|integrations/storage)/?$',
          activeClassName: 'navbar__link--active',
          items: [
            {
              label: 'Free/Open Source',
              to: 'docs/clearml_sdk/clearml_sdk_setup',
              activeBaseRegex: '^/docs/latest/docs/(deploying_clearml(?!/enterprise_deploy/appgw(/.*)?$)(/.*)?$|clearml_sdk/clearml_sdk_setup|user_management(/.*)?|clearml_agent/(clearml_agent_setup|clearml_agent_deployment_bare_metal|clearml_agent_deployment_k8s|clearml_agent_deployment_slurm|clearml_agent_execution_env|clearml_agent_env_caching)|integrations/storage)/?$',
            },
            {
              label: 'Enterprise',
              to: '/docs/deploying_clearml/enterprise_deploy/k8s',
              activeBaseRegex: '^/docs/latest/docs/(deploying_clearml(?!/enterprise_deploy/appgw(/.*)?$)(/.*)?$|clearml_sdk/clearml_sdk_setup|user_management(/.*)?|clearml_agent/(clearml_agent_setup|clearml_agent_deployment_bare_metal|clearml_agent_deployment_k8s|clearml_agent_deployment_slurm|clearml_agent_execution_env|clearml_agent_env_caching)|integrations/storage)/?$',
            },
          ],
        },
        {
          to: '/docs/getting_started/auto_log_exp',
          label: 'Using ClearML',
          position: 'left',
          activeBaseRegex: '^/docs/latest/docs/(getting_started(?!/video_tutorials(/.*)?)|clearml_serving|apps/clearml_session)(/.*)?$',
        },
        {
          label: 'Developer Center',
          position: 'left', // or 'right'
          to: '/docs/fundamentals/projects',
          activeBaseRegex: '^/docs/latest/docs/(fundamentals(?!/agents_and_queues)(/.*)?|configs/configuring_clearml|getting_started/video_tutorials(/.*)?|clearml_sdk(?!/clearml_sdk_setup)(/.*)?|pipelines(/.*)?|hyperdatasets(/.*)?|clearml_data(/.*)?|hyperdatasets(/webapp)(/.*)?|references(/.*)?|webapp(/.*)?|clearml_agent/(clearml_agent_ref|clearml_agent_env_var)(/.*)?|configs/(clearml_conf|env_vars)(/.*)?|apps/(clearml_task|clearml_param_search)(/.*)?|best_practices(/.*)?|guides(/.*)?|integrations(/.*)?|faq|release_notes(/.*)?)$',
          activeClassName: 'navbar__link--active',
          items: [
            {
              label: 'ClearML Basics',
              to: '/docs/fundamentals/projects',
              activeBaseRegex: '^/docs/latest/docs/(fundamentals|getting_started/video_tutorials|clearml_sdk(/(?!clearml_sdk_setup).*|(?=/))?|pipelines|clearml_data|hyperdatasets/(?!webapp/).*)(/.*)?$',
            },
            {
              label: 'References',
              to: '/docs/references/sdk/task',
              activeBaseRegex: '^/docs/latest/docs/(references/.*|webapp/.*|hyperdatasets/webapp/.*|clearml_agent/(clearml_agent_ref|clearml_agent_env_var)|configs/(clearml_conf|env_vars)|apps/(clearml_task|clearml_param_search))(/.*)?$',
            },
            {
              label: 'Best Practices',
              to: 'docs/best_practices/data_scientist_best_practices',
              activeBaseRegex: '^/docs/latest/docs/best_practices/'
            },
            {
              label: 'Tutorials',
              to: '/docs/guides',
              activeBaseRegex: '^/docs/latest/docs/guides',
            },
            {
              label: 'Code Integrations',
              to: '/docs/integrations',
              activeBaseRegex: '^/docs/latest/docs/integrations(?!/storage)',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
              activeBaseRegex: '^/docs/latest/docs/faq$',
            },
            {
              label: 'Release Notes',
              to: '/docs/release_notes/clearml_server/open_source/ver_2_2',
              activeBaseRegex: '^/docs/latest/docs/release_notes/',
            },

          ],
        },
        {
          label: 'Community Resources',
          position: 'left', // or 'right'
          to: '/docs/latest/docs/community',
        },
        {
          href: 'https://joinslack.clear.ml',
          position: 'right',
          className: 'header-ico header-ico--slack',
          'aria-label': 'Slack Channel',
        },
        {
          href: 'https://youtube.com/clearml',
          position: 'right',
          className: 'header-ico header-ico--youtube',
          'aria-label': 'YouTube',
        },
        {
          href: 'https://twitter.com/clearmlapp',
          position: 'right',
          className: 'header-ico header-ico--twitter',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://www.linkedin.com/company/clearml',
          position: 'right',
          className: 'header-ico header-ico--linkedin',
          'aria-label': 'LinkedIn',
        },
        {
          href: 'https://github.com/clearml/clearml',
          position: 'right',
          className: 'header-ico header-ico--github',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://joinslack.clear.ml',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/ClearML',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/clearmlapp',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/clearml',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/clearml',
            },
            // {
            //   html: `
            //       <a href="https://twitter.com/clearmlapp" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
            //         <img src="img/twitter_logo_blue.svg" alt="Twitter" />
            //       </a>
            //     `,
            // },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://clear.ml/blog/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/clearml/clearml',
            },
          ],
        },
      ],
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} ClearML. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          breadcrumbs: false,
          editUrl:
            'https://github.com/clearml/clearml-docs/edit/main/',
        },
        // API: {
          // sidebarPath: require.resolve('./sidebars.js'),
          // // Please change this to your repo.
          // editUrl:
            // 'https://github.com/clearml/clearml-docs/edit/main/',
        // },
        blog: {
          blogTitle: 'ClearML Tutorials',
          blogDescription: 'ClearML tutorials and documentation',
          path: 'tutorials',
          routeBasePath: 'tutorials',
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/clearml/clearml-docs/edit/main/tutorials/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'none',
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
      },
    ],
  ],
  themes: [
  // Delete for Algolia start
      [
          require.resolve("@easyops-cn/docusaurus-search-local"), {
          hashed: true,
          // whether to index docs pages
          indexDocs: true,
          // must start with "/" and correspond to the routeBasePath configured for the docs plugin
          // use "/" if you use docs-only-mode
          // (see https://v2.docusaurus.io/docs/2.0.0-alpha.70/docs-introduction#docs-only-mode)
          docsRouteBasePath: '/docs',
          searchResultLimits: 8,
          searchResultContextMaxLength: 50,

          // whether to index blog pages
          indexBlog: false,
          // blogRouteBasePath: '/blog',

          // files to ignore in search
          // whether to index static pages
          // /404.html is never indexed
          indexPages: false,
          ignoreFiles: [/docs\/release_notes\/.*/],

          // language of your documentation, see next section
          language: "en",}
      ]
  // Delete for Algolia end
  ],
  plugins: [
    // ... Your other plugins.
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'none', // GTM Container ID
      }
    ],
    require.resolve('plugin-image-zoom'),
  ],
};
