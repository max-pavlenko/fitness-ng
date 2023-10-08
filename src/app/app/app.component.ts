import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {JsonPipe} from "@angular/common";
import {NavComponent} from "../layout/nav/nav.component";
import {HeaderComponent} from "../layout/header/header.component";
import {MatButtonModule} from "@angular/material/button";

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterOutlet, JsonPipe, NavComponent, HeaderComponent, MatButtonModule]
})
export class AppComponent {
   constructor() {}
}
