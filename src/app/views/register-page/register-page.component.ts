import { Component } from '@angular/core';
import {TuiRootModule} from "@taiga-ui/core";
import {TuiIslandModule} from "@taiga-ui/kit";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    TuiIslandModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
