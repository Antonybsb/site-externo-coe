import { AfterViewInit, Component } from '@angular/core';
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

@Component({
  selector: 'app-home',
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
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  ngAfterViewInit() {
    initTWE({ Carousel, Ripple });
  }
}
