import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CSSRules } from './css-rules/css-rules';
import { UserData } from './user-data/user-data';

@Component({
  imports: [RouterOutlet,CSSRules,UserData ],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  name:WritableSignal<string> = signal('')
}
