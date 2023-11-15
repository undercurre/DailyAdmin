// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey;
  }
}

declare namespace ApiCommon {
  /**
   * 验证状态
   * - 0: 否
   * - 1: 是
   */
  type VerifiedStatus = 0 | 1;

  /**
   * 分页列表
   */
  type PageList<T> = {
    /**
     * 列表数据
     */
    records: T[];
    /**
     * 总数
     */
    total: number;
    /**
     * 每页条数
     */
    size: number;
    /**
     * 当前页码
     */
    current: number;
    /**
     * 总页数
     */
    pages: number;
  };

  /**
   * 分页列表查询参数
   */
  type PageListParams<T> = {
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页条数
     */
    pageSize?: number;
    /**
     * 查询参数
     */
    data?: T;
  };

  /**
   * 列表通用属性
   */
  type ListCommonConf = {
    /**
     * ID
     */
    id: number;
    /**
     * 创建id
     */
    createId?: number;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 更新人
     */
    updateBy?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
  };
}

declare namespace ApiSys {
  /**
   * 用户状态
   * - 0: 禁用
   * - 1: 正常
   */
  type SysUserStatus = 0 | 1;

  /**
   * 性别
   */
  type SysUserSex = '男' | '女';

  /**
   * 系统用户
   */
  type SysUser = ApiCommon.ListCommonConf & {
    /**
     * 账号
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 真实姓名
     */
    realName: string;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 性别
     */
    sex: SysUserSex;
    /**
     * 手机号码
     */
    phone: string;
    /**
     * 手机号码是否验证
     */
    phoneVerified: ApiCommon.VerifiedStatus;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 邮箱是否验证
     */
    emailVerified: ApiCommon.VerifiedStatus;
    /**
     * 用户状态
     */
    status: SysUserStatus;
  };

  /**
   * 系统用户分页列表
   */
  type PageSysUser = ApiCommon.PageList<SysUser>;

  interface SysUserVo extends SysUser {
    /**
     * 角色ID
     */
    roleId: string;
    /**
     * 所属角色
     * @description 多个英文逗号分割
     */
    roles: string;
  }

  type SysUserVoRequiredKey = Extract<keyof SysUserVo, 'id' | 'username' | 'password' | 'sex'>;

  type PageSysUserParams = ApiCommon.PageListParams<Partial<SysUserVo> & Pick<SysUserVo, SysUserVoRequiredKey>>;

  type CreateSysUserParams = Partial<SysUser> & {
    /**
     * 角色ID列表
     */
    roleIds?: number[];
  } & Pick<SysUser, SysUserVoRequiredKey>;

  /**
   * 系统角色
   */
  type SysRole = ApiCommon.ListCommonConf & {
    /**
     * 名称
     * @minLength 0
     * @maxLength 30
     */
    name: string;
    /**
     * 别名
     * @minLength 0
     * @maxLength 30
     */
    alias: string;
    /**
     * 备注
     * @minLength 0
     * @maxLength 255
     */
    remark?: string;
    /**
     * 状态
     * - 0: 禁用
     * - 1: 正常
     */
    status?: SysUserStatus;
    /**
     * 排序
     */
    sort: number;
  };

  namespace ApiRegion {
    /** 列表数据 */
    interface ListTreeSysRegion {
      id: string;
      createId: string;
      createBy: string;
      createTime: string;
      pid: string;
      name: string;
      code: string;
      sort: number;
      level: number;
      children: ListTreeSysRegion[];
      parentName?: string;
      updateBy?: string;
      updateTime?: string;
    }
    /** 创建数据 */
    type CreateSysRegion = Pick<ListTreeSysRegion, 'pid' | 'name' | 'code' | 'sort' | 'id' | 'parentName'>;
  }
}

declare namespace ApiDict {
  type DictItemParams = {
    page: number;
    pageSize: number;
    prop: string | null;
    order: string | null;
    data: {
      pid: string;
    };
  };
  interface DictParent {
    /** 编码 */
    code: string;
    /** 字典id */
    id: string;
    /** 字典名称 */
    name: string;
    /** 排序 */
    sort: number;
    /** 备注 */
    remark?: string;
  }
  type DictItem = {
    /** 编码 */
    code: string;
    /** 创建者 */
    createBy: string;
    createId: string;
    /** 创建时间 */
    createTime: string;
    /** 项id */
    id: string;
    /** 项名称 */
    name: string;
    /** 所属字典id */
    pid: string;
    /** 排序 */
    sort: number;
    /** 状态，
     * 1：开启
     * 0：停用
     */
    status: 1 | 0;
    /** 备注 */
    remark?: string;
  };
  type PageDictItem = ApiCommon.PageList<DictItem>;

  interface ListTreeSysRegion {
    id: string;
    createId: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    pid: string;
    name: string;
    code: string;
    sort: number;
    level: number;
    children: Child2[];
  }

  interface Child2 {
    id: string;
    createId: string;
    createBy: string;
    createTime: string;
    pid: string;
    name: string;
    code: string;
    sort: number;
    level: number;
    parentName: string;
    children: Child[];
  }

  interface Child {
    id: string;
    createId: string;
    createBy: string;
    createTime: string;
    pid: string;
    name: string;
    code: string;
    sort: number;
    level: number;
    parentName: string;
    updateBy?: string;
    updateTime?: string;
  }
}

declare namespace ApiApp {
  type App = {
    /** App id */
    id: string;
    /** 名称 */
    name: string;
    /** 标识 */
    identification: string;
    /** 创建人 */
    createBy: string;
    /** 创建人id */
    createId: string;
    /** 名称 */
    createTime: string;
    /** 密钥 */
    secretKey: string;
    /** 排序 */
    sort: number;
    /** 状态 */
    status: 1 | 0;
    /** 修改人 */
    updateBy: string;
    /** 修改时间 */
    updateTime: string;
    /** 授权期限 */
    expire: string;
  };

  interface AppTableColumns extends App {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }

  /**
   * 应用分页列表
   */
  type PageApp = ApiCommon.PageList<App>;

  type PageAppParams = ApiCommon.PageListParams<Partial<App>>;
}

declare namespace Apimonitoring {
  /** 系统监控 */
  namespace SysMonitoring {
    interface CupInfo {
      physicalProcessorCount: number;
      logicalProcessorCount: number;
      systemPercent: number;
      userPercent: number;
      waitPercent: number;
      usePercent: number;
    }

    interface MemoryInfo {
      total: string;
      used: string;
      free: string;
      usePercent: number;
    }

    interface DiskInfo {
      name: string;
      volume: string;
      label: string;
      logicalVolume: string;
      mount: string;
      description: string;
      options: string;
      type: string;
      size: string;
      totalSpace: string;
      used: string;
      usableSpace: string;
      avail: string;
      usePercent: number;
      uuid: string;
    }

    interface JvmInfo {
      jdkVersion: string;
      jdkHome: string;
      jdkName: string;
      jvmTotalMemory: string;
      maxMemory: string;
      freeMemory: string;
      usedMemory: string;
      usePercent: number;
      startTime: number;
      uptime: number;
    }

    interface SysInfo {
      name: string;
      ip: string;
      osName: string;
      osArch: string;
      userDir: string;
    }

    interface ServerMonitorV1 {
      cupInfo: CupInfo;
      memoryInfo: MemoryInfo;
      diskInfos: DiskInfo[];
      jvmInfo: JvmInfo;
      sysInfo: SysInfo;
      diskUsePercent: number;
    }
  }
}
