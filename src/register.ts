import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-dependency-injection';
import { lazy } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

const fetchPolyfill = !self.fetch
  ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

export class Register {
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
        .withBaseUrl("http://10.5.10.69/aurelia/api/");
    });
  }

  public validate() {
    if (this.firstName === "" || this.lastName === "" || this.email === "") {
      return false;
    }

    return true;
  }

 register() {
    if (this.validate()) {
      var model = {
        // "id": 0,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      };

      const response = this.http.fetch('form', {
        method: "post",
        body: json(model)
      })
      .then(response => {return response.json()})
      this.router.navigateToRoute('list-of-users');
    } else {
      alert('Form is not valid!');
    }
  }
}
