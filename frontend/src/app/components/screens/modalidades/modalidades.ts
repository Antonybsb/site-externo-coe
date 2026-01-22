import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Parceiros } from '../../parceiros/parceiros';
import { Evento } from '../../../models/evento';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { CardEvento } from '../../card-evento/card-evento';

@Component({
  selector: 'app-modalidades',
  imports: [CommonModule, Parceiros, ContainerPadrao, CardEvento],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css',
})
export class Modalidades implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  modalidadeDestaque: any = null;
  baseUrl = 'http://localhost:1337';

  eventosTeste: Evento[] = [
    {
      id: 1,
      titulo: 'Maratona de Brasília',
      descricao:
        'Corrida de rua com percursos de 5km, 10km e 42km, reunindo atletas de todo o país.',
      dataInicio: '2026-03-12T07:00:00',
      local: 'Eixo Monumental, Brasília',
      imagemUrl: 'https://picsum.photos/600/400?random=11',
      slug: 'maratona-de-brasilia',
    },
    {
      id: 2,
      titulo: 'Campeonato de Vôlei de Praia',
      descricao: 'Etapa nacional com os melhores duplas competindo em areias brasilienses.',
      dataInicio: '2026-04-02T09:00:00',
      local: 'Parque da Cidade, Brasília',
      imagemUrl: 'https://picsum.photos/600/400?random=12',
      slug: 'campeonato-volei-de-praia',
    },
    {
      id: 3,
      titulo: 'Copa de Futebol Amador',
      descricao: 'Torneio entre equipes locais promovendo integração e espírito esportivo.',
      dataInicio: '2026-05-18T15:00:00',
      local: 'Estádio Bezerrão, Gama',
      imagemUrl: 'https://picsum.photos/600/400?random=13',
      slug: 'copa-de-futebol-amador',
    },
    {
      id: 4,
      titulo: 'Triathlon Lago Paranoá',
      descricao:
        'Prova desafiadora com natação, ciclismo e corrida em um dos cartões postais da cidade.',
      dataInicio: '2026-06-09T06:30:00',
      local: 'Lago Paranoá, Brasília',
      imagemUrl: 'https://picsum.photos/600/400?random=14',
      slug: 'triathlon-lago-paranoa',
    },
    {
      id: 5,
      titulo: 'Campeonato de Basquete Universitário',
      descricao: 'Equipes universitárias disputam o título em jogos emocionantes.',
      dataInicio: '2026-07-21T18:00:00',
      local: 'Ginásio Nilson Nelson, Brasília',
      imagemUrl: 'https://picsum.photos/600/400?random=15',
      slug: 'campeonato-basquete-universitario',
    },
  ];

  ngOnInit() {
    // <--- 3. Ouvinte da URL (paramMap)
    // Sempre que a URL mudar (ex: clicar de Futebol para Vôlei), isso roda de novo
    this.route.paramMap.subscribe((params) => {
      const slugAtual = params.get('slug'); // Pega o que está na URL

      if (slugAtual) {
        // CENÁRIO A: Tem slug na URL (/modalidades/beach-tennis)
        this.carregarEsporteEspecifico(slugAtual);
      } else {
        // CENÁRIO B: Não tem slug (está na Home), carrega o padrão
        this.carregarDestaquePadrao();
      }
    });
  }

  // Lógica separada para buscar pelo Slug
  carregarEsporteEspecifico(slug: string) {
    this.apiService.getModalidadePorSlug(slug).subscribe({
      next: (response) => {
        const dados = response.data || response;
        // O Strapi retorna uma lista mesmo filtrando, pegamos o primeiro item
        if (dados && dados.length > 0) {
          this.modalidadeDestaque = dados[0];
          this.cd.detectChanges();
        }
      },
      error: (erro) => console.error('Erro ao carregar slug:', erro),
    });
  }

  // Sua lógica antiga (renomeada para organizar)
  carregarDestaquePadrao() {
    this.apiService.getModalidades().subscribe({
      next: (response) => {
        const dados = response.data || response;
        if (dados && dados.length > 0) {
          this.modalidadeDestaque = dados[0];
          this.cd.detectChanges();
        }
      },
    });
  }
}

/* ngOnInit() {
  this.apiService.getModalidades().subscribe({
    next: (response) => {
      // Normaliza os dados (Strapi v4 vs v5)
      const dadosCheios = response.data || response;

      // MUDANÇA 2: Pega apenas o primeiro item da lista para ser o destaque
      if (dadosCheios && dadosCheios.length > 0) {
        this.modalidadeDestaque = dadosCheios[0];
        console.log("Destaque definido:", this.modalidadeDestaque.nome);
      }

      // Refatorar para signals no futuro
      this.cd.detectChanges();
    },
    error: (erro) => console.error("Erro:", erro)
  });
}
} */
