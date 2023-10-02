import {ToastConfig} from "@ngneat/hot-toast";
import {Routes} from "@angular/router";
import {authGuard} from "../auth/shared/guards/auth.guard";

export const TOAST_CONFIG: Partial<ToastConfig> = {
   position: 'top-right',
   iconTheme: {
      primary: '#9354ec',
      secondary: '#fee8ff',
   },
   dismissible: true,
   style: {
      textAlign: 'center'
   },
}
export const ROUTES: Routes = [
   {
      path: '', canActivateChild: [authGuard], children: [
         {path: 'meals', loadComponent: () => import('../health/meal/containers/meals/meals.component')},
         {path: 'workouts', loadComponent: () => import('../health/workout/containers/workouts/workouts.component'),},
         {path: 'schedule', loadComponent: () => import('../health/schedule/containers/schedule/schedule.component'),},
      ]
   },
   {path: '**', redirectTo: '/', pathMatch: 'full'},
];
