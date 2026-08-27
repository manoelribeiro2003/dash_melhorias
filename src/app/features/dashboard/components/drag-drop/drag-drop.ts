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

  adicionarTarefa(): void {
    const tarefas = [
      ...this.tarefasRecebidas(),
      {
        tempId: crypto.randomUUID(),
        nome: '',
        ordem: this.tarefasRecebidas().length + 1,
        concluido: false
      }
    ]
    this.tarefasAlteradas.emit(tarefas)
  }

  atualizarTarefa(tarefa: Tarefa, alteracoes: Partial<Tarefa>): void {
    const tarefas = this.tarefasRecebidas().map(t =>
      t === tarefa
        ? { ...t, ...alteracoes }
        : t
    );

    this.tarefasAlteradas.emit(tarefas);
  }

  excluirTarefa(tarefaExcluir: Tarefa): void {

    const tarefas = this.tarefasRecebidas()
      .filter(tarefa => tarefa !== tarefaExcluir)
      .map((tarefa, index) => ({
        ...tarefa,
        ordem: index + 1
      }));

    this.tarefasAlteradas.emit(tarefas);
  }
}