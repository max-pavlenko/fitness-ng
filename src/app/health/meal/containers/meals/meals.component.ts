import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MealsService} from "../../meals.service";
import {RouterLink} from "@angular/router";
import {ModalComponent} from "../../../../ui/atoms/modal/modal.component";
import {Meal, MealResponse} from "../../meal";
import {FormMealComponent} from "../../components/form-meal/form-meal.component";
import {TrackByPropertyDirective} from "../../../../shared/directives/track-by-property.directive";
import {HealthListItemComponent} from "../../../shared/components/health-list-item/health-list-item.component";
import {HealthManagementComponent} from "../../../shared/containers/health-management/health-management.component";

@Component({
   selector: 'ft-meals',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, RouterLink, ModalComponent, HealthListItemComponent, FormMealComponent, TrackByPropertyDirective, HealthListItemComponent, HealthListItemComponent, HealthManagementComponent],
   templateUrl: './meals.component.html',
   styleUrls: ['./meals.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MealsComponent {
   selectedMeal?: MealResponse;

   constructor(public mealsService: MealsService) {}

   async handleMealSubmit(value: Meal) {
      this.selectedMeal
         ? await this.mealsService.db.update({...value, refKey: this.selectedMeal!.refKey})
         : this.mealsService.db.add(value);
   }

   deleteMeal = async ({refKey}: MealResponse) => {
      await this.mealsService.db.delete(refKey);
   }

   getIngredients(meal: Meal) {
      return meal.ingredients.reduce((acc, {ingredient, calories}) => acc + `${ingredient}: ${calories} cal; `, '').slice(0, -2);
   }

   getTotalCalories(meal: Meal) {
      return meal.ingredients.length > 1 ? ` = ${meal.ingredients.reduce((acc, {calories}) => acc + +calories, 0)} cal` : '';
   }

   getMealDescription = (meal: MealResponse) => {
      return `${this.getIngredients(meal)} ${this.getTotalCalories(meal)}`;
   }

   handleManageMealsModalOpen = (meal?: MealResponse) => {
      this.selectedMeal = meal;
   }

   handleManageMealsModalClose = () => {
      this.selectedMeal = undefined;
   }
}
