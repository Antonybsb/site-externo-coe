import { AfterViewInit, Component } from '@angular/core';
import { SectionHeader } from '../../section-header/section-header';

// Initialization for ES Users
import { Carousel, initTWE, Ripple } from 'tw-elements';
import { Footer } from '../../footer/footer';
import { Contatos } from '../contatos/contatos';
import { RouterLink } from '@angular/router';
import { EspacoIntegracao } from '../../espaco-integracao/espaco-integracao';
import { Parceiros } from '../../parceiros/parceiros';

@Component({
  selector: 'app-home',
  imports: [SectionHeader, Footer, Contatos, RouterLink, EspacoIntegracao, Parceiros],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  ngAfterViewInit() {
    initTWE({ Carousel, Ripple });
  }
}
