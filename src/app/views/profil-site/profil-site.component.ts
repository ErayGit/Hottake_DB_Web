import {Component, Input, OnInit} from '@angular/core';
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



@Component({
    selector: 'app-profil-site',
    standalone: true,
    templateUrl: './profil-site.component.html',
    styleUrl: './profil-site.component.css',
    imports: [
      FirendsBarComponent,
      CARDComponent,
      TuiIconModule,
      NgOptimizedImage,
      RouterLink,
      RouterLinkActive,]
})
export class ProfilSiteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService
  ) {}

  userId: string = '';
  userName: string = '';
  name: string = '';
  bio: string = '';
  followedUsers: { user: User }[] = [];
  items: Post[] = [];
  fileId: string = '';
  postImage: any;

  getFollowedUsers(userId: string) {
    this.userService
      .findAllNotFollowed(userId)
      .subscribe((res) => {
        this.followedUsers = res;
      });
  }

  getImageForCard(userId: string) {
    this.fileService.getImageFile(userId).subscribe((res) => {
      const reader = new FileReader();
            reader.onloadend = () => {
        this.postImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (!this.userId) {
        this.userId = this.authService.getLoggedInUser()?.id!
      }
      this.userService.findOne(this.userId).subscribe((userObject) => {
        const user: User = userObject.user
        this.getFollowedUsers(user.id);
        this.userName = user?.name ?? '';
        this.name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
        this.bio = user?.bio;
        this.postService.findAllFromUser(user.id).subscribe((posts) => {
          this.items = posts;
        }, error => {
          console.error('Error:', error);
          this.items = [];
        });
        this.getImageForCard(user.fileId!);
      });
    });
}
protected readonly tuiIconFile = tuiIconFile;
}
