import { defineConfig } from "vuepress/config";

import moment from 'moment';

export default defineConfig({
    dest: 'build',
    themeConfig: {
        lastUpdated: '上次更新',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Java', link: '/java/' },
            { text: 'Go', link: '/go/' },
            //   { text: 'About', link: 'https://google.com' },
            { text: 'Github', link: 'https://github.com/lzwcyd' },
        ],
        sidebar: {
            '/java/': [
                '',
                'springboot1',
                'mysql'
            ],
            'go': [
                ''
            ]
        }
    },
    plugins: [
        [
            '@vuepress/last-updated'
            ,
            {
                transformer: (timestamp: any, lang: any) => {
                    moment.locale(lang)
                    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
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
