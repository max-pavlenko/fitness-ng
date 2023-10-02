import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {WorkoutsService} from "../../workouts.service";
import {BaseWorkout, WorkoutResponse} from "../../models/workout";
import {HealthListItemComponent} from '../../../shared/components/health-list-item/health-list-item.component';
import {HealthManagementComponent} from "../../../shared/containers/health-management/health-management.component";
import {FormWorkoutComponent} from "../../components/form-workout/form-workout.component";

@Component({
   selector: 'ft-workouts',
   standalone: true,
   imports: [CommonModule, RouterLink, NgOptimizedImage, HealthListItemComponent, HealthManagementComponent, FormWorkoutComponent],
   templateUrl: './workouts.component.html',
   styleUrls: ['./workouts.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export default class WorkoutsComponent {
   selectedWorkout?: WorkoutResponse;

   constructor(public workoutsService: WorkoutsService) {}

   deleteWorkout = async (workout: WorkoutResponse) => {
      await this.workoutsService.db.delete(workout.refKey);
   }

   getWorkoutDescription = ({type, endurance, strength}: WorkoutResponse) => {
      return `${type[0].toUpperCase() + type.slice(1)}: ${!!endurance ? `distance: ${endurance.distance}. duration: ${endurance.duration}.` : ''}
      ${!!strength ? `reps: ${strength.reps}. sets: ${strength.sets}. weight: ${strength.weight}.` : ''}
      `;
   }

   handleManageModalClose = () => {
      this.selectedWorkout = undefined;
   }

   handleManageModalOpen = (workout?: WorkoutResponse) => {
      this.selectedWorkout = workout;
   }

   async handleWorkoutSubmit(workout: BaseWorkout) {
      this.selectedWorkout
         ? await this.workoutsService.db.update({...workout, refKey: this.selectedWorkout.refKey})
         : this.workoutsService.db.add(workout);
   }
}
