interface UserModel {
  jwt: string;
  user: Auth.UserInfo;
}

export const userModel: UserModel[] = [
  {
    jwt: '__TOKEN_Undercurre__',
    user: {
      id: 1,
      username: 'lirunhua',
      email: 'undercurre@163.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      createdAt: '2023-06-24T16:35:36.937Z',
      updatedAt: '2023-06-24T16:35:36.937Z'
    }
  }
];
