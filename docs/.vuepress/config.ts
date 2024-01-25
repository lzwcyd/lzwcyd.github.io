import { defineConfig } from "vuepress/config";

import moment from "moment";

export default defineConfig({
  dest: "build",
  themeConfig: {
    lastUpdated: "上次更新",
    nav: [
      { text: "Home", link: "/" },
      { text: "Java", link: "/java/" },
      { text: "Go", link: "/go/" },
      { text: "旅行", link: "/travel/" },
      { text: "想法/思考", link: "/idea/" },
      { text: "Github", link: "https://github.com/lzwcyd" },
    ],
    sidebar: {
      "/java/": ["", "springboot1", "mysql"],
      "/go/": [""],
      "/travel/": ["", "huzhou", "suzhou", "hangzhou"],
      "/idea/": ["", "HarmonyOs"],
    }
  },
  plugins: [['@vuepress/back-to-top', true],
  [
    "@vuepress/last-updated",
    {
      transformer: (timestamp: any, lang: any) => {
        moment.locale(lang);
        return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ],
  [
    "@vuepress/active-header-links",
    {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
  ], [
    'vuepress-plugin-container',
    {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }
  ]
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "忧离殇",
      description: "忧离殇的个人主页",
    },
  },

});
