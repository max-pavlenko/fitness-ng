import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {A11yModule} from "@angular/cdk/a11y";

@Component({
   selector: 'ft-modal',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, A11yModule],
   templateUrl: './modal.component.html',
   styleUrls: ['./modal.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
   @Input({required: true}) isOpen = false;
   @Output() onClose = new EventEmitter<() => void>();

   close() {
      this.onClose?.emit();
   }

   preventClosing(event: Event) {
      event.stopPropagation();
   }
}
