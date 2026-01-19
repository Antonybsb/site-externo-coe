import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrossel-eventos-home',
  imports: [CommonModule, SectionHeader, ContainerPadrao, RouterModule],
  templateUrl: './carrossel-eventos-home.html',
  styleUrl: './carrossel-eventos-home.css',
})
export class CarrosselEventosHome implements OnInit, OnDestroy {
  eventos = [
    // CASO 1: Evento Interno (Usa o Layout Padrão com HTML)
    {
      id: 1,
      tipo: 'padrao', // Chave de decisão
      titulo: 'Olimpíadas de Integração dos Tribunais',
      data: '08 a 10/08/2026',
      horario: 'A partir das 09h',
      local: 'ASTCU - DF',
      imagem: 'assets/imagens/content.jpeg', // Apenas a foto de fundo
      link: '/eventos/1',
    },
    // CASO 2: Quando precisar imagem de banner pronto (com textos já inclusos)
    {
      id: 2,
      tipo: 'imagem', // Chave de decisão
      titulo: 'Semana da Saúde Mental', // Importante para acessibilidade (alt)
      imagem: 'assets/bannerEventosHome/8948388.jpg', // O banner já com textos
      link: '/eventos/2',
    },
    {
      id: 3,
      tipo: 'imagem',
      titulo: 'Semana da Saúde Mental',
      imagem: 'assets/bannerEventosHome/5662256.jpg',
      link: '/eventos/3',
    },
  ];

  indiceAtual = signal(0);
  intervalo: any;

  ngOnInit() {
    this.iniciarRotacaoAutomatica();
  }

  ngOnDestroy(): void {
    this.pararRotacaoAutomatica();
  }

  proximo() {
    this.pararRotacaoAutomatica();
    this.indiceAtual.update((valor) => (valor + 1) % this.eventos.length);
    this.iniciarRotacaoAutomatica();
  }

  anterior() {
    this.pararRotacaoAutomatica();
    this.indiceAtual.update((valor) => (valor - 1 + this.eventos.length) % this.eventos.length);
    this.iniciarRotacaoAutomatica();
  }

  iniciarRotacaoAutomatica() {
    if (this.intervalo) return;

    this.intervalo = setInterval(() => {
      // O Signal garante a atualização da tela, mesmo dentro do setInterval
      this.indiceAtual.update((valor) => (valor + 1) % this.eventos.length);
    }, 5000);
  }

  pararRotacaoAutomatica() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }
}
