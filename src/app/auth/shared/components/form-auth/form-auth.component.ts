import {ChangeDetectionStrategy, Component, computed, EventEmitter, Output, signal, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpStatusCode} from "@angular/common/http";

@Component({
   selector: 'ft-form-auth',
   templateUrl: './form-auth.component.html',
   styleUrls: ['./form-auth.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   encapsulation: ViewEncapsulation.ShadowDom,
})
export class FormAuthComponent {
   name = signal({first: 'Jane', surname: 'Doe'});
   fullName = computed(() => `${this.name().first} ${this.name().surname}`);

   form = this.fb.nonNullable.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]]
   });
   d = new Date();
   @Output() submitted = new EventEmitter<FormAuthComponent['form']>();

   constructor(private fb: FormBuilder) {
      console.log(HttpStatusCode.Accepted, 'HttpStatusCode')
      setTimeout(() => {
         this.name.update((value) => ({...value, first: 'John'}));
      }, 1000);
   }


   get isPasswordInvalid() {
      const control = this.form.get('password')!;
      return control.hasError('minlength') && control.touched;
   }

   get isEmailInvalid() {
      const control = this.form.get('email')!;
      return control.hasError('email') && control.touched;
   }

   handleSubmit() {
      if (this.form.invalid || !this.form.dirty) return;
      this.submitted.emit(this.form);
   }
}
