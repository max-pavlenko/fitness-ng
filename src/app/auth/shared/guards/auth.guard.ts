import {CanActivateFn} from '@angular/router';
import {getAuth} from "@angular/fire/auth";

export const authGuard: CanActivateFn = (route, state) => {
   const authState = getAuth();
   return !!authState.currentUser;
};
