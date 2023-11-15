import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  {
    url: '/mock/sys/user/page',
    method: 'post',
    response: (): Service.MockServiceResult<ApiSys.PageSysUser> => {
      const data = mock({
        'list|1000': [
          {
            id: '@id',
            username: '@cname',
            'age|18-56': 56,
            'gender|1': ['0', '1', null],
            phone:
              /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/,
            'email|1': ['@email("qq.com")', null],
            'status|1': [0, 1]
          }
        ]
      });

      return {
        code: 200,
        message: 'ok',
        data: {
          records: data.list,
          total: 1000,
          size: 50,
          current: 1,
          pages: 20
        }
      };
    }
  },
  {
    url: '/mock/sys/role/list-all',
    method: 'get',
    response: (): Service.MockServiceResult<ApiSys.SysRole[]> => {
      return {
        code: 200,
        message: 'ok',
        data: [
          {
            id: 0,
            name: 'super',
            alias: '炒鸡管理员',
            sort: 0
          },
          {
            id: 1,
            name: 'admin',
            alias: '管理员',
            sort: 1
          },
          {
            id: 2,
            name: 'user',
            alias: '用户',
            sort: 2
          }
        ]
      };
    }
  }
];

export default apis;
