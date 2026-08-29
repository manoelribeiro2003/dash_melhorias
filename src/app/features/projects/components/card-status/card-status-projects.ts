import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-card-status-project',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './card-status-projects.html',
  styleUrl: './card-status-projects.scss',
})
export class CardStatusProjects {
  totalItens = input.required<number>();
  itensConcluidos = input.required<number>();

  status = input<string>()

  icon = input.required<string>();
  title = input.required<string>();
  value = input.required<string | number>();
}
