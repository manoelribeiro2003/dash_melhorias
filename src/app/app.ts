import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toobar } from './features/dashboard/components/toobar/toobar';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { ViewProjects } from './features/dashboard/pages/view-projects/view-projects';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toobar,
    ViewProjects
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
