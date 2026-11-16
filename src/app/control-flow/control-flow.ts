import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-control-flow',
  styleUrl: './control-flow.css',
  templateUrl: './control-flow.html',
})
export class ControlFlow {
  users = signal(["Anil","Sam","Peter","Bruce"])
  userDetails = signal([
    {id:1, name:"Anil", surname:"Sidhu", email:"anil@test.com"},
    {id:2, name:"Sam", surname:"Pawar", email:"ajay@test.com"},
    {id:3, name:"Peter", surname:"Chandh", email:"samay@test.com"},
    {id:4, name:"Bruce", surname:"sidh", email:"raina@test.com"},
  ])
}
