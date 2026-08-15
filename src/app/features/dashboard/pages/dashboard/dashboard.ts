import { Component } from '@angular/core';
import { TableProjects } from '../../components/table-projects/table-projects';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableProjects,
    MatButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard { }
