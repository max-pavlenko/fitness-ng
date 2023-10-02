import {Injectable} from '@angular/core';
import {Workout, WorkoutResponse} from "./models/workout";
import {DatabaseService} from "../shared/services/database.service";

@Injectable({
   providedIn: 'root'
})
export class WorkoutsService {
   db = new DatabaseService<Workout, WorkoutResponse>('workouts');
}
