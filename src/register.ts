import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-dependency-injection';
import { lazy } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

export class Register {
  public heading: string = 'Registration page';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = "";
  public http;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient, private router: Router) {}

  async activate() {
    await fetchPolyfill;
    this.http = this.getHttpClient();

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl("https://jsonplaceholder.typicode.com/");
    });
  }

  public validate() {
    if (this.firstName === "" || this.lastName === "" || this.email === "") {
      return false;
    }

    return true;
  }

  async register() {
    if (this.validate()) {
      var model = {
        // "id": 0,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      };

      const response = await this.http.fetch('users', {
        method: "post",
        body: json(model)
      });
      const data = await response.json();
      this.router.navigateToRoute('list-of-users');
    } else {
      alert('Form is not valid!');
    }
  }
}
