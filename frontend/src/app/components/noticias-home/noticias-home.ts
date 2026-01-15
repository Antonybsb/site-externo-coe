import { Component } from '@angular/core';
import { ContainerPadrao } from '../container-padrao/container-padrao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias-home',
  imports: [ContainerPadrao, CommonModule],
  templateUrl: './noticias-home.html',
  styleUrl: './noticias-home.css',
})
export class NoticiasHome {
  noticiasDestaque = {
    titulo: 'Canoa Havaiana encanta participantes e traz conexão com a natureza',
    resumo:
      'No último dia 12 de novembro de 2025, servidores do Tribunal de Contas da União (TCU) vivenciaram uma experiência marcante ao participarem de uma atividade de canoa havaiana. Remando sobre águas serenas... ',
    data: '12 de novembro de 2025',
    imagem: 'assets/imagens/lagoon-2349401_1280.jpg',
  };

  listaNoticias = [
    {
      id: 1,
      titulo: 'Boliche reúne servidores em tarde de descontração e competição saudável',
      resumo:
        'Na mesma data, 12 de novembro de 2025, outra atividade movimentou os servidores do TCU: o boliche.',
      data: '12 de novembro de 2025',
      imagem: 'assets/imagens/bowling-237905_1280.jpg',
    },
    {
      id: 2,
      titulo: 'Corrida ganha força entre servidores e mobiliza novos atletas no TCU',
      resumo: 'O esporte de corrida tem ganhado cada vez mais adeptos entre os servidores do TCU.',
      data: '07 de outubro de 2025',
      imagem: 'assets/imagens/sports-3340598_1280.jpg',
    },
    {
      id: 3,
      titulo: 'Futevôlei atrai servidores e vira febre nas areias do TCU',
      resumo:
        'Desde o anúncio oficial em 15 de setembro de 2025, o futevôlei tem conquistado espaço.',
      data: '15 de setembro de 2025',
      imagem: 'assets/imagens/sport-1450849_1280.jpg',
    },
  ];
}
