import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FileService } from '../../../api/file.service';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-firends-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './firends-bar.component.html',
  styleUrl: './firends-bar.component.css',
})
export class FirendsBarComponent {
  constructor(
    private fileService: FileService,
    private authService: AuthService
  ) {}

  name = '';
  userName = '';
  image = '';

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
}
