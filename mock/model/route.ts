export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [
        {
          name: 'management_task',
          path: '/management/task',
          component: 'self',
          meta: {
            title: '任务管理',
            i18nTitle: 'routes.management.task',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        }
      ],
      meta: {
        title: '项目管理',
        i18nTitle: 'routes.management._value',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            i18nTitle: 'routes.exception.403',
            requiresAuth: true,
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            i18nTitle: 'routes.exception.404',
            requiresAuth: true,
            icon: 'ic:baseline-web-asset-off'
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            i18nTitle: 'routes.exception.500',
            requiresAuth: true,
            icon: 'ic:baseline-wifi-off'
          }
        }
      ],
      meta: {
        i18nTitle: 'routes.exception._value',
        title: '异常页',
        icon: 'ant-design:exception-outlined',
        order: 7
      }
    }
  ],
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [
        {
          name: 'management_task',
          path: '/management/task',
          component: 'self',
          meta: {
            title: '任务管理',
            i18nTitle: 'routes.management.task',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        }
      ],
      meta: {
        title: '项目管理',
        i18nTitle: 'routes.management._value',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            i18nTitle: 'routes.exception.403',
            requiresAuth: true,
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            i18nTitle: 'routes.exception.404',
            requiresAuth: true,
            icon: 'ic:baseline-web-asset-off'
          }
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            i18nTitle: 'routes.exception.500',
            requiresAuth: true,
            icon: 'ic:baseline-wifi-off'
          }
        }
      ],
      meta: {
        i18nTitle: 'routes.exception._value',
        title: '异常页',
        icon: 'ant-design:exception-outlined',
        order: 7
      }
    }
  ],
  user: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis',
            i18nTitle: 'routes.dashboard.analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench',
            i18nTitle: 'routes.dashboard.workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'mdi:monitor-dashboard',
        order: 1,
        i18nTitle: 'routes.dashboard._value'
      }
    },
    {
      name: 'management',
      path: '/management',
      component: 'basic',
      children: [
        {
          name: 'management_task',
          path: '/management/task',
          component: 'self',
          meta: {
            title: '任务管理',
            i18nTitle: 'routes.management.task',
            requiresAuth: true,
            icon: 'ic:round-manage-accounts'
          }
        }
      ],
      meta: {
        title: '项目管理',
        i18nTitle: 'routes.management._value',
        icon: 'carbon:cloud-service-management',
        order: 9
      }
    }
  ]
};
