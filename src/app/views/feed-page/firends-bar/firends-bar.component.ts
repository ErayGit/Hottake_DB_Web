import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FileService } from '../../../api/file.service';
import { AuthService } from '../../../api/auth.service';
import { UserService } from '../../../api/user.service';
import { User } from '../../../models/User';
import {TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import { NgOptimizedImage } from '@angular/common';
import { FriendCardComponent } from './friend-card/friend-card.component';
import {TuiInputDateRangeModule, TuiInputModule, TuiIslandModule} from '@taiga-ui/kit';
import {Emoji} from "../../../models/Comment";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TuiValueChangesModule} from "@taiga-ui/cdk";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-firends-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TuiButtonModule,
    NgOptimizedImage,
    FriendCardComponent,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiValueChangesModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './firends-bar.component.html',
  styleUrl: './firends-bar.component.css',
})

export class FirendsBarComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  showFriends = ShowFriendsType.VORSCHLAG;
  userName: string = '';
  name: string = '';
  userProfileImage: any;
  users: { user: User }[] = [];
  protected searchFormControl: FormControl = new FormControl("");
  @Output() fetchData = new EventEmitter<any>();


  onSearchChange(searchInput: any) {
    this.getUsers(searchInput);
  }

  logout() {
    this.authService.logout();
  }

  fetchPosts() {
    this.fetchData.emit();
  }

  getProfilePic() {
    this.fileService
      .getImageFile((this.authService.getLoggedInUser() as User).fileId!)
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userProfileImage = reader.result as string;
        };
        reader.readAsDataURL(res);
      });
  }

  getUsers(searchString?: string) {
    switch(this.showFriends) {
      case ShowFriendsType.VORSCHLAG:
        this.getNotFollowedUsers(searchString)
        break;
      case ShowFriendsType.FREUNDE:
        this.getFollowedUsers(searchString)
        break;
    }
  }

  getFollowedUsers(searchString?: string) {
    this.userService
      .findAllFollowed(this.authService.getLoggedInUser()?.id!, searchString)
      .subscribe((res) => {
        this.users = res;
      });
    this.showFriends = ShowFriendsType.FREUNDE
  }

  getNotFollowedUsers(searchString?: string) {
    if(searchString) {
      let params: HttpParams = new HttpParams();
      params = params.set('search', searchString);
    }
    this.userService.findAllNotFollowed(this.authService.getLoggedInUser()?.id!, searchString)
      .subscribe((res) => {
        this.users = res;
      });
    this.showFriends = ShowFriendsType.VORSCHLAG
  }

  ngOnInit(): void {
    this.getUsers();
    this.getProfilePic();
    if (this.authService.isLoggedIn()) {
      let user: any = this.authService.getLoggedInUser();
      this.userName = user?.name ?? '';
      this.name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
    }
  }

  protected readonly ShowFriendsType = ShowFriendsType;
}

export enum ShowFriendsType {
  VORSCHLAG = 'VORSCHLAG',
  FREUNDE = 'FREUNDE',
}
