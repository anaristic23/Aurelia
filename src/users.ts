// import {lazy} from 'aurelia-framework';
// import {HttpClient} from 'aurelia-fetch-client';

// // polyfill fetch client conditionally
// const fetchPolyfill = !self.fetch
//   ? import('isomorphic-fetch' /* webpackChunkName: 'fetch' */)
//   : Promise.resolve(self.fetch);

// // interface IUser {
// //   avatar_url: string;
// //   login: string;
// //   html_url: string;
// // }

// export class User{
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;

//   constructor(id, email, firstName, lastName){
//     this.id = id;
//     this.email = email;
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }
// }

// export class Users {
//   heading: string = 'List Of Users';
//   users: Array<User> = [];
//   http: HttpClient;
//   /**
//    * ref element on the binding-context
//    */
//   image: HTMLImageElement;

//   constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

//   async activate(): Promise<void> {
//     // ensure fetch is polyfilled before we create the http client
//     await fetchPolyfill;
//     const http = this.http = this.getHttpClient();

//     http.configure(config => {
//       config
//         .useStandardConfiguration()
//         .withBaseUrl('https://api.github.com/');
//         // .withBaseUrl('http://10.5.10.69/aurelia/api/form');
//     });

//     const response = await http.fetch('users');
//     this.users = await response.json();
//   }
// }

// export const fetchUsers = () => {
//   // console.log('fetch GET');
//   return fetch("http://10.5.10.69/aurelia/api/form")
//     .then(response => {
//       return response.json()
//       .then(data => {
//           console.log(data)
//          return data;
//         })
//     })
//     // .then(response => response.map(item =>new User(item.id, item.email, item.firstName, item.lastName))
//     // );
// };

// export const registerUser = (model) => {

//   return fetch("http://10.5.10.69/aurelia/api/form", {
//   method: "POST",
//   body: JSON.stringify(model),
//   headers: {
//       'Content-Type': 'application/json',
//   }
//   })
  
//   .then(function(response){
//   return response.json()
//   .then(data => {return data})
//   .catch( error => {return })
//   })


//   }

// // export const deleteUser = (id) => {
// //   console.log("deleteUser")
// //   return fetch(API_BASE_ENDPOINT, {
// //     method: "DELETE",
// //     body: JSON.stringify(id)
// //   })
// //   .then(function(response){
// //     return response.json()
// //   })
// // }


// export const fetchUsersById = (id) => {
//   console.log('fetch GET');
//   return fetch("http://10.5.10.69/aurelia/api/form" + "/" + id)
//     .then(response => {
//       return response.json()
//       .then(data => {
//         console.log(data)
//          return data;
//         })
//     })
//     // .then(response => response.map(item =>new User(item.id, item.email, item.firstName, item.lastName))
//     // );
// };

