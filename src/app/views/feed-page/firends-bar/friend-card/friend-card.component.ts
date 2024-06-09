import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {User} from "../../../../models/User";
import {FileService} from "../../../../api/file.service";
import {AuthService} from "../../../../api/auth.service";
import {UserService} from "../../../../api/user.service";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TuiButtonModule
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent implements OnInit{
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
  ) {
  }
  @Input() user: any;
  userImage: any
  @Output() getFollowedUsers = new EventEmitter<any>();

  follow() {
    this.getFollowedUsers.emit();
  }

  getImageForFriendCard() {
    this.fileService.getImageFile((this.user.user as User).fileId!).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }

  ngOnInit(): void {
    this.getImageForFriendCard()
  }
}
