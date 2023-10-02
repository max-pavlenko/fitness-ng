import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from './containers/login-page/login-page.component';

const ROUTES: Routes = [
   {path: '', pathMatch: 'full', component: LoginPageComponent},
]

@NgModule({
   imports: [
      RouterModule.forChild(ROUTES),
      LoginPageComponent,
   ]
})
export default class LoginModule {}
