import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { CARDComponent } from './card/card.component';
import { ProfilBarComponent } from './profil-bar/profil-bar.component';
import { FirendsBarComponent } from './firends-bar/firends-bar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {RegisterPageComponent} from "./views/register-page/register-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

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
    ProfilBarComponent,
    FirendsBarComponent,
    RegisterPageComponent,
    ReactiveFormsModule,
    HttpClientModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiIslandModule,
      TuiInputModule,
      TuiInputFilesModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
}
