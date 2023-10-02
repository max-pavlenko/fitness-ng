import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {AppComponent} from './app/app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AuthModule} from './app/auth/auth.module';
import {ROUTES, TOAST_CONFIG} from './app/app/app.constants';
import {HotToastModule} from '@ngneat/hot-toast';
import {provideRouter, withComponentInputBinding, withPreloading, withRouterConfig} from '@angular/router';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {QuicklinkStrategy} from "ngx-quicklink";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {FIREBASE_CONFIG} from "./app/auth/constants";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getDatabase, provideDatabase} from "@angular/fire/database";

bootstrapApplication(AppComponent, {
   providers: [
      importProvidersFrom(
         BrowserModule, HotToastModule.forRoot(TOAST_CONFIG), AuthModule,
         provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
         provideAuth(() => getAuth()),
         provideDatabase(() => getDatabase()),
      ),
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(ROUTES, withComponentInputBinding(), withPreloading(QuicklinkStrategy), withRouterConfig({onSameUrlNavigation: 'ignore'})),
      provideAnimations(),
   ],
}).catch(err => console.warn(err));
