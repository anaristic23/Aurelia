import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'login'], name: 'login', moduleId: PLATFORM.moduleName('./login'), nav: true, title: 'Login' },
      { route: 'register', name: 'register', moduleId: PLATFORM.moduleName('./register'), nav: true, title: 'Register' },
      { route: 'list-of-users', name: 'list-of-users', moduleId: PLATFORM.moduleName('./list-of-users'), nav: true, title: 'List Of Users' },
      { route: 'profilepage', name: 'profilepage', moduleId: PLATFORM.moduleName('./profilepage'), nav: true, title: 'Profile page' },

    ]);

    this.router = router;
  }
}
