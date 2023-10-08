import {ChangeDetectionStrategy, Component, ContentChild, DestroyRef, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormMealComponent} from "../../../meal/components/form-meal/form-meal.component";
import {HealthListItemComponent} from "../../components/health-list-item/health-list-item.component";
import {ModalComponent} from "../../../../ui/atoms/modal/modal.component";
import {TrackByPropertyDirective} from "../../../../shared/directives/track-by-property.directive";
import {Observable} from "rxjs";
import {Named, RefKey, Submittable} from "../../types";
import {SUBMITTABLE_TOKEN} from "../../tokens/submittable.token";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
   selector: 'ft-health-management',
   standalone: true,
   imports: [CommonModule, FormMealComponent, HealthListItemComponent, ModalComponent, NgOptimizedImage, TrackByPropertyDirective],
   templateUrl: './health-management.component.html',
   styleUrls: ['./health-management.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthManagementComponent<T extends RefKey & Named> implements OnInit {
   @Input({required: true}) title = '';
   @Input({required: true}) items$!: Observable<T[]>;
   @Input({required: true}) itemDescriptionHandler!: (item: T) => string;
   @Input({required: true}) onDelete!: (item: T) => any;
   @Input() onModalClose?: () => any;
   @Input() onModalOpen?: (item?: T) => any;
   isManageModalOpen = false;
   @ContentChild(SUBMITTABLE_TOKEN, {static: true}) formComponent?: Submittable;

   constructor(private destroyRef: DestroyRef) {}

   ngOnInit() {
      if (this.formComponent) this.formComponent.onSubmit.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
         this.handleCloseModal();
      });
   }

   handleModalToggle() {
      this.isManageModalOpen = !this.isManageModalOpen;
   }

   handleCloseModal() {
      this.isManageModalOpen = false;
      this.onModalClose?.();
   }

   handleOpenModal(item?: T) {
      if (item !== undefined) this.onModalOpen?.(item);
      this.isManageModalOpen = true;
   }
}
