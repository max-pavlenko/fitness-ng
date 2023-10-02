import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleControlsComponent} from "../schedule-controls/schedule-controls.component";
import {ScheduleDaysComponent} from "../schedule-days/schedule-days.component";
import {ScheduleSectionComponent} from "../schedule-section/schedule-section.component";
import {ScheduleList, ScheduleSection} from "../../schedule";

@Component({
   selector: 'ft-schedule-calendar',
   standalone: true,
   imports: [CommonModule, ScheduleControlsComponent, ScheduleDaysComponent, ScheduleSectionComponent],
   templateUrl: './schedule-calendar.component.html',
   styleUrls: ['./schedule-calendar.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleCalendarComponent implements OnChanges {
   @Input({required: true, transform: (date: any) => new Date(date.getTime())}) selectedDay = new Date();
   @Input({required: true}) items!: ScheduleList;
   @Output() onDateChange = new EventEmitter<Date>();
   @Output() onSectionSelect = new EventEmitter<any>();

   selectedDayIndex = 0;
   selectedWeek!: Date;
   sections: ScheduleSection[] = [
      {key: 'morning', name: 'Morning'},
      {key: 'lunch', name: 'Lunch'},
      {key: 'evening', name: 'Evening'},
      {key: 'snacks', name: 'Snacks and Drinks'},
   ];

   constructor() {}

   ngOnChanges() {
      this.selectedDayIndex = this.getToday(this.selectedDay);
      this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
   }

   selectSection(scheduleData: string[], sectionName: ScheduleSection['key']) {
      this.onSectionSelect.emit({
         ...scheduleData,
         sectionName,
      });
   }

   getSection(name: ScheduleSection['key']) {
      return this.items[name];
   }

   handleDateChange(weekOffset: number) {
      this.selectedDayIndex = 0;
      const startOfWeek = this.getStartOfWeek(new Date());
      const startDate = (new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()));
      startDate.setDate(startDate.getDate() + (weekOffset * 7));
      this.onDateChange.emit(startDate);
   }

   handleDateSelect(dayIndex: number) {
      this.selectedDayIndex = dayIndex;
      const selectedDay = new Date(this.selectedWeek);
      selectedDay.setDate(selectedDay.getDate() + dayIndex)
      this.onDateChange.emit(selectedDay);
   }

   private getStartOfWeek(date: Date) {
      const day = date.getDay();
      const isDaySunday = day === 0;
      const diff = date.getDate() - day + (isDaySunday ? -6 : 1);
      return new Date(date.setDate(diff));
   }

   private getToday(date: Date) {
      let today = date.getDay() - 1;
      if (today < 0) {
         today = 6;
      }
      return today;
   }
}
