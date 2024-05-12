import { Component } from '@angular/core';
import { CARDComponent } from './card/card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CARDComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hottake_DB_Web';
  items = new Array(10).fill(0);
}
