import {DataSnapshot} from "@angular/fire/database";
import {EventEmitter} from "@angular/core";

export type RefKey = {
   refKey: DataSnapshot['key']
}

export interface Named {
   name: string
}

export interface Submittable<T = unknown> {
   onSubmit: EventEmitter<T>;
}
