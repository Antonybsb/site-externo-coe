import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modalidades',
  imports: [CommonModule],
  templateUrl: './modalidades.html',
  styleUrl: './modalidades.css',
})
export class Modalidades implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  modalidadeDestaque: any = null;
  baseUrl = 'http://localhost:1337';

  ngOnInit() {
    // <--- 3. Ouvinte da URL (paramMap)
    // Sempre que a URL mudar (ex: clicar de Futebol para Vôlei), isso roda de novo
    this.route.paramMap.subscribe(params => {

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
      error: (erro) => console.error("Erro ao carregar slug:", erro)
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
      }
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
