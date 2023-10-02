import {InjectionToken, Injector, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

const ROUTES: Routes = [
   {path: '', pathMatch: 'full', loadComponent: () => import('./containers/register-page/register-page.component')},
]
export const TOKEN = new InjectionToken<{ r: number }>('TOKEN', {
   providedIn: 'root',
   factory: () => ({r: 1})
});
export const injToken = new InjectionToken<number>('CurrencyService', {
   providedIn: 'root',
   factory: () => 123,
})


@NgModule({
   imports: [
      RouterModule.forChild(ROUTES),
   ],
   providers: [
      {
         provide: injToken,
         useFactory: (injector: Injector) => ({
            class: injector.get(AuthService)
         }),
         deps: [Injector]
      }
   ]
})
export default class RegisterModule {}
