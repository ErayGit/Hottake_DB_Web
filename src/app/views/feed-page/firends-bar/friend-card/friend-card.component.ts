import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {User} from '../../../../models/User';
import {FileService} from '../../../../api/file.service';
import {AuthService} from '../../../../api/auth.service';
import {UserService} from '../../../../api/user.service';
import {TuiButtonModule} from '@taiga-ui/core';
import {ShowFriendsType} from "../firends-bar.component";
import {FollowService} from "../../../../api/follow.service";
import {FollowStatus} from "../../../../interfaces/follow-body";
import {PushService, pushTypes} from "../../../../services/push.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [NgOptimizedImage, TuiButtonModule, RouterLink],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css',
})
export class FriendCardComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private followService: FollowService,
    private authService: AuthService,
    private pushService: PushService,
    private userService: UserService
  ) {}
  @Input() user: any;
  @Input() type: any;
  userImage: any;
  @Output() getUsers = new EventEmitter<any>();
  @Output() fetchPosts = new EventEmitter<any>();

  follow() {
    this.followService.addFollow({
      status: FollowStatus.PENDING,
      followerId: this.authService.getLoggedInUser()?.id!,
      followedId: this.user.user.id
    }).subscribe(
      (res) => {
        if(res.body != null) {
          this.pushService.sendPush(pushTypes.SUCCESS);
          this.getUsers.emit();
          this.fetchPosts.emit();
        }
      }
    )
  }

  unfollow() {
    this.followService.deleteFollow(this.authService.getLoggedInUser()?.id!, this.user.user.id).subscribe(
      (res) => {
        if(res) {
          this.pushService.sendPush(pushTypes.SUCCESS);
          this.getUsers.emit();
          this.fetchPosts.emit();
        }
      }
    )
  }

  getImageForFriendCard() {
    this.fileService
      .getImageFile((this.user.user as User).fileId!)
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.userImage = reader.result as string;
        };
        reader.readAsDataURL(res);
      });
  }

  ngOnInit(): void {
    this.getImageForFriendCard();
  }

  protected readonly ShowFriendsType = ShowFriendsType;
}
