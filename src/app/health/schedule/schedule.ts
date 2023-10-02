import {Workout} from "../workout/models/workout";
import {Meal} from "../meal/meal";
import {Named} from "../shared/types";

export interface ScheduleItem {
   type: 'workouts' | 'meals',
   meals?: Meal[],
   workouts?: Workout[],
   section: string,
   assigned: string[],
}

export interface ScheduleList {
   morning?: ScheduleItem,
   lunch?: ScheduleItem,
   evening?: ScheduleItem,
   snacks?: ScheduleItem,
}

export interface ScheduleSection extends Named {
   key: keyof ScheduleList,
}

export type Section = {
   assigned: string[];
   type: string;
} & Record<string, any[]>
