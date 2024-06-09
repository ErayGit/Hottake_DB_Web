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
import { File } from '../../models/File';
import { PushService, pushTypes } from '../../services/push.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TuiInputFilesModule } from '@taiga-ui/kit';
import {TuiCardComponent} from "./tui-card/tui-card/tui-card.component";

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
    TuiCardComponent,
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
  ) {}

  ngOnInit(): void {
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
        console.log(fileId, 'ok');
        this.postService
          .addPost({
            text: this.addPostForm.value.text!,
            musicUrl: this.addPostForm.value.artist!,
            color: this.addPostForm.value.color! ?? '#563d7c',
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
     return this.postService.findAllFromUser(userId).subscribe((posts) => {
       this.items = posts;
     });
    /*
    return [
      {
        id: 1,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 4,
          thirdEmojie: 8,
          fourEmojie: 5,
        },
      },
      {
        id: 2,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#2bbdb8',
        emojie: '👌',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 2,
          thirdEmojie: 4,
          fourEmojie: 1,
        },
      },
      {
        id: 3,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '✌',
        komentar: {
          firstEmojie: 5,
          secondEmojie: 3,
          thirdEmojie: 2,
          fourEmojie: 2,
        },
      },
      {
        id: 4,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👨‍🦰',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 5,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#4b3f75',
        emojie: '✋',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 13,
          thirdEmojie: 8,
          fourEmojie: 12,
        },
      },
      {
        id: 6,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#bdb52b',
        emojie: '👮‍♂️',
        komentar: {
          firstEmojie: 13,
          secondEmojie: 3,
          thirdEmojie: 38,
          fourEmojie: 2,
        },
      },
      {
        id: 7,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 8,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 9,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 10,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
    ];

     */
  }

  removeFile() {
    this.fileControl.setValue(null);
  }
}
