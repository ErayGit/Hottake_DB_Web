import {Component, Injectable, Input, OnInit, inject, ChangeDetectionStrategy,} from '@angular/core';
import { FirendsBarComponent } from "../feed-page/firends-bar/firends-bar.component";
import { CARDComponent } from "../feed-page/card/card.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TuiIconModule} from '@taiga-ui/experimental';
import { AuthService } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import {NgOptimizedImage} from "@angular/common";
import { FileService } from '../../api/file.service';
import { PostService } from '../../api/post.service';
import { Post } from '../../models/Post';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiDropdownModule} from '@taiga-ui/core';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {PushService, pushTypes} from "../../services/push.service";
import {Router} from "@angular/router";
import { ProfilSiteComponent } from '../profil-site/profil-site.component';
import * as console from "node:console";

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    FirendsBarComponent,
    CARDComponent,
    TuiDropdownModule,
    TuiInputFilesModule,
    TuiIconModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiInputModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    FormsModule,
    RouterLink,
    RouterLinkActive,]
})

@Injectable({
  providedIn: "root",
})

export class EditProfilComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
    private pushService: PushService,
    private profilComponent: ProfilSiteComponent,
    private postService: PostService,
    private router: Router,
  ) {}

  name: string = '';
  firstName: string = '';
  lastName: string = '';
  bio: string = '';
  items: Post[] = [];
  fileId: string = '';
  stadt: string = '';
  data: any[] = [];
  userId: string = "";
  private page: number = 0;

readonly loginForm = new FormGroup({
  bio: new FormControl(''),
  name: new FormControl(''),
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  stadt: new FormControl('')
});

loadUserData() {
  let user = this.authService.getLoggedInUser();
  this.name = user?.name ?? '';
  this.firstName = user?.firstName ?? '';
  this.lastName =  user?.lastName ?? '';
  this.userId = user?.id ?? '';
  this.stadt = user?.stadt ?? '';
  this.bio = user?.bio ?? '';
  this.postService.findAllFromUser(user?.id ?? '', this.page).subscribe((posts) => {
    this.items = posts;
  }, error => {
    console.error('Error:', error);
    this.items = [];
  });
}

  create() {
  this.userService.updateUser(this.authService.getLoggedInUser()?.id ?? '', this.loginForm.value.bio!, this.loginForm.value.name!, this.loginForm.value.firstName!, this.loginForm.value.lastName!, this.loginForm.value.stadt!)
  .subscribe((value) => {
    if(!value){
      this.pushService.sendPush(pushTypes.ERROR);
      return;
    }
    this.authService.setLoggedInUser(value.user.user);
    this.profilComponent.loadUserData();
    this.pushService.sendPush(pushTypes.SUCCESS);
    this.router.navigate(['/profil', value.user.user.id]);
  })
  return;
}

delete(){
  this.userService.deleteUser(this.authService.getLoggedInUser()?.id ?? '').subscribe((value) => {
    if(!value){
      this.pushService.sendPush(pushTypes.ERROR);
      return;
    }
    this.authService.logout();
    this.pushService.sendPush(pushTypes.SUCCESS);
    this.router.navigate(['/login']);
  })
  return;
}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.loadUserData();
    }
  }
}
