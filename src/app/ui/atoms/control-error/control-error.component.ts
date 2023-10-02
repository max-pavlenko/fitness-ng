import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
   selector: 'ft-control-error',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './control-error.component.html',
   styleUrls: ['./control-error.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {

}
