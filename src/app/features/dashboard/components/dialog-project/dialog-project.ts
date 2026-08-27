import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { DragDropComponent } from '../drag-drop/drag-drop';
import { Projeto } from '../../models/projeto/projeto.interface';
import { Tarefa } from '../../models/tarefa/tarefa.interface';

@Component({
  selector: 'app-dialog-project',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,

    DragDropModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    FormsModule,

    DragDropComponent
  ],
  templateUrl: './dialog-project.html',
  styleUrl: './dialog-project.scss',
})
export class DialogProject {
  private dialogRef = inject(MatDialogRef<DialogProject>);
  readonly data = inject<Projeto>(MAT_DIALOG_DATA);

  readonly projetoRecebido: Projeto = {
    ...this.data
  };

  atualizarTarefas(tarefas: Tarefa[]): void {
    this.projetoRecebido.tarefas = tarefas;
  }

  salvarProjeto(): void {
    this.dialogRef.close(this.projetoRecebido);
  }

  fechar(): void {
    this.dialogRef.close();
  }

}

