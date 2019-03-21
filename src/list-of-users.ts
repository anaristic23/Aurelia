import { inject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

@inject(HttpClient)
export class ListOfUsers {
  public name: string = "";
  public email: string = "";
  public http;
  public users = [];

  
  constructor(private getHttpClient: () => HttpClient) {}

  activate() {
    fetchPolyfill;
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("https://jsonplaceholder.typicode.com/");
    });

    this.getUsers();
  }

 getUsers(){
   this.http.fetch("users")
   .then(response => response.json())
  }
}
