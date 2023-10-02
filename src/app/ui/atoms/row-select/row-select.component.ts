import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
   selector: 'ft-row-select',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage],
   templateUrl: './row-select.component.html',
   styleUrls: ['./row-select.component.scss'],
   providers: [{provide: NG_VALUE_ACCESSOR, useExisting: RowSelectComponent, multi: true}],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowSelectComponent<T extends string[]> implements ControlValueAccessor {
   @Input({required: true}) options: T = [] as unknown as T;
   value = this.options[0];
   private onTouch!: () => void;
   private onModelChange!: (value: string) => void;

   registerOnTouched(fn: typeof this.onTouch) {
      this.onTouch = fn;
   }

   registerOnChange(fn: typeof this.onModelChange) {
      this.onModelChange = fn;
   }

   writeValue(value: string) {
      this.value = value;
   }

   setSelected(value: string) {
      this.writeValue(value)
      this.onModelChange(value);
      this.onTouch();
   }
}
