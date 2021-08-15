import axios, { AxiosResponse } from "axios";

export interface hasId {
  id?: number;
}

export class ApiSync<T extends hasId> {
  public constructor(private rootUrl: string) {}

  public getById = async (id: number): Promise<AxiosResponse<T>> => {
    const response = await axios.get(`${this.rootUrl}/${id}`);
    return response.data;
  };

  public save = async (data: T): Promise<AxiosResponse<T>> => {
    if (data.id) {
      return await axios.put(`${this.rootUrl}/${data.id}`, data);
    } else {
      return await axios.post(`${this.rootUrl}`, data);
    }
  };
}
