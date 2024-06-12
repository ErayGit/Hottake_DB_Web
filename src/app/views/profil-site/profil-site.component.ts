import { Component } from '@angular/core';
import { FirendsBarComponent } from "../feed-page/firends-bar/firends-bar.component";
import { CARDComponent } from "../feed-page/card/card.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TuiIconModule} from '@taiga-ui/experimental';
import {tuiIconFile} from "@taiga-ui/icons";
import { User } from '../../models/User';
import { AuthService } from '../../api/auth.service';
import { UserService } from '../../api/user.service';
import { FileService } from '../../api/file.service';
import { PostService } from '../../api/post.service';
import { Post } from '../../models/Post';
import { File } from '../../models/File';



@Component({
    selector: 'app-profil-site',
    standalone: true,
    templateUrl: './profil-site.component.html',
    styleUrl: './profil-site.component.css',
    imports: [
      FirendsBarComponent,
      CARDComponent,
      TuiIconModule,
      RouterLink,
      RouterLinkActive,]
})
export class ProfilSiteComponent{
  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService
  ) {}
  userName: string = '';
  name: string = '';
  bio: string = '';
  followedUsers: { user: User }[] = [];
  items: Post[] = [];
  fileId: File[] = []


  getFollowedUsers() {
    this.userService
      .findAllNotFollowed(this.authService.getLoggedInUser()?.id!)
      .subscribe((res) => {
        this.followedUsers = res;
      });
  }  

  ngOnInit(): void {
    this.getFollowedUsers();
    if (this.authService.isLoggedIn()) {
      let user = this.authService.getLoggedInUser();
      this.userName = user?.name ?? '';
      this.name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
      this.bio = this.authService.getLoggedInUser()?.bio ?? '';
      this.postService.findAllFromUser(this.authService.getLoggedInUser()?.id ?? '').subscribe(posts => {
        this.items = posts;
      }, error => {
        console.error('Error:', error);
        this.items = [];
      });
  }
}
protected readonly tuiIconFile = tuiIconFile;

}