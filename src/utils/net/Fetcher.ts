import axios, { AxiosInstance } from 'axios';

export type Defaults = {
  params?: { [key: string]: any };
};

abstract class Fetcher {
  private apiService: AxiosInstance;

  /**
   * @param baseUrl base URL for a service this fetcher will be attached to
   * @param defaultReqParams to be attached to all requests fromthis fetcher
   */
  constructor(protected baseUrl: string, defaults: Defaults = {}) {
    this.apiService = axios.create({
      baseURL: this.baseUrl,
    });

    // default params attached to each request
    this.apiService.defaults.params = {
      ...defaults.params,
    };
  }

  /**
   * Calls service endpoint
   *
   * @param url API url to call, will be attached to baseUrl supplied in constructor
   * @param requestParams API request parameters
   *
   * @returns {Promise<T>}
   */
  protected get<T>(url: string, requestParams: { [key: string]: string | number | boolean }): Promise<T> {
    const params = {
      ...requestParams,
    };

    return this.apiService.get(url, { params });
  }
}

export default Fetcher;
