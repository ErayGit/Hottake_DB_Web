import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FileService } from '../../../api/file.service';
import { AuthService } from '../../../api/auth.service';
import { UserService } from '../../../api/user.service';
import { User } from '../../../models/User';
import { TuiButtonModule } from '@taiga-ui/core';
import { NgOptimizedImage } from '@angular/common';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import {Emoji} from "../../../models/Comment";


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

  logout() {
    this.authService.logout();
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

  getUsers() {
    switch(this.showFriends) {
      case ShowFriendsType.VORSCHLAG:
        this.getNotFollowedUsers()
        break;
      case ShowFriendsType.FREUNDE:
        this.getFollowedUsers()
        break;
    }
  }

  getFollowedUsers() {
    this.userService
      .findAllFollowed(this.authService.getLoggedInUser()?.id!)
      .subscribe((res) => {
        this.users = res;
      });
    this.showFriends = ShowFriendsType.FREUNDE
  }

  getNotFollowedUsers() {
    this.userService.findAllNotFollowed(this.authService.getLoggedInUser()?.id!)
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
