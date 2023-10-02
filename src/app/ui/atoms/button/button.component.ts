import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
   selector: 'ft-button',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './button.component.html',
   styleUrls: ['./button.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
   @Input() disabled = false;
   @Input() type: HTMLButtonElement['type'] = 'button';
   @Input() class: string | 'cancel' | 'delete' = ''
}
