import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticias-lista',
  imports: [CommonModule, ContainerPadrao, RouterLink],
  templateUrl: './noticias-lista.html',
  styleUrl: './noticias-lista.css',
})
export class NoticiasLista {
  // Simulando dados que viriam do Strapi
  listaNoticias = [
    {
      id: 1,
      titulo: 'Canoa Havaiana encanta participantes com experiência única em águas tranquilas',
      resumo:
        'No último dia 12 de novembro de 2025, servidores do Tribunal de Contas da União (TCU) vivenciaram uma experiência marcante ao participarem de uma atividade de canoa havaiana. Remando sobre águas serenas...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/lagoon-2349401_1280.jpg',
    },
    {
      id: 2,
      titulo: 'Boliche reúne servidores em tarde de descontração e competição saudável',
      resumo:
        'Na mesma data, 12 de novembro de 2025, outra atividade movimentou os servidores do TCU: o boliche. Com foco na socialização e na coordenação motora...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/bowling-237905_1280.jpg',
    },
    {
      id: 3,
      titulo: 'Corrida ganha força entre servidores e mobiliza novos atletas no TCU',
      resumo:
        'O esporte de corrida tem ganhado cada vez mais adeptos entre os servidores do TCU. Desde o chamado oficial feito em 7 de outubro de 2025...',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/sports-3340598_1280.jpg',
    },
    {
      id: 4,
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
