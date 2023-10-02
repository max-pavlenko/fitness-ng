import {Directive, Host, Input} from "@angular/core";
import {NgForOf} from "@angular/common";

@Directive({
   selector: "[ftForTrackByProperty]",
   standalone: true
})
export class TrackByPropertyDirective {
   public constructor(@Host() private readonly _ngFor: NgForOf<any>) {
      this._ngFor.ngForTrackBy = (_: number, item: Record<string, any>) => this._propertyName ? item[this._propertyName] : item;
   }

   private _propertyName: string = "";

   @Input("ngForTrackByProperty")
   public set propertyName(value: string | null) {
      this._propertyName = value ?? "";
   }

}
