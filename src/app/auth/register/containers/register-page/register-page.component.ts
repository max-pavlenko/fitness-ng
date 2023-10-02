import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormAuthComponent} from "../../../shared/components/form-auth/form-auth.component";
import {AuthService} from "../../../shared/services/auth.service";
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {injToken, TOKEN} from "../../register.module";
import {SharedModule} from "../../../shared/shared.module";

@Component({
   selector: 'ft-register-page',
   templateUrl: './register-page.component.html',
   styleUrls: ['./register-page.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true,
   imports: [RouterLink, MatButtonModule, SharedModule]
})
export default class RegisterPageComponent {
   constructor(private authService: AuthService, @Inject(injToken) private t: any, private router: Router, @Inject(TOKEN) private token: {
      r: number
   }) {
      console.log(token, 'token', this.t);
   }

   async handleRegisterSubmit(form: FormAuthComponent['form']) {
      const user = await this.authService.createUser(form.getRawValue());
      user && await this.router.navigate(['/']);
   }
}
