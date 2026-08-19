import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GetTasks } from './features/dashboard/services/get-tasks/get-tasks';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(){
    this.tasks.carregar()
  }
  private tasks = inject(GetTasks);
  
}
