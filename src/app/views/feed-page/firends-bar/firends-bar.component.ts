import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FileService } from '../../../api/file.service';
import { AuthService } from '../../../api/auth.service';
import {UserService} from "../../../api/user.service";
import { User } from '../../../models/User';
import {TuiButtonModule} from "@taiga-ui/core";
import {NgOptimizedImage} from "@angular/common";
import {FriendCardComponent} from "./friend-card/friend-card.component";
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-firends-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TuiButtonModule, NgOptimizedImage, FriendCardComponent, TuiIslandModule],
  templateUrl: './firends-bar.component.html',
  styleUrl: './firends-bar.component.css',
})
export class FirendsBarComponent implements OnInit{
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  followedUsers: { user: User; }[] = [];

  getFollowedUsers() {
    this.userService.findAllNotFollowed(this.authService.getLoggedInUser()?.id!).subscribe(
      (res) => {
        this.followedUsers = res;
      }
    )
  }

  //TODO: Implement get Image
  // ngOnInit(): void {
  //   if (this.authService.getLoggedInUser() !== null) {
  //     this.authService.getLoggedInUser().subscribe((user) => {
  //       this.name = user.name;
  //       this.userName = user.userName;
  //       this.fileService.getImage(user.imageId).subscribe((image) => {
  //         this.image = image;
  //       });
  //     });
  //   }
  // }
  protected readonly length = length;

  ngOnInit(): void {
    this.getFollowedUsers();
  }
}
