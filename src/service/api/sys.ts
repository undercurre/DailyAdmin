import { mockRequest } from '../request';

/**
 * 获取系统用户列表
 * @param params
 */
export function fetchSysUserByPage(params: ApiSys.PageSysUserParams) {
  return mockRequest.post<ApiSys.PageSysUser>('/sys/user/page', params);
}

/**
 * 获取所有系统角色
 */
export function fetchAllSysRole() {
  return mockRequest.get<ApiSys.SysRole[]>('/sys/role/list-all');
}
