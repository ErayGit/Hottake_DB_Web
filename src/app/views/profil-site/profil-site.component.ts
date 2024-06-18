import {Component, Input, OnInit} from '@angular/core';
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
      FormsModule,
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
  fileId: string = '';
  postImage: any;

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

  updateUser() {
    const updatedData = {
      // Die Daten, die Sie aktualisieren möchten
    };
    this.userService.updateUser(this.authService.getLoggedInUser()?.id ?? '', updatedData).subscribe(() => {
      // Was Sie tun möchten, nachdem die Daten erfolgreich aktualisiert wurden
    });
  }

  updateBio() {
    this.userService.updateUser(this.authService.getLoggedInUser()?.id ?? '', { bio: this.bio }).subscribe(() => {
      // Was Sie tun möchten, nachdem die Biografie erfolgreich aktualisiert wurde
    });
  }

  ngOnInit(): void {
    this.getFollowedUsers();
    if (this.authService.isLoggedIn()) {
      this.updateBio();
      let user = this.authService.getLoggedInUser();
      this.userName = user?.name ?? '';
      this.name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
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
}