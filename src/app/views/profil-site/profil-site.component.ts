import {Component, Injectable, Input, OnInit, } from '@angular/core';
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
import {TuiInputModule} from '@taiga-ui/kit';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import { inject } from '@angular/core/testing';


@Component({
    selector: 'app-profil-site',
    standalone: true,
    templateUrl: './profil-site.component.html',
    styleUrl: './profil-site.component.css',

    imports: [
      FirendsBarComponent,
      CARDComponent,
      TuiDropdownModule,
      TuiIconModule,
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

export class ProfilSiteComponent{
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
  ) {}



  
  firstName: string = '';
  lastName: string = '';
  name: string = '';
  bio: string = '';
  stadt: string = '';
  followedUsers: { user: User }[] = [];
  items: Post[] = [];
  fileId: string = '';
  postImage: any;
  open = false;

  getFollowedUsers() {
    this.userService
      .findAllNotFollowed(this.authService.getLoggedInUser()?.id!)
      .subscribe((res) => {
        this.followedUsers = res;
      });
  }  
  
  getImageForCard() {
    this.fileService.getImageFile(this.authService.getLoggedInUser()?.fileId ?? '').subscribe((res) => {
      const reader = new FileReader();
            reader.onloadend = () => {
        this.postImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }
  
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

  ngOnInit(): void {
    this.getFollowedUsers();
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getLoggedInUser();
      this.name = user?.name ?? '';
      this.stadt = user?.stadt ?? '';
      this.firstName = user?.firstName ?? '';
      this.lastName =  user?.lastName ?? '';
      this.bio = this.authService.getLoggedInUser()?.bio ?? '';
      this.postService.findAllFromUser(this.authService.getLoggedInUser()?.id ?? '').subscribe((posts) => {
        this.items = posts;
      }, error => {
        console.error('Error:', error);
        this.items = [];
      });
      this.getImageForCard();
  }
}

protected readonly tuiIconFile = tuiIconFile;

testForm = new FormGroup({
  testValue1: new FormControl('A field', Validators.required),
  testValue2: new FormControl('This one can be expanded', Validators.required),
});

}