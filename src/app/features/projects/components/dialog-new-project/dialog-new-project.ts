import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropComponent } from '../drag-drop/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProjetoService } from '../../../../shared/services/projeto/projeto.service';
import { UsuarioService } from '../../../../shared/services/usuario/usuario.service';
import { Projeto } from '../../../../shared/models/projeto/projeto.interface';
import { Usuario } from '../../../../shared/models/usuario/usuario.interface';
import { Tarefa } from '../../../../shared/models/tarefa/tarefa.interface';

function obterSemanaAtual(): { inicio: Date; termino: Date } {
  const inicio = new Date();

  const termino = new Date(inicio);
  termino.setDate(inicio.getDate() + 4);

  return {
    inicio,
    termino
  };
}

@Component({
  selector: 'app-dialog-new-project',
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
    DragDropComponent,
    MatSlideToggleModule
  ],
  templateUrl: './dialog-new-project.html',
  styleUrl: './dialog-new-project.scss',
})
export class DialogNewProject {
  private usuariosService = inject(UsuarioService)
  readonly usuarios = this.usuariosService.usuarios()
  private dialogRef = inject(MatDialogRef<DialogNewProject>);
  readonly projetosService = inject(ProjetoService);

  readonly novoProjeto: Partial<Projeto> = {
    status: 'Não iniciado',
    dataInicio: obterSemanaAtual().inicio,
    dataTermino: obterSemanaAtual().termino,
    prioridade: false,
    tarefas: [
      {
        nome: '',
        ordem: 1,
        concluido: false,
      }
    ]
  };

  compararUsuarios(usuario1: Usuario | null, usuario2: Usuario | null): boolean {
    return usuario1?.id === usuario2?.id;
  }

  atualizarTarefas(tarefas: Tarefa[]): void {
    this.novoProjeto.tarefas = tarefas;
  }

  fechar(): void {
    this.dialogRef.close();
  }

  salvarProjeto(): void {
    this.projetosService.criarProjeto(this.novoProjeto)

    this.dialogRef.close();
  }
}
