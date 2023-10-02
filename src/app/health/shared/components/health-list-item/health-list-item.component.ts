import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {A11yModule} from "@angular/cdk/a11y";
import {Named} from "../../types";

@Component({
   selector: 'ft-health-item',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, RouterLink, A11yModule],
   templateUrl: './health-list-item.component.html',
   styleUrls: ['./health-list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthListItemComponent<T extends Named> {
   @Input({required: true}) item!: T;
   @Output() onDelete = new EventEmitter<T>();
   @Output() onClick = new EventEmitter<T>();

   isDeleteDialogVisible = false;

   constructor() {}

   toggleDeleteDialog() {
      this.isDeleteDialogVisible = !this.isDeleteDialogVisible;
   }

   handleDeleteMeal() {
      this.onDelete.emit(this.item);
   }

   handleClick() {
      this.onClick.emit(this.item);
   }
}
