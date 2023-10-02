import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
   selector: 'ft-schedule-days',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './schedule-days.component.html',
   styleUrls: ['./schedule-days.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent {
   @Input({required: true}) selectedDayIndex = 0;
   @Output() onSelectDay = new EventEmitter<number>();

   days = ['M', 'T', 'W', 'T', 'F', 'Sa', 'Su'];

   selectDay(index: number) {
      this.onSelectDay.emit(index);
   }
}
