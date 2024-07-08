import {Component, Injectable, Input, OnInit, } from '@angular/core';
import { FirendsBarComponent } from "../feed-page/firends-bar/firends-bar.component";
import { CARDComponent } from "../feed-page/card/card.component";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
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
import { HttpParams } from '@angular/common/http';
import {NgModule} from '@angular/core';

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

export class ProfilSiteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
  ) {}

  firstName: string = '';
  lastName: string = '';
  userId: string = '';
  name: string = '';
  bio: string = '';
  stadt: string = '';
  items: Post[] = [];
  fileId: string = '';
  postImage: any;
  logginUserId: string = '';
  postCount: number = 0;
  page: number = 0;

  getImageForCard(userId: string) {
    this.fileService.getImageFile(userId).subscribe((res) => {
      const reader = new FileReader();
            reader.onloadend = () => {
        this.postImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }

  addData() {
    let userId = '54d2abbd-2376-11ef-a4b9-02420a000403';
    this.page = this.page + 1;
    if (this.authService.isLoggedIn()) {
      const loggedInUser = this.authService.getLoggedInUser();
      if (loggedInUser) {
        userId = loggedInUser.id;
      }
    }
    return this.postService.findAllFromUser(userId, this.page).subscribe((posts) => {
      this.items = this.items.concat(posts);
    });
  }

  fetchPostCount() {
    let userId = '54d2abbd-2376-11ef-a4b9-02420a000403';
    if (this.authService.isLoggedIn()) {
      const loggedInUser = this.authService.getLoggedInUser();
      if (loggedInUser) {
        userId = loggedInUser.id;
      }
    }
    return this.postService.countAllFromUser(userId).subscribe((countObj) => {
      this.postCount = countObj.count;
    });
  }

  loadUserData() {
    let user = this.authService.getLoggedInUser();
    this.name = user?.name ?? '';
    this.firstName = user?.firstName ?? '';
    this.lastName =  user?.lastName ?? '';
    this.logginUserId = user?.id ?? '';
    this.stadt = user?.stadt ?? '';
    this.bio = user?.bio ?? '';
    this.page = 0;
    this.fetchPostCount();
    this.postService.findAllFromUser(user?.id ?? '', this.page).subscribe((posts) => {
      this.items = posts;
    }, error => {
      console.error('Error:', error);
      this.items = [];
    });
  }

  ngOnInit(): void {
    this.logginUserId = this.authService.getLoggedInUser()?.id ?? '';
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (!this.userId) {
        this.userId = this.authService.getLoggedInUser()?.id!
      }
      this.userService.findOne(this.userId).subscribe((userObject) => {
        const user: User = userObject.user
        this.firstName = user?.name ?? '';
        this.stadt = user?.stadt ?? '';
        this.name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
        this.bio = user?.bio;
        this.page = 0;
        this.fetchPostCount();
        this.postService.findAllFromUser(user.id, this.page).subscribe((posts) => {
          this.items = posts;
        }, error => {
          console.error('Error:', error);
          this.items = [];
        });
        this.getImageForCard(user.fileId!);
      });
    });
}
}
