import {getDatabase, list, push, ref, remove, update} from "@angular/fire/database";
import {getAuth} from "@angular/fire/auth";
import {map, Observable, shareReplay} from "rxjs";
import {RefKey} from "../types";

export class DatabaseService<T, TResponse extends T & RefKey> {
   db = getDatabase();
   private readonly USER_DATA_PATH = `${this.path}/${getAuth().currentUser!.uid}`;
   userDataRef = ref(this.db, this.USER_DATA_PATH)
   data$: Observable<TResponse[]> = list(this.userDataRef).pipe(
      map(queryChange => queryChange.map(({snapshot}) => ({...snapshot.val(), refKey: snapshot.key}))),
      shareReplay(1)
   );

   constructor(private path: string) {}

   add(data: T) {
      return push(this.userDataRef, data);
   }

   async delete(refKey: TResponse['refKey']) {
      await remove(ref(this.db, `${this.USER_DATA_PATH}/${refKey}`));
   }

   async update({refKey, ...data}: TResponse) {
      await update(ref(this.db, `${this.USER_DATA_PATH}/${refKey}`), data);
   }
}
