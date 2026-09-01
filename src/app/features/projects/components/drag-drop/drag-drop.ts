import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Tarefa } from '../../../../shared/models/tarefa/tarefa.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { v4 as uuidv4 } from 'uuid';

const oi = ''

@Component({
  selector: 'app-drag-drop',
  templateUrl: 'drag-drop.html',
  styleUrl: 'drag-drop.scss',
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
  ],
})
export class DragDropComponent {

  readonly tarefas = input.required<Tarefa[]>();
  readonly tarefasAlteradas = output<Tarefa[]>();



  drop(event: CdkDragDrop<Tarefa[]>): void {

    const tarefas = this.tarefas().map(tarefa => ({ ...tarefa }));

    moveItemInArray(tarefas, event.previousIndex, event.currentIndex);

    const tarefasAtualizadas = tarefas.map((tarefa, index) => ({
      ...tarefa,
      ordem: index + 1
    }));

    this.tarefasAlteradas.emit(tarefasAtualizadas);
  }

  adicionarTarefa(): void {

    const dataInicio = new Date();
    const dataTermino = new Date();
    dataTermino.setDate(dataTermino.getDate() + 4);

    const tarefas: Tarefa[] = [
      ...this.tarefas(),
      {
        tempId: uuidv4(),
        ordem: this.tarefas().length + 1,
        nome: '',
        dataInicio: dataInicio,
        dataTermino: dataTermino,
        concluido: false
      }
    ]
    console.log(tarefas);

    this.tarefasAlteradas.emit(tarefas)
  }

  atualizarTarefa(tarefa: Tarefa, alteracoes: Partial<Tarefa>): void {
    const tarefas = this.tarefas().map(t =>
      t === tarefa
        ? { ...t, ...alteracoes }
        : t
    );

    this.tarefasAlteradas.emit(tarefas);
  }

  excluirTarefa(tarefaExcluir: Tarefa): void {

    const tarefas = this.tarefas()
      .filter(tarefa => tarefa !== tarefaExcluir)
      .map((tarefa, index) => ({
        ...tarefa,
        ordem: index + 1
      }));

    this.tarefasAlteradas.emit(tarefas);
  }
}