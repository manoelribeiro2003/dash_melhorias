import { Component, computed, inject, input, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TableProjects } from '../table-projects/table-projects';
import { GetProjetos } from '../../services/get-projetos/get-projetos';

@Component({
  selector: 'app-projects-card',
  imports: [MatCardModule, MatButtonModule, TableProjects],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
})
export class ProjectsCard {
   tasks = inject(GetProjetos);

   selected = input<string>()

   status = signal(['Todos', 'Em Andamento', 'Concluídos', 'Não Iniciados', 'Atrasados']);

  //  status = computed(() =>
  //   [...new Set(
  //     this.tasks.tarefas().map(tarefa => tarefa.status)
  //   )
  // ]);

   
}
