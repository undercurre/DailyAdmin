const management: AuthRoute.Route = {
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
        keepAlive: true,
        icon: 'mingcute:task-2-line'
      }
    }
  ],
  meta: {
    title: '项目管理',
    i18nTitle: 'routes.management._value',
    icon: 'carbon:cloud-service-management',
    order: 9
  }
};

export default management;
