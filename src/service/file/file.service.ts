import request from '../../library/axios/request';

class FileService {
  ENDPOINT = '/file';

  public async getFile(id: number): Promise<any> {
    const url = `${this.ENDPOINT}/get-image/${id}`;
    return request({ url, method: 'GET' }).then((res: any) => {
      return res.data;
    });
  }

  public async getFileWithBlob(id: number): Promise<any> {
    const url = `${this.ENDPOINT}/${id}`;
    return request({ url, method: 'GET', responseType: 'blob' }).then(
      (res: any) => {
        return res.data;
      },
    );
  }
}

export const fileService = new FileService();
