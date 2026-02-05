import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string; // O texto (ex: Home, Notícias)
  url?: string; // O link (opcional, o último item não tem link)
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  // Recebe a lista de caminhos de quem chamar o componente
  items = input.required<BreadcrumbItem[]>();
}
