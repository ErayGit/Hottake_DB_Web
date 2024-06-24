import {Component, Injectable, Input, OnInit, inject, } from '@angular/core';
import { FirendsBarComponent } from "../feed-page/firends-bar/firends-bar.component";
import { CARDComponent } from "../feed-page/card/card.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TuiIconModule} from '@taiga-ui/experimental';
import {tuiIconFile} from "@taiga-ui/icons";
import { User } from '../../models/User';
import { AuthService } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import {NgOptimizedImage} from "@angular/common";
import { FileService } from '../../api/file.service';
import { PostService } from '../../api/post.service';
import { Post } from '../../models/Post';
import { File } from '../../models/File';
import { FormsModule } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {TuiDropdownModule} from '@taiga-ui/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import {TuiInputFilesModule, TuiInputModule, TuiIslandModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {PushService, pushTypes} from "../../services/push.service";
import {Router} from "@angular/router";
import { ProfilSiteComponent } from '../profil-site/profil-site.component';

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

export class EditProfilComponent {
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
  followedUsers: { user: User }[] = [];
  items: Post[] = [];
  fileId: string = '';
  stadt: string = '';
  postImage: any;
  open = false;
  data: any[] = [];

  getFollowedUsers() {
    this.userService
      .findAllNotFollowed(this.authService.getLoggedInUser()?.id!)
      .subscribe((res) => {
        this.followedUsers = res;
      });
  }  

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
  this.stadt = user?.stadt ?? '';
  this.bio = user?.bio ?? '';
  this.postService.findAllFromUser(user?.id ?? '').subscribe((posts) => {
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
    console.log(value);
    this.authService.setLoggedInUser(value);
    this.profilComponent.loadUserData();
    this.pushService.sendPush(pushTypes.SUCCESS);
    this.router.navigate(['/profil']);
  })
  return;
}

ngOnInit(): void {
  this.getFollowedUsers();
  if (this.authService.isLoggedIn()) {
    this.loadUserData();
}
}

}
