import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from "../../../../ui/atoms/button/button.component";
import {RouterLink} from "@angular/router";
import {Section} from "../../schedule";

@Component({
   selector: 'ft-schedule-assign',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, ButtonComponent, RouterLink],
   templateUrl: './schedule-assign.component.html',
   styleUrls: ['./schedule-assign.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit {
   @Input() section!: Section;
   @Output() update = new EventEmitter<any>();
   @Output() cancel = new EventEmitter<any>();
   private selected: string[] = [];

   ngOnInit() {
      console.log(this.section, 'this.section')
      this.selected = [...this.section.assigned];
   }

   toggleItem(name: string) {
      if (this.exists(name)) {
         this.selected = this.selected.filter(item => item !== name);
      } else {
         this.selected = [...this.selected, name];
      }
   }

   exists(name: string) {
      return !!~this.selected.indexOf(name);
   }

   updateAssign() {
      this.update.emit({
         [this.section.type]: this.selected
      });
   }

   cancelAssign() {
      this.cancel.emit();
   }
}
