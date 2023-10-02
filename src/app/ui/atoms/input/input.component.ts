import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlContainer, ReactiveFormsModule} from "@angular/forms";

@Component({
   selector: 'ft-input',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   viewProviders: [{provide: ControlContainer, useFactory: () => inject(ControlContainer, {skipSelf: true})}]
})
export class InputComponent {
   @Input() value?: HTMLInputElement['value'] = '';
   @Input() step?: number = 1;
   @Input() min?: number = 0;
   @Input() max?: number = 1000;
   @Input() type?: HTMLInputElement['type'] = 'text';
   @Input() placeholder?: string = '';
   @Input({required: true}) name: string | number = '';
   @Input() className?: string = '';
}
