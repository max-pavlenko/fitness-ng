import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, ReplaySubject, shareReplay, switchMap, tap} from "rxjs";
import {getAuth} from "@angular/fire/auth";
import {endAt, getDatabase, list, orderByChild, query, QueryConstraint, ref, startAt} from "@angular/fire/database";
import {ScheduleList, Section} from "./schedule";
import {QueryChange} from "rxfire/database/interfaces";

@Injectable({
   providedIn: 'root'
})
export class ScheduleService {
   date$ = new BehaviorSubject(new Date());
   section$ = new ReplaySubject<Section>(1);

   schedule$ = this.date$.pipe(
      switchMap((day) => {
         const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
         const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;

         return this.getSchedule(startAt, endAt)
      }),
      tap((data) => console.log(data)),
      map((queryChanges) => {
         return queryChanges.reduce((acc, change) => {
            const value = change.snapshot.val();
            return {...acc, [value.section]: value}
         }, {} as ScheduleList)
      }),
      shareReplay(1),
   )

   constructor() { }

   private getSchedule(start: number, end: number): Observable<QueryChange[]> {
      const scheduleRef = ref(getDatabase(), `schedule/${getAuth().currentUser?.uid}`);
      const constraints: QueryConstraint[] = [startAt(start), endAt(end), orderByChild('timestamp')];
      return list(query(scheduleRef, ...constraints));
   }
}
