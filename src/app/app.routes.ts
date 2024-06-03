import { Routes } from '@angular/router';
import {RegisterPageComponent} from "./views/register-page/register-page.component";
import {FeedPageComponent} from "./views/feed-page/feed-page.component";

export const routes: Routes = [
  {path: "", component: FeedPageComponent},
  {path: 'register', component: RegisterPageComponent}
];
