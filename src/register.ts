import { Router } from "aurelia-router";
import { Lazy, inject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import {
  ValidationRules,
  ValidationControllerFactory
  // ValidationController
} from "aurelia-validation";

const fetchPolyfill = !self.fetch
  ? import("isomorphic-fetch" /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

@inject(Lazy.of(HttpClient), Router, ValidationControllerFactory)
export class Register {
  public firstName: string = "";
  public lastName: string = "";
  public email: string = "";
  public http;
  controller;

  constructor(
    private getHttpClient: () => HttpClient,
    private router: Router,
    controllerFactory: ValidationControllerFactory
  ) {
    this.getHttpClient = getHttpClient;
    this.controller = controllerFactory.createForCurrentScope();
  }

  activate() {
    fetchPolyfill;
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

  register() {
    if (this.validate()) {
      var model = {
        // "id": 0,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      };

      this.http
        .fetch("users", {
          method: "post",
          body: json(model)
        })
        .then(response => {
          return response.json();
        })
        .then(response => {
          this.router.navigateToRoute("list-of-users");
        });
    } else {
      alert("Form is not valid!");
    }
  }
}
