//import {computedFrom} from 'aurelia-framework';
import {registerUser} from "./users"

export class Welcome {
  public heading: string = 'Welcome';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = "";
  public previousValue: string = this.fullName;

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public validate() {
    if (this.firstName === "" || this.lastName === "") {
      alert("All fields are required!");
      return false;
    }
    return true;
  }

  public register() {
    if (this.validate()) {
      var model = {
        // "id": 0,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      };

      registerUser(model).then(function(user) {
        console.log(user);
      });
    }
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate(): boolean | undefined {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
