import { Component, OnInit } from '@angular/core';
import { CARDComponent } from './card/card.component';
import { FirendsBarComponent } from './firends-bar/firends-bar.component';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from '../../api/file.service';
import { AuthService } from '../../api/auth.service';
import { PostService } from '../../api/post.service';
import { Post } from '../../models/Post';
import { TuiInputModule } from '@taiga-ui/kit';
import { PushService, pushTypes } from '../../services/push.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputFilesModule } from '@taiga-ui/kit';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {ImageCropperComponent} from "ngx-image-cropper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [
    CommonModule,
    CARDComponent,
    FirendsBarComponent,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputFilesModule,
    PickerModule,
    ImageCropperComponent
  ],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    HttpClientModule,
  ],
})
export class FeedPageComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private postService: PostService,
    private authService: AuthService,
    private pushService: PushService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.fetchData();
  }

  title = 'Hottake_DB_Web';
  items: Post[] = [];

  readonly addPostForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    emoje: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    songTitle: new FormControl('', [Validators.required]),
  });

  fileControl = new FormControl();

  addPost() {
    let fileId: string;
    const formData = new FormData();
    formData.append(
      'file',
      this.fileControl.value,
      this.fileControl.value.name
    );
    this.fileService.addImage(formData).subscribe((response) => {
      if (response.ok) {
        fileId = response.body?.file!.id!;
        this.postService
          .addPost({
            text: this.addPostForm.value.text!,
            musicArtist: this.addPostForm.value.artist!,
            musicTitle: this.addPostForm.value.songTitle!,
            musicUrl: "random",
            color: this.addPostForm.value.color! ? this.addPostForm.value.color! : '#563d7c',
            emoji: this.addPostForm.value.emoje!,
            fileId: fileId!,
            creatorId: this.authService.getLoggedInUser()?.id!,
          })
          .subscribe((value) => {
            if (!value) {
              this.fileService.deleteImage(fileId!);
              this.pushService.sendPush(pushTypes.ERROR);
            }
            this.pushService.sendPush(pushTypes.SUCCESS);
            this.fetchData();
            this.addPostForm.reset();
            this.fileControl.reset();
          });
      }
    });
  }

  fetchData() {
    let userId = '54d2abbd-2376-11ef-a4b9-02420a000403';
    if (this.authService.isLoggedIn()) {
      const loggedInUser = this.authService.getLoggedInUser();
      if (loggedInUser) {
        userId = loggedInUser.id;
      }
    }
    //TODO Switch with from followed
     return this.postService.findAllFromFollowed(userId).subscribe((posts) => {
       this.items = posts;
     });
  }

  removeFile() {
    this.fileControl.setValue(null);
  }
}
