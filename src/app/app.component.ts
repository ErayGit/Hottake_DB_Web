import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiButtonModule} from "@taiga-ui/core";
import { Component } from '@angular/core';
import { CARDComponent } from './views/feed-page/card/card.component';
import { FirendsBarComponent } from './views/feed-page/firends-bar/firends-bar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {RegisterPageComponent} from "./views/register-page/register-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {ImageCropperComponent} from "ngx-image-cropper";

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
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
}
