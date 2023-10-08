import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Auth} from "@angular/fire/auth";
import {AuthService} from "../../auth/shared/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
   selector: 'ft-header',
   standalone: true,
   imports: [CommonModule, NgOptimizedImage, RouterLink, MatButtonModule],
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
   constructor(public auth: Auth, private router: Router, public authService: AuthService) {}

   async logoutUser() {
      await this.authService.logout();
      await this.router.navigate(['/']);
   }
}
