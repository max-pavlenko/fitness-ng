import {Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user} from "@angular/fire/auth";
import {ToastService} from "./toast.service";
import {Auth as FBAuth} from 'firebase/auth';
import {share} from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   authState = user(this.auth as FBAuth).pipe(share());

   constructor(private auth: Auth, private t: ToastService) { }

   async createUser({email, password}: { email: string, password: string }) {
      return this.t.promise(createUserWithEmailAndPassword(this.auth, email, password), {
         loading: 'Creating user...',
         success: 'User created successfully',
         error: (e) => `Failed to create user: ${e.code}`,
      });
   }

   async login({email, password}: { email: string, password: string }) {
      return this.t.promise(signInWithEmailAndPassword(this.auth, email, password), {
         loading: 'Logging in...',
         success: 'Logged in successfully',
         error: (e) => `Failed to login: ${e.code}`,
      })
   }

   async logout() {
      return this.t.promise(this.auth.signOut(), {
         loading: 'Logging out...',
         success: 'Logged out successfully',
         error: (e) => `Failed to logout: ${e.code}`,
      })
   }
}
