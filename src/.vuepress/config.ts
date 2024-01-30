import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

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
  footer: [
    // 其他底部内容
    '<a href="你的备案链接" target="_blank">备案号：XXXXXX</a>',
  ],

})
