import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {path: "", loadComponent: () => import('./views/feed-page/feed-page.component')
      .then(m => m.FeedPageComponent)},
  {path: 'register', loadComponent: () => import('./views/register-page/register-page.component')
      .then(m => m.RegisterPageComponent)},

  {path: 'profil', loadComponent: () => import('./views/profil-site/profil-site.component')
   .then(m => m.ProfilSiteComponent)},

   {path: 'login', loadComponent: () => import('./views/login-site/login-site.component')
    .then(m => m.LoginSiteComponent)},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
