import { Component, input } from '@angular/core';
import { Evento } from '../../models/evento';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-evento-vitrine',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './card-evento-vitrine.component.html',
  styleUrl: './card-evento-vitrine.component.css',
})
export class CardEventoVitrineComponent {
  data = input.required<Evento>();
}
