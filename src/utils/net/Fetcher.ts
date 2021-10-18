import axios, { AxiosInstance } from 'axios';

type ApiKey = {
  paramName: string;
  key: string;
};

abstract class Fetcher {
  private fetchInstance: AxiosInstance;

  constructor(protected baseUrl: string, protected apiKey?: ApiKey) {
    this.fetchInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  protected get<T>(url: string, requestParams: { [key: string]: string | number | boolean }): Promise<T> {
    const params = {
      ...requestParams,
      ...(this.apiKey ? { [this.apiKey.paramName]: this.apiKey.key } : {}),
    };

    return this.fetchInstance.get(url, { params });
  }
}

export default Fetcher;
