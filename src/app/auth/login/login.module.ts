import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
   {path: '', pathMatch: 'full', component: LoginPage},
]

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forChild(ROUTES),
   ]
})
export class LoginModule {}
