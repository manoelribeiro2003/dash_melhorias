import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjetoService } from './features/dashboard/services/projeto/projeto.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UsuarioService } from './features/dashboard/services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(){
    this.projetos.carregarProjetos()
    this.usuarios.carregarUsuarios()
  }
  private projetos = inject(ProjetoService);
  private usuarios = inject(UsuarioService);
  
}
