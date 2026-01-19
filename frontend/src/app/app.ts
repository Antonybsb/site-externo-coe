import { Component, signal, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api';

import { Navbar } from './components/navbar/navbar';
import { MegaMenu } from './components/mega-menu/mega-menu';
import { Modalidades } from './components/screens/modalidades/modalidades';
import { Acordion } from './components/acordion/acordion';
import { Home } from './components/screens/home/home';
import { Tcubar } from './components/tcubar/tcubar';
import { SectionHeader } from './components/section-header/section-header';
import { Footer } from './components/footer/footer';

import { Tooltip, initTWE } from 'tw-elements';
import { ContainerPadrao } from './components/container-padrao/container-padrao';
import { Contatos } from './components/screens/contatos/contatos';
import { HeroPadrao } from './components/hero-padrao/hero-padrao';
import { EspacoIntegracao } from './components/espaco-integracao/espaco-integracao';
import { Parceiros } from './components/parceiros/parceiros';
import { Eventos } from './components/screens/eventos/eventos';
import { EventosDetalhes } from './components/screens/eventos-detalhes/eventos-detalhes';
import { Calendario } from './components/calendario/calendario';
import { NoticiasHome } from './components/noticias-home/noticias-home';
import { NoticiasLista } from './components/screens/noticias-lista/noticias-lista';
import { NoticiaArtigo } from './components/screens/noticia-artigo/noticia-artigo';
import { DepoimentosLista } from './components/screens/depoimentos-lista/depoimentos-lista';
import { DepoimentosArtigo } from './components/screens/depoimentos-artigo/depoimentos-artigo';
import { CarrosselEventosHome } from './components/carrossel-eventos-home/carrossel-eventos-home';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    Navbar,
    MegaMenu,
    Acordion,
    Modalidades,
    Home,
    Tcubar,
    SectionHeader,
    Footer,
    ContainerPadrao,
    Contatos,
    HeroPadrao,
    EspacoIntegracao,
    Parceiros,
    Eventos,
    EventosDetalhes,
    Calendario,
    NoticiasHome,
    NoticiasLista,
    NoticiaArtigo,
    DepoimentosLista,
    DepoimentosArtigo,
    CarrosselEventosHome,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  modalidades: any[] = [];

  ngOnInit() {
    initTWE({ Tooltip });
    console.log('1. Iniciando busca no Strapi...');

    this.apiService.getModalidades().subscribe({
      next: (response) => {
        console.log('2. Resposta bruta recebida:', response);

        if (response.data) {
          this.modalidades = response.data;
        } else {
          this.modalidades = response;
        }

        console.log('3. Dados salvos:', this.modalidades);

        // A MARRETA: Obriga o Angular a atualizar a tela AGORA
        this.cd.detectChanges(); // <--- 3. O comando de força bruta
      },
      error: (erro) => {
        console.error('ERRO CRÍTICO:', erro);
      },
    });
  }
}
