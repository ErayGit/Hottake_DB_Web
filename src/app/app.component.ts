import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDropdownModule
} from "@taiga-ui/core";
import {Component, OnInit, Output} from '@angular/core';
import { CARDComponent } from './views/feed-page/card/card.component';
import { FirendsBarComponent } from './views/feed-page/firends-bar/firends-bar.component';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {RegisterPageComponent} from "./views/register-page/register-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {ImageCropperComponent} from "ngx-image-cropper";
import {Subscription} from "rxjs";
import {NotificationService} from "./api/notification.service";
import {TuiActiveZoneModule, TuiObscuredModule} from "@taiga-ui/cdk";
import {AuthService} from "./api/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CARDComponent,
    FirendsBarComponent,
    RegisterPageComponent,
    ReactiveFormsModule,
    HttpClientModule,
    TuiRootModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiIslandModule,
    TuiInputModule,
    TuiInputFilesModule,
    PickerModule,
    ImageCropperComponent,
    TuiDropdownModule,
    TuiActiveZoneModule,
    TuiObscuredModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  private loginSubscription: Subscription | undefined;
  protected open: boolean = false;
  protected notification: boolean = false;
  protected notificationList: {
    name: string;
    createdAt: string;
  }[] = [];

  onClickNotification(): void {
    this.open = !this.open;
    this.notification = false
  }

  onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }

  listen() {
    this.notificationService.onEvent('notify').subscribe({
      next: (data) => {
        this.notification = true
        this.notificationList.push({
          name: data.user.name,
          createdAt: data.post.createdAt,
        })
      }
    });
  }

  ngOnInit(): void {
    this.loginSubscription = this.authService.isLoggedInObservable().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.notificationService.connect();
        this.listen();
      } else {
        this.router.navigate(['login']);
      }
    });

    if (this.authService.isLoggedIn()) {
      this.notificationService.connect();
      this.notificationService.onEvent('notify').subscribe({
        next: (data) => {
          this.notification = true
          this.notificationList.push({
            name: data.user.name,
            createdAt: data.post.createdAt,
          })
        }
      });
    }
  }
}
