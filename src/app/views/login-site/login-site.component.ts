import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {tuiIconFile} from "@taiga-ui/icons";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {AuthService} from "../../api/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {FileService} from "../../api/file.service";
import {File} from "../../models/File";
import {PushService, pushTypes} from "../../services/push.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

enum Step {
  LOGIN_INFO_STEP = 'LOGIN_INFO_STEP',
  PERSONAL_STEP = 'PERSONAL_STEP',
}
@Component({
  selector: 'app-login-site',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputFilesModule,
    TuiButtonModule,
    NgIf,
    TuiMarkerIconModule,
    TuiSvgModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './login-site.component.html',
  styleUrl: './login-site.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginSiteComponent {
  constructor(
    private authService: AuthService,
    private pushService: PushService,
    private router: Router,
  ) {

  }


  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });


  create() {
          this.authService.login({
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!,
          }).subscribe(
            (value) => {
              if(!value){
                this.pushService.sendPush(pushTypes.ERROR);
                return;
              }
              this.pushService.sendPush(pushTypes.SUCCESS);
            }
          )
      return;
    }


    routeToRegister() {
      this.router.navigate(['register']);
    }
}
