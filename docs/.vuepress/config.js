module.exports = {
    theme: 'reco',
    themeConfig: {
        // 其他配置项...
        mode: 'dark', // 设置模式为自动切换浅色和暗色
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '文档说明',
            description: 'Vue 驱动的静态网站生成器'
        },
        '/en/': {
            lang: 'en-US',
            title: 'Documentation description',
            description: 'Vue-powered Static Site Generator'
        }
    },
    themeConfig: {
        search: false,
        subSidebar: 'auto',
        locales: {
            '/': {
                selectText: '选择语言',
                label: '简体中文',
                nav: [{ text: '指南', link: '/guide/' }],
                sidebar: {
                    '/guide/': [
                        ['', '介绍'],
                        {
                            title: '组件',
                            collapsable: false,
                            children: [['../guide/test.md', '测试']]
                        }
                    ]
                }
            },
            '/en/': {
                selectText: 'Select Language',
                label: 'English',
                nav: [{ text: 'Guide', link: '/en/guide/' }],
                sidebar: {
                    '/en/guide/': [
                        ['', 'Introduction'],
                        {
                            title: 'Components',
                            collapsable: false,
                            children: [['../guide/test.md', 'test']]
                        }
                    ]
                }
            }
        }
    }
}