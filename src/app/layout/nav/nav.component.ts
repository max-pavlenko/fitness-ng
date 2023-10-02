import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
   selector: 'ft-nav',
   standalone: true,
   imports: [CommonModule, RouterLink, RouterLinkActive],
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

}
