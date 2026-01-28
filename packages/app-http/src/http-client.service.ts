import { Inject } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { HTTP_CLIENT_MODULE_OPTIONS } from "./http-client.constants";
import { HttpClientModuleOptions } from "./http-client.interface";
// @Injectable()
export class HttpClientService {
  private apiUrl;
  private apiKey;
  constructor(
    @Inject(HTTP_CLIENT_MODULE_OPTIONS)
    private readonly options: HttpClientModuleOptions
  ) {
    this.apiKey = this.options.apiKey;
    this.apiUrl = this.options.apiUrl;
  }
  async fetch(method: string, data: any): Promise<AxiosResponse<any>> {
    const response = await axios({
      method,
      data,
      url: `${this.apiUrl}/fetch`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    return response;
  }
}
