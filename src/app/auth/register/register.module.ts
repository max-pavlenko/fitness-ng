import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
   {path: '', pathMatch: 'full', component: RegisterPage},
]

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forChild(ROUTES),
   ]
})
export class RegisterModule {}
