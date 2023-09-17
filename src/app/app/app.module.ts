import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}

const firebaseConfig = {
   apiKey: "AIzaSyDoFl1fe19QhrFU2sxHv3twm4ecdzDVwSE",
   authDomain: "ng-fitness-93425.firebaseapp.com",
   databaseURL: "https://ng-fitness-93425-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "ng-fitness-93425",
   storageBucket: "ng-fitness-93425.appspot.com",
   messagingSenderId: "798174202838",
   appId: "1:798174202838:web:c2a90db11d54123e0a7277"
};
