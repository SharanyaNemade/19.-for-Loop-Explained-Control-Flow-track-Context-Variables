import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  isLogin = signal(false);
  show = signal(true)
  status = signal('error')

  handleLogin(status:boolean){
    this.isLogin.set(status)
  }

  handleStatus(event : Event){
    let target =  event.target as HTMLSelectElement;
    this.status.set(target.value)
  }
}
