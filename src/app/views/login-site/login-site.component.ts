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
import {RouterLink, RouterLinkActive} from "@angular/router";

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
    private fileService: FileService,
    private authService: AuthService,
    private pushService: PushService
  ) {

  }


  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  fileControl = new FormControl();
  step = Step.LOGIN_INFO_STEP;

  nextButton(){
    if(this.step === Step.LOGIN_INFO_STEP) {
      this.step = Step.PERSONAL_STEP;
    } else {
      this.step = Step.LOGIN_INFO_STEP;
    }
  }

  create() {
    let fileId: string | null;
    if(this.fileControl.value || this.fileControl.value?.length === 0){
      const formData = new FormData();
      formData.append(
        "file",
        this.fileControl.value,
        this.fileControl.value.name,
      );
      this.fileService.addImage(formData).subscribe((response) => {console.log("dontknow")
        if(response.ok){
          console.log(response.body, "ok");
          fileId = (response.body! as File).id
          this.authService.login({
            email: this.loginForm.value.email!,
            password: this.loginForm.value.password!,
            fileId: fileId
          }).subscribe(
            (value) => {
              if(!value){
                this.fileService.deleteImage(fileId!);
                this.pushService.sendPush(pushTypes.ERROR);
              }
              this.pushService.sendPush(pushTypes.SUCCESS);
            }
          )
        }
      })
      return;
    }
    this.authService.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
      fileId: ''
    }).subscribe((value) => {
      if(!value){
        this.pushService.sendPush(pushTypes.ERROR);
      }
      console.log(value);
      this.pushService.sendPush(pushTypes.SUCCESS);
    })
  }



  removeFile() {
    this.fileControl.setValue(null);
  }

  protected readonly tuiIconFile = tuiIconFile;
}
