import { defineConfig } from "vuepress/config";

import moment from 'moment';

export default defineConfig({
    themeConfig: {
        logo: "logo.jpg"
    },
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp: any, lang: any) => {
                    const moment = require('moment')
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
