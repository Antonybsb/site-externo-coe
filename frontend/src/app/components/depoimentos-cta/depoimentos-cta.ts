import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-depoimentos-cta',
  imports: [CommonModule, ContainerPadrao, RouterModule],
  templateUrl: './depoimentos-cta.html',
  styleUrl: './depoimentos-cta.css',
})
export class DepoimentosCta implements OnInit, OnDestroy {
  depoimentos = [
    {
      id: 5,
      nome: 'Sara Oliveira',
      cargo: 'Membro do COE',
      foto: 'assets/depoimentos/women-4144646_640.jpg',
      texto:
        'Manter o hábito de me exercitar sempre foi um desafio, mas ao participar das atividades do COE encontrei motivação e apoio. Hoje, a prática esportiva faz parte da minha rotina e me sinto muito mais disposta.',
    },
    {
      id: 4,
      nome: 'João Pedro',
      cargo: 'Membro do COE',
      foto: 'assets/depoimentos/women-4144646_640.jpg',
      texto:
        'O COE foi um divisor de águas na minha vida. Além de me ajudar a sair do sedentarismo, me proporcionou novas amizades e um senso de pertencimento que eu não encontrava em outros espaços.',
    },
    {
      id: 3,
      nome: 'Ana Beatriz',
      cargo: 'Membro do COE',
      foto: 'assets/depoimentos/women-4144646_640.jpg',
      texto:
        'Sempre tive dificuldade em manter uma rotina saudável, mas ao participar das atividades do COE encontrei um ambiente acolhedor e motivador. Minha saúde física e mental melhoraram significativamente.',
    },
    {
      id: 2,
      nome: 'Carlos Mendes',
      cargo: 'Membro do COE',
      foto: 'assets/depoimentos/women-4144646_640.jpg',
      texto:
        'A integração que o COE promove é fantástica. Não é apenas sobre esporte, é sobre conexões humanas e bem-estar no ambiente de trabalho.',
    },
    {
      id: 1,
      nome: 'Fernanda Lima',
      cargo: 'Membro do COE',
      foto: 'assets/depoimentos/women-4144646_640.jpg',
      texto:
        'Eu nunca imaginei que gostaria tanto de correr. O incentivo do grupo foi fundamental para eu começar e não parar mais.',
    },
  ];

  depoimentosExibidos = this.depoimentos.slice(0, 5);

  indiceAtual = signal(0);
  intervalo: any = null;

  ngOnInit() {
    this.iniciarCarrossel();
  }

  ngOnDestroy(): void {
    this.pararCarrossel();
  }

  iniciarCarrossel() {
    if (this.intervalo) return;
    this.intervalo = setInterval(() => {
      this.proximosSlides();
    }, 6000);
  }

  pararCarrossel() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  proximosSlides() {
    this.indiceAtual.update((valor) => (valor + 1) % this.depoimentosExibidos.length);
  }
  estrelas = [1, 2, 3, 4, 5];
}
