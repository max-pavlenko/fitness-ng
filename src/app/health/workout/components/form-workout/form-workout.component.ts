import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from "../../../../ui/atoms/button/button.component";
import {ControlErrorComponent} from "../../../../ui/atoms/control-error/control-error.component";
import {FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../../ui/atoms/input/input.component";
import {RowSelectComponent} from "../../../../ui/atoms/row-select/row-select.component";
import {SUBMITTABLE_TOKEN} from "../../../shared/tokens/submittable.token";
import {Submittable} from "../../../shared/types";
import {Workout} from "../../models/workout";

@Component({
   selector: 'ft-form-workout',
   standalone: true,
   imports: [CommonModule, ButtonComponent, ControlErrorComponent, FormsModule, InputComponent, NgOptimizedImage, ReactiveFormsModule, RowSelectComponent],
   templateUrl: './form-workout.component.html',
   styleUrls: ['./form-workout.component.scss'],
   providers: [{provide: SUBMITTABLE_TOKEN, useExisting: FormWorkoutComponent}],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormWorkoutComponent implements OnChanges, Submittable<Workout> {
   @Input() defaultValues?: Workout;
   @Output() onSubmit = new EventEmitter<Workout>();

   form = this.nnfb.group({
      name: ['', [Validators.required]],
      type: ['strength', [Validators.required]],
      strength: this.nnfb.group({
         reps: [0, [Validators.required]],
         sets: [0, [Validators.required]],
         weight: [0, [Validators.required]]
      }),
      endurance: this.nnfb.group({
         distance: [0, [Validators.required]],
         duration: [0, [Validators.required]]
      }),
   });

   constructor(private nnfb: NonNullableFormBuilder) {}

   get modeText() {
      return !!this.defaultValues ? 'Edit' : 'Create';
   }

   get placeholder() {
      return `e.g. ${this.form.controls.type.value === 'strength' ? 'Bench-press' : 'Treadmill'}`;
   }

   ngOnChanges() {
      this.defaultValues ? this.form.patchValue(this.defaultValues) : this.form.reset();
   }

   handleSubmit() {
      const value = this.form.getRawValue() as Workout;
      if (!this.form.valid) return;
      value.type === 'strength' ? delete value.endurance : delete value.strength;
      this.onSubmit.emit(value);
   }

   required(formKey: keyof typeof this.form.controls) {
      const control = this.form.controls[formKey];
      return control?.hasError('required');
   }

   touched(formKey: keyof typeof this.form.controls) {
      const control = this.form.controls[formKey] as FormControl;
      return control?.touched || control.getRawValue().length > 0;
   }
}
