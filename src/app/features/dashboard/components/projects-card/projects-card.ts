import { Component, computed, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TableProjects } from '../table-projects/table-projects';
import { GetTasks } from '../../services/get-tasks/get-tasks';

@Component({
  selector: 'app-projects-card',
  imports: [MatCardModule, MatButtonModule, TableProjects],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
})
export class ProjectsCard {
   tasks = inject(GetTasks);

   status = computed(() =>
    [...new Set(
      this.tasks.tarefas().map(tarefa => tarefa.status)
    )]
  );

   
}
