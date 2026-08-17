import { Component } from '@angular/core';
import { TableProjects } from '../../components/table-projects/table-projects';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsCard } from '../../components/projects-card/projects-card';

@Component({
  selector: 'app-view-projects',
  imports: [
    ProjectsCard,
    MatButtonModule],
  templateUrl: './view-projects.html',
  styleUrl: './view-projects.scss',
})
export class ViewProjects {}
