import request from '../../library/axios/request';
import { IAssignCompanyHasUserId, ILogin, IResetPassword } from './auth.model';

class AuthService {
  ENDPOINT = '/auth';

  public async login(data: ILogin): Promise<any> {
    const url = `${this.ENDPOINT}/login`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }

  public async assignCompanyHasUserId(
    data: IAssignCompanyHasUserId,
  ): Promise<any> {
    const url = `${this.ENDPOINT}/assign-company-has-user-id`;
    return request({ url, method: 'POST', data }).then((res) => {
      return res.data;
    });
  }

  public async refreshToken(refreshToken: string): Promise<any> {
    const url = `${this.ENDPOINT}/refresh`;
    return request({
      url,
      method: 'POST',
      data: { refresh_token: refreshToken },
      headers: { 'X-RefreshToken': true },
    }).then((res) => {
      return res.data;
    });
  }

  // Without login can change the password using unique link
  public async resetPassword(data: IResetPassword): Promise<any> {
    const url = `${this.ENDPOINT}/reset-password`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }

  // With login can change own password
  public async resetMyPassword(data: IResetPassword): Promise<any> {
    const url = `${this.ENDPOINT}/reset-my-password`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }

  public async forgotPassword(username: string): Promise<any> {
    const data = { username: username };
    const url = `${this.ENDPOINT}/forgot-password`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }
}

export const authService = new AuthService();
