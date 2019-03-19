import { lazy } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);


export class ListOfUsers {
  public name: string = "";
  public email: string = "";
  public http;
  public users = [];

  
  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async activate() {
    await fetchPolyfill;
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("https://jsonplaceholder.typicode.com/");
    });

    this.getUsers();
  }

  async getUsers(){
    const response = await this.http.fetch("users");
    this.users = await response.json();
  }
}
