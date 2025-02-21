import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {path: "", loadComponent: () => import('./views/feed-page/feed-page.component')
      .then(m => m.FeedPageComponent),},
  {path: 'register', loadComponent: () => import('./views/register-page/register-page.component')
      .then(m => m.RegisterPageComponent)},

  {path: 'profil/:id', loadComponent: () => import('./views/profil-site/profil-site.component')
   .then(m => m.ProfilSiteComponent)},

   {path: 'login', loadComponent: () => import('./views/login-site/login-site.component')
    .then(m => m.LoginSiteComponent)},

    {path: 'editProfil', loadComponent: () => import('./views/edit-profil/edit-profil.component')
      .then(m => m.EditProfilComponent)},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
