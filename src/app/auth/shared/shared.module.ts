import {NgModule} from '@angular/core';
import {FormAuthComponent} from "./components/form-auth/form-auth.component";
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ControlErrorComponent} from "../../ui/atoms/control-error/control-error.component";


@NgModule({
   declarations: [FormAuthComponent],
   providers: [],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      ControlErrorComponent,
   ],
   exports: [FormAuthComponent],
})
export class SharedModule {}
