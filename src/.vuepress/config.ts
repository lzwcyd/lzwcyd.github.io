import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  dest: "build",
  theme: defaultTheme({
    lastUpdated: true,
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Java", link: "/java/"
      },
      { text: "Go", link: "/go/" },
      { text: "旅行", link: "/travel/" },
      { text: "阅读", link: "/read/"},
      { text: "想法/思考", link: "/idea/" }
    ],
    repo: "https://github.com/lzwcyd",
    sidebar: 'auto',
    editLink: false,
  }),
  lang: "zh-CN",
  title: "忧离殇",
  description: "忧离殇的个人主页",
  bundler: viteBundler(),
  plugins : [
    mdEnhancePlugin({
      // 启用代码块分组
      codetabs: true,
    }),
  ]

})
