import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TableProjects } from '../table-projects/table-projects';

@Component({
  selector: 'app-projects-card',
  imports: [MatCardModule, MatButtonModule, TableProjects],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
})
export class ProjectsCard {}
