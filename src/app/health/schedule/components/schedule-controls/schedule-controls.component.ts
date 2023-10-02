import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
   selector: 'ft-schedule-controls',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage],
   templateUrl: './schedule-controls.component.html',
   styleUrls: ['./schedule-controls.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent {
   offset = 0;

   @Input({required: true}) selectedDate!: Date;

   @Output() move = new EventEmitter<number>();

   moveDate(offset: number) {
      this.offset = offset;
      this.move.emit(offset);
   }
}
