import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {InputComponent} from "../../../../ui/atoms/input/input.component";
import {Meal} from "../../meal";
import {MealFormModes} from "../../enums/meal-form-modes.enum";
import {ControlErrorComponent} from "../../../../ui/atoms/control-error/control-error.component";
import {ButtonComponent} from "../../../../ui/atoms/button/button.component";
import {SUBMITTABLE_TOKEN} from "../../../shared/tokens/submittable.token";
import {Submittable} from "../../../shared/types";

@Component({
   selector: 'ft-form-meal',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule, RouterLink, NgOptimizedImage, InputComponent, ControlErrorComponent, ButtonComponent],
   templateUrl: './form-meal.component.html',
   styleUrls: ['./form-meal.component.scss'],
   providers: [{provide: SUBMITTABLE_TOKEN, useExisting: FormMealComponent}],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMealComponent implements OnChanges, Submittable<Meal> {
   @Input() defaultValues?: Meal;
   @Output() onSubmit = new EventEmitter<NonNullable<typeof this.defaultValues>>();

   form = this.nnfb.group({
      name: ['', [Validators.required]],
      ingredients: this.nnfb.array([this.defaultIngredientGroup], [Validators.required]),
   });

   constructor(private nnfb: NonNullableFormBuilder) {}

   get ingredients() {
      return this.form.controls.ingredients;
   }

   get modeText() {
      return this.defaultValues?.name.length! > 0 ? MealFormModes.EDIT : MealFormModes.CREATE;
   }

   get defaultIngredientGroup() {
      return this.nnfb.group({
         ingredient: ['', Validators.required],
         calories: [0, Validators.required]
      });
   }

   ngOnChanges() {
      this.defaultValues ? this.form.patchValue(this.defaultValues) : this.form.reset();
   }

   required(formKey: keyof typeof this.form.controls) {
      const control = this.form.controls[formKey];
      return control?.hasError('required');
   }

   touched(formKey: keyof typeof this.form.controls) {
      const control = this.form.controls[formKey];
      return control?.touched || control.getRawValue().length > 0;
   }

   addIngredient() {
      this.ingredients.push(this.defaultIngredientGroup);
   }

   removeIngredient(index: number) {
      this.ingredients.removeAt(index);
   }

   handleSubmit() {
      const value = this.form.getRawValue();
      if (!this.form.valid) return;
      this.onSubmit.emit(value);
   }

   handleResetIngredientsClick() {
      while (this.form.controls.ingredients.length > 0) {
         this.removeIngredient(0);
      }
      this.addIngredient();
   }
}
