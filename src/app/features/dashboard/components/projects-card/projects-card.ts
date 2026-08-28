import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TableProjects } from '../table-projects/table-projects';
import { ProjetoService } from '../../services/projeto/projeto.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario/usuario.interface';

interface Status {
  value: string
  label: string
}

@Component({
  selector: 'app-projects-card',
  imports: [MatCardModule, MatButtonModule, TableProjects, MatButtonToggleModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
})
export class ProjectsCard {

  readonly tasks = inject(ProjetoService);
  readonly usuariosService = inject(UsuarioService)
  readonly status = signal<Status[]>([
    {
      value: '',
      label: 'Todos'
    },
    {
      value: 'Em andamento',
      label: 'Em Andamento'
    },
    {
      value: 'Concluída',
      label: 'Concluidos'
    },
    {
      value: 'Não iniciado',
      label: 'Não Iniciados'
    },
    {
      value: 'Atrasado',
      label: 'Atrasados'
    }
  ]);
  categorias = [...new Set(this.tasks.projetos().map(p => p.categoria).filter(c => c !== null))]
  readonly usuarios = this.usuariosService.usuarios()
  
  catSelecionada = model('')
  statusSelecionado = model(null);
  readonly usuarioSelecionado = model<number | null>(null);
  
}
