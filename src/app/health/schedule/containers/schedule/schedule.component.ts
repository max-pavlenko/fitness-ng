import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleService} from "../../schedule.service";
import {ScheduleCalendarComponent} from "../../components/schedule-calendar/schedule-calendar.component";
import {ScheduleAssignComponent} from "../../components/schedule-assign/schedule-assign.component";
import {WorkoutsService} from "../../../workout/workouts.service";
import {MealsService} from "../../../meal/meals.service";

@Component({
   selector: 'ft-schedule',
   standalone: true,
   imports: [CommonModule, ScheduleCalendarComponent, ScheduleAssignComponent],
   templateUrl: './schedule.component.html',
   styleUrls: ['./schedule.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ScheduleComponent {
   open = false;

   constructor(public scheduleService: ScheduleService, private workoutsService: WorkoutsService,
               private mealsService: MealsService) {}

   get date() {
      return this.scheduleService.date$;
   }

   handleDateChange(date: Date) {
      this.scheduleService.date$.next(date);
   }

   handleSectionSelect(event: any) {
      this.open = true;
      this.scheduleService.section$.next(event);
   }

   handleCancelScheduleAssign() {
      this.open = false;
   }

   handleUpdateScheduleAssign(event: any) {
      this.scheduleService.section$.next(event);
      this.handleCancelScheduleAssign();
   }
}
