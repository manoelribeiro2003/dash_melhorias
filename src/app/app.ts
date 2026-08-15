import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toobar } from './features/dashboard/components/toobar/toobar';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toobar,
    Dashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
