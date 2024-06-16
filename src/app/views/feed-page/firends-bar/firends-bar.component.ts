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
  users: { user: User }[] = [];
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

  protected readonly length = length;

  ngOnInit(): void {
    this.getFollowedUsers();
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getLoggedInUser();
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
