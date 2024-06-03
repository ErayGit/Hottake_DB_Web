import {RouterModule, Routes} from '@angular/router';
import {FeedPageComponent} from "./views/feed-page/feed-page.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {path: "", component: FeedPageComponent},
  {path: 'register', loadComponent: () => import('./views/register-page/register-page.component')
      .then(m => m.RegisterPageComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
