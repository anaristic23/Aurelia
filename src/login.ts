import { Router } from 'aurelia-router';
import {lazy} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);


export class Login{
  public email: string = "";
  public password: string ="";
  public http;
  public users = [];


  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient, private router: Router) {}

  async activate() {
    await fetchPolyfill;
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("http://10.5.10.69/aurelia/api/");
    });

    this.getUsers();
  }

  public loginValidation(){
    if(this.email === "" || this.password === ""){
      return false;
    }
    return true;
  }
  
  
  async getUsers(){
    const response = await this.http.fetch("form");
    this.users = await response.json()
  }
}
