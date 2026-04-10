import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Evento } from '../../../models/evento';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { CardEventoVitrineComponent } from '../../card-evento-vitrine.component/card-evento-vitrine.component';
import { ApiService } from '../../../services/api';
// Removi imports não utilizados como BotaoPadrao, Carrossel e RouterLink

@Component({
  selector: 'app-eventos-lista',
  standalone: true,
  imports: [HeroPadrao, SectionHeader, CardEventoVitrineComponent, EventosListaComponent],
  templateUrl: './eventos-lista.component.html',
  styleUrl: './eventos-lista.component.css',
})
export class EventosListaComponent implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  todosEventos = signal<Evento[]>([]);

  ngOnInit() {
    this.carregarTodosEventos();
  }

  carregarTodosEventos() {
    // Usamos o seu método existente que já traz tudo de uma vez
    this.apiService.getEventos().subscribe({
      next: (eventos) => {
        this.todosEventos.set(eventos);
        this.cd.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar a lista completa de eventos:', erro),
    });
  }
}
