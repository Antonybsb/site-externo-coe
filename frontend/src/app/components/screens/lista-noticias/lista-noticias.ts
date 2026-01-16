import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';

@Component({
  selector: 'app-lista-noticias',
  imports: [CommonModule, ContainerPadrao],
  templateUrl: './lista-noticias.html',
  styleUrl: './lista-noticias.css',
})
export class ListaNoticias {
  // Simulando dados que viriam do Strapi
  listaNoticias = [
    {
      titulo: 'Canoa Havaiana encanta participantes com experiência única em águas tranquilas',
      resumo:
        'No último dia 12 de novembro de 2025, servidores do Tribunal de Contas da União (TCU) vivenciaram uma experiência marcante ao participarem de uma atividade de canoa havaiana. Remando sobre águas serenas...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/lagoon-2349401_1280.jpg',
    },
    {
      titulo: 'Boliche reúne servidores em tarde de descontração e competição saudável',
      resumo:
        'Na mesma data, 12 de novembro de 2025, outra atividade movimentou os servidores do TCU: o boliche. Com foco na socialização e na coordenação motora...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/bowling-237905_1280.jpg',
    },
    {
      titulo: 'Corrida ganha força entre servidores e mobiliza novos atletas no TCU',
      resumo:
        'O esporte de corrida tem ganhado cada vez mais adeptos entre os servidores do TCU. Desde o chamado oficial feito em 7 de outubro de 2025...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/sports-3340598_1280.jpg',
    },
    {
      titulo: 'Futevôlei atrai servidores e vira febre nas areias do TCU',
      resumo:
        'Desde o anúncio oficial em 15 de setembro de 2025, o futevôlei tem conquistado espaço entre os servidores do TCU. A modalidade, que mistura futebol e vôlei...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/sport-1450849_1280.jpg',
    },
  ];

  paginaAtual = 1;
  totalItens = 18;
  itensPorPagina = 5;
  totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);

  // Array para gerar os números [1, 2, 3, 4, 5]
  paginasArray = Array.from({ length: 5 }, (_, i) => i + 1);
}
