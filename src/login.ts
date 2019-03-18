import {lazy} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);


export class Login{
  public heading: string = "Login page";
  public email: string = "";
  public password: string ="";
  public http;
  public users = [];


  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async activate() {
    // ensure fetch is polyfilled before we create the http client
    await fetchPolyfill;
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("https://jsonplaceholder.typicode.com/");
    });

    // const response = await http.fetch("posts");
    // this.posts = await response.json();
  }
  async getUsers(){
    const response = await this.http.fetch("users");
    this.users = await response.json()
  }
}
