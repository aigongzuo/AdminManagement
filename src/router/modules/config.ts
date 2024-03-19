export const routeConfig = {
    test: {
        path: '/test',
        name: 'testIndex',
    },
    unknown: {
        path: '/:catchAll(.*)',
        name: 'NotFound',
    },

    login: {
        name: 'login',
        path: '/login',
    },
    home: {
        path: '/', // /home
        redirect: '/welcome', // 设置默认路由为 /dashboard
    },
    welcome: {
        path: '/welcome',
        name: 'welcome',
    },
    dashboard: {
        path: '/dashboard',
        name: 'Dashboard',
    },
    main: {
        path: '/main',
        name: 'MainList',
    },
    setting: {
        path: '/setting',
        name: 'Setting',
    }
};