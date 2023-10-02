import {Named, RefKey} from "../../shared/types";

export interface BaseWorkout extends Named {
   type: 'endurance' | 'strength',
}

export interface Workout extends BaseWorkout {
   strength?: Strength,
   endurance?: Endurance,
}

export interface StrengthWorkout extends BaseWorkout {
   type: 'strength',
   strength: Strength,
}

export interface EnduranceWorkout extends BaseWorkout {
   type: 'endurance',
   endurance: Endurance,
}

type Strength = {
   reps: number,
   sets: number,
   weight: number,
}

type Endurance = {
   distance: number,
   duration: number,
}

export type WorkoutResponse = Workout & RefKey;
