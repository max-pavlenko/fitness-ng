import {Injectable} from '@angular/core';
import {DatabaseService} from "../shared/services/database.service";
import {Meal, MealResponse} from "./meal";

@Injectable({
   providedIn: 'root'
})
export class MealsService {
   db = new DatabaseService<Meal, MealResponse>('meals');
}
