import { Router } from "aurelia-router";
import {Lazy, inject} from 'aurelia-framework';
import { HttpClient, json } from "aurelia-fetch-client";
import {
  ValidationRules,
  ValidationControllerFactory
  // ValidationController
} from "aurelia-validation";

const fetchPolyfill = !self.fetch
  ? import("isomorphic-fetch" /* webpackChunkName: 'fetch' */)
  : Promise.resolve(self.fetch);

@inject(Lazy.of (HttpClient), Router, ValidationControllerFactory)
export class Login {
  public email: string = "";
  public password: string = "";
  public http;
  public users = [];
  public currentUser;
  controller;

  constructor(
    private getHttpClient: () => HttpClient,
    private router: Router,
    controllerFactory: ValidationControllerFactory
  ) {
    this.getHttpClient = getHttpClient;
    this.controller = controllerFactory.createForCurrentScope();
    this.currentUser = null;

  }

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

  public loginValidation() {
    if (this.email === "" || this.password === "") {
      return false;
    }
    return true;
  }

  getUsers() {
    this.http
      .fetch("users")
      .then(response => response.json())
      .then(response => {
        this.users = response;
      });
  }

  userChanged(newValue, oldValue){
    if(this.users){
      ValidationRules.ensure("email")
      .required()
      .on(this.email);
    }
  }
}
