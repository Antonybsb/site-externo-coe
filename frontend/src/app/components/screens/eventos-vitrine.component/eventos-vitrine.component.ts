import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { CommonModule } from '@angular/common';
import { CarrosselCardsComponent } from '../../carrossel-cards.component/carrossel-cards.component';
import { ApiService } from '../../../services/api';
import { Evento } from '../../../models/evento';
import { CardEvento } from '../../card-evento/card-evento';
import { CardEventoVitrineComponent } from '../../card-evento-vitrine.component/card-evento-vitrine.component';
import { BotaoPadraoComponent } from '../../botao-padrao.component/botao-padrao.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos-vitrine',
  imports: [
    CommonModule,
    CarrosselCardsComponent,
    HeroPadrao,
    SectionHeader,
    CardEvento,
    CardEventoVitrineComponent,
    BotaoPadraoComponent,
    RouterLink,
  ],
  templateUrl: './eventos-vitrine.component.html',
  styleUrl: './eventos-vitrine.component.css',
})
export class EventosVitrineComponent implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  // listaEventos = signal<Evento[]>([]);
  eventosGerais = signal<Evento[]>([]);
  eventosAnuais = signal<Evento[]>([]);

  ngOnInit() {
    // this.carregarEventos();
    this.carregarEventos('eventos-gerais', this.eventosGerais);
    this.carregarEventos('eventos-anuais', this.eventosAnuais);
  }

  carregarEventos(slug: string, signalDestino: any) {
    this.apiService.getEventosPorCategoria(slug).subscribe({
      next: (eventos) => {
        signalDestino.set(eventos);
        this.cd.detectChanges();
      },
      error: (erro) => console.error(`Erro ao carregar eventos da categoria ${slug}:`, erro),
    });
  }
}
