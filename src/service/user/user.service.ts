import request from '../../library/axios/request';

class UserService {
  ENDPOINT = '/user';

  public async inviteUser(userId: number): Promise<any> {
    const url = `${this.ENDPOINT}/invite-user?userId=${userId}`;
    return request({ url, method: 'POST' }).then((res: any) => {
      return res.data;
    });
  }
}

export const userService = new UserService();
