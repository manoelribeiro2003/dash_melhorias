import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Tarefa } from '../../models/tarefa/tarefa.interface';

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
    FormsModule
  ],
})
export class DragDropComponent {

  readonly tarefasRecebidas = input.required<Tarefa[]>();
  readonly tarefasAlteradas = output<Tarefa[]>();

  drop(event: CdkDragDrop<Tarefa[]>): void {

    const tarefas = this.tarefasRecebidas()
      .map(tarefa => ({ ...tarefa }));

    moveItemInArray(tarefas, event.previousIndex, event.currentIndex);

    const tarefasAtualizadas = tarefas.map((tarefa, index) => ({
      ...tarefa,
      ordem: index + 1
    }));

    this.tarefasAlteradas.emit(tarefasAtualizadas);
  }

  atualizarTarefa(id: number,alteracoes: Partial<Tarefa>): void {
    const tarefas = this.tarefasRecebidas()
      .map(tarefa =>
        tarefa.id === id
          ? {
            ...tarefa,
            ...alteracoes
          }
          : tarefa
      );

    this.tarefasAlteradas.emit(tarefas);
  }

  excluirTarefa(id: number): void {

    const tarefas = this.tarefasRecebidas()
      .filter(tarefa => tarefa.id !== id)
      .map((tarefa, index) => ({
        ...tarefa,
        ordem: index + 1
      }));

    this.tarefasAlteradas.emit(tarefas);
  }
}