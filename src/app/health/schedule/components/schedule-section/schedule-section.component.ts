import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleItem} from "../../schedule";

@Component({
   selector: 'ft-schedule-section',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './schedule-section.component.html',
   styleUrls: ['./schedule-section.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent {
   @Input({required: true}) name = '';
   @Input({required: true}) section!: ScheduleItem;

   @Output() select = new EventEmitter();

   onSelect(type: string, assigned: any[] = []) {
      this.select.emit({
         type,
         assigned,
         data: this.section
      });
   }
}
