// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cockpit: {
    token: 'f2d1f54c3065ab355c88dce1d86cfc',
    url: 'http://localhost:8888/cockpit2/api/collections/get',
    urlForms: 'http://localhost:8888/cockpit2/api/forms/submit',
    urlCockpit: 'http://localhost:8888/cockpit2/api/cockpit',
    urlStorage: 'http://localhost:8888/cockpit2/storage'
  },
  posts: {
    postsPerPage: 5
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
