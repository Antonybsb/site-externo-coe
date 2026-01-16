import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-depoimentos-lista',
  imports: [CommonModule, ContainerPadrao, SectionHeader, RouterLink],
  templateUrl: './depoimentos-lista.html',
  styleUrl: './depoimentos-lista.css',
})
export class DepoimentosLista {
  depoimentos = [
    {
      id: 1,
      nome: 'João Pedro',
      resumo:
        'O COE foi um divisor de águas na minha vida. Além de me ajudar a sair do sedentarismo, me proporcionou novas amizades e um senso de pertencimento.',
      imagem: 'assets/depoimentos/man-1276384_640.jpg',
    },
    {
      id: 2,
      nome: 'Ana Beatriz',
      resumo:
        'Sempre tive dificuldade em manter uma rotina saudável, mas ao participar das atividades do COE encontrei um ambiente acolhedor e motivador.',
      imagem: 'assets/depoimentos/woman-3233233_640.jpg',
    },
    {
      id: 3,
      nome: 'Camila Rocha',
      resumo:
        'Antes do COE, eu não conseguia manter constância nos exercícios. A energia das atividades e o apoio dos colegas me fizeram persistir.',
      imagem: 'assets/depoimentos/smile-2072907_640.jpg',
    },
    {
      id: 4,
      nome: 'Silas Peixoto',
      resumo:
        'Nunca imaginei que me exercitar pudesse ser tão prazeroso. O COE me mostrou que cuidar da saúde pode ser leve e divertido.',
      imagem: 'assets/depoimentos/think-5011978_640.jpg',
    },
    {
      id: 5,
      nome: 'Larissa Mendes',
      resumo:
        'Participar do COE me ajudou a superar a insegurança que eu tinha em ambientes esportivos. Aos poucos, fui ganhando confiança.',
      imagem: 'assets/depoimentos/women-4144646_640.jpg',
    },
    {
      id: 6,
      nome: 'Bruno Carvalho',
      resumo:
        'O COE trouxe equilíbrio para minha rotina. Entre trabalho e compromissos, encontrar tempo para me movimentar virou prioridade.',
      imagem: 'assets/depoimentos/man-1348082_640.jpg',
    },
  ];

  // Paginação visual
  paginaAtual = 1;
  paginasArray = [1, 2, 3, 4, 5];
}
