import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   c = 1;
   a = 1;
   private b = 2

   constructor() {}
}
