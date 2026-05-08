import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeader } from '../../section-header/section-header';

// Initialization for ES Users
import { Carousel, initTWE, Ripple } from 'tw-elements';
import { Footer } from '../../footer/footer';
import { Contatos } from '../contatos/contatos';
import { RouterLink } from '@angular/router';
import { EspacoIntegracao } from '../../espaco-integracao/espaco-integracao';
import { Parceiros } from '../../parceiros/parceiros';
import { NoticiasHome } from '../../noticias-home/noticias-home';
import { CarrosselEventosHome } from '../../carrossel-eventos-home/carrossel-eventos-home';
import { DepoimentosCta } from '../../depoimentos-cta/depoimentos-cta';
import { BotaoPadraoComponent } from '../../botao-padrao.component/botao-padrao.component';
import { Evento } from '../../../models/evento';
import { ApiService } from '../../../services/api';
import { DsaudHomeComponent } from '../../dsaud-home.component/dsaud-home.component';
import { CodigoCondutaCtaComponent } from '../../codigo-conduta-cta.component/codigo-conduta-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SectionHeader,
    Footer,
    Contatos,
    RouterLink,
    EspacoIntegracao,
    Parceiros,
    NoticiasHome,
    CarrosselEventosHome,
    DepoimentosCta,
    BotaoPadraoComponent,
    DsaudHomeComponent,
    CodigoCondutaCtaComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  eventosAnuais = signal<Evento[]>([]);

  ngAfterViewInit() {
    initTWE({ Carousel, Ripple });
  }

  ngOnInit() {
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
