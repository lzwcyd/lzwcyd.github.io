import { defineConfig } from "vuepress/config";

import moment from 'moment';

export default defineConfig({
    dest : 'build',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Java', link: '/java/' },
          { text: 'Go', link: '/go/' },
        //   { text: 'About', link: 'https://google.com' },
          { text: 'Github', link: 'https://github.com/lzwcyd' },
        ]
      },
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp: any, lang: any) => {
                    moment.locale(lang)
                    return moment(timestamp).fromNow()
                }
            }
        ],
        [
            '@vuepress/active-header-links',
            {
                sidebarLinkSelector: '.sidebar-link',
                headerAnchorSelector: '.header-anchor'
            }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '忧离殇',
            description: '忧离殇的个人主页'
        }
    }
});
