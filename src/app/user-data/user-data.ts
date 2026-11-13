import { Component } from '@angular/core';
import { AdminData } from '../admin-data/admin-data';

@Component({
  imports: [AdminData],
  selector: 'app-user-data',
  styleUrl: './user-data.css',
  templateUrl: './user-data.html',
})
export class UserData {}
