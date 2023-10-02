import {FirebaseOptions} from "@angular/fire/app";
import {Routes} from "@angular/router";

export const FIREBASE_CONFIG: FirebaseOptions = {
   apiKey: "AIzaSyDoFl1fe19QhrFU2sxHv3twm4ecdzDVwSE",
   authDomain: "ng-fitness-93425.firebaseapp.com",
   databaseURL: "https://ng-fitness-93425-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "ng-fitness-93425",
   storageBucket: "ng-fitness-93425.appspot.com",
   messagingSenderId: "798174202838",
   appId: "1:798174202838:web:c2a90db11d54123e0a7277"
};
export const ROUTES: Routes = [
   {
      path: 'auth', children: [
         {path: '', pathMatch: 'full', redirectTo: 'login'},
         {path: 'login', loadChildren: () => import('./login/login.module')},
         {path: 'register', loadChildren: () => import('./register/register.module')},
      ],
   }
]
