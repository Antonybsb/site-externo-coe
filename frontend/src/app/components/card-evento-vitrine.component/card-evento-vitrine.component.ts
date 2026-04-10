import { Component, computed, input } from '@angular/core';
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

  tamanho = input<'fluido' | 'fixo'>('fluido');

  classesBase =
    'bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col relative';

  classesDimensoes = computed(() => {
    return this.tamanho() === 'fixo'
      ? 'w-full max-w-[305px] h-[395px]' // O tamanho da nova página
      : 'h-full w-full'; // O tamanho flexível original
  });
}
