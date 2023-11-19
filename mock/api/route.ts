import type { MockMethod } from 'vite-plugin-mock';
// import { routeModel, userModel } from '../model';
import { routeModel } from '../model';

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (): Service.MockServiceResult => {
      // response: (options: Service.MockOption): Service.MockServiceResult => {
      // const { userId = undefined } = options.body;

      const routeHomeName: AuthRoute.LastDegreeRouteKey = 'dashboard_analysis';

      const role = 'user';

      const filterRoutes = routeModel[role];

      return {
        code: 200,
        message: 'ok',
        data: {
          routes: filterRoutes,
          home: routeHomeName
        }
      };
    }
  }
];

export default apis;
