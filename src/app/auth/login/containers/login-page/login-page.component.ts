import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormAuthComponent} from "../../../shared/components/form-auth/form-auth.component";
import {AuthService} from "../../../shared/services/auth.service";
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../shared/shared.module";

@Component({
   selector: 'ft-login-page',
   templateUrl: './login-page.component.html',
   styleUrls: ['./login-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true,
   imports: [RouterLink, MatButtonModule, SharedModule]
})
export class LoginPageComponent {

   constructor(private authService: AuthService, private router: Router) {}

   async handleLoginSubmit(form: FormAuthComponent['form']) {
      const user = await this.authService.login(form.getRawValue());
      user && await this.router.navigate(['/']);
   }
}
