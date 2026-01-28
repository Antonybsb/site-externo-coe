import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ModalidadeModel } from '../models/modalidade.model';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  // Dica: No Strapi v5, as vezes precisamos adicionar /api, verifique se sua URL base precisa
  private apiUrl = 'http://localhost:1337/api';

  /* Início dos Métodos relacionados às Modalidades Eventos */
  getModalidades(): Observable<ModalidadeModel[]> {
    return this.http.get<any>(`${this.apiUrl}/modalidades?populate=*&sort=nome:asc`).pipe(
      map((response) => {
        // Strapi v5 retorna { data: [...] }
        const lista = response.data || [];
        return lista.map((item: any) => this.formatarModalidade(item));
      }),
    );
  }

  getModalidadePorSlug(slug: string): Observable<ModalidadeModel | null> {
    const url = `${this.apiUrl}/modalidades?filters[slug][$eq]=${slug}&populate=*`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const lista = response.data || [];
        if (lista.length > 0) {
          return this.formatarModalidade(lista[0]);
        }
        return null;
      }),
    );
  }

  getBanners() {
    return this.http.get<any>(`${this.apiUrl}/banners?populate=*&sort=ordem:asc`);
  }

  // --- O SEGREDO DO STRAPI V5 ---
  private formatarModalidade(item: any): ModalidadeModel {
    const dados = item.attributes || item;
    const baseUrl = 'http://localhost:1337';

    // Helper interno para resolver a URL completa (igual fizemos em Eventos)
    const resolverUrl = (imagem: any) => {
      const urlRelativa = this.extrairUrl(imagem); // Usa seu método existente
      if (!urlRelativa) return '';
      // Se já tiver http (ex: imagem externa), retorna ela. Se não, cola o localhost.
      return urlRelativa.startsWith('http') ? urlRelativa : `${baseUrl}${urlRelativa}`;
    };

    // Helper para achar o texto alternativo onde quer que ele esteja (Blindagem v4/v5)
    const resolverAlt = (imagem: any) => {
      if (!imagem) return '';
      return imagem.alternativeText || imagem.data?.attributes?.alternativeText || '';
    };

    return {
      id: item.id,
      nome: dados.nome,
      slug: dados.slug,
      texto_historia: dados.texto_historia,

      imagem_hero: {
        url: resolverUrl(dados.imagem_hero),
        texto_alternativo: resolverAlt(dados.imagem_hero),
      },
      imagem_historia: {
        url: resolverUrl(dados.imagem_historia),
      },
      icone: {
        url: resolverUrl(dados.icone),
      },
    };
  }

  // Helper para achar a URL da imagem onde quer que ela esteja
  private extrairUrl(campoImagem: any): string {
    if (!campoImagem) return '';

    // Caminho Strapi v5 (geralmente direto ou dentro de um array se for media collection)
    if (campoImagem.url) return campoImagem.url;
    if (Array.isArray(campoImagem) && campoImagem[0]?.url) return campoImagem[0].url;

    // Caminho Strapi v4 (data.attributes...)
    if (campoImagem.data?.attributes?.url) return campoImagem.data.attributes.url;
    if (campoImagem.data?.url) return campoImagem.data.url; // v5 com wrapper

    return '';
  }

  /* Fim dos Métodos relacionados às Modalidades Eventos */

  /* Início dos Métodos relacionados aos eventos Eventos */

  getEventos(): Observable<Evento[]> {
    return this.http.get<any>(`${this.apiUrl}/eventos?populate=*&sort=dataInicio:asc`).pipe(
      map((response) => {
        const lista = response.data || [];
        return lista.map((item: any) => this.formatarEvento(item));
      }),
    );
  }

  getEventoPorSlug(slug: string): Observable<Evento> {
    const query = `?filters[slug][$eq]=${slug}&populate[0]=imagem&populate[1]=modalidades&populate[2]=regulamento`;
    const url = `${this.apiUrl}/eventos${query}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const dados = response.data || [];

        if (dados.length > 0) {
          // CORREÇÃO: Verificação segura antes de logar
          const itemDebug = dados[0].attributes || dados[0];
          console.log('📦 Modalidades (Raw):', itemDebug.modalidades);

          return this.formatarEvento(dados[0]);
        }

        throw new Error('Evento não encontrado');
      }),
    );
  }

  // Helper para transformar o JSON do Strapi na Interface Evento
  private formatarEvento(item: any): Evento {
    const dados = item.attributes || item;

    const urlRelativa = this.extrairUrl(dados.imagem);
    const baseUrl = 'http://localhost:1337';

    // LÓGICA HÍBRIDA PARA LISTA DE MODALIDADES
    // Tenta pegar .data (v4) ou pega direto (v5) ou array vazio
    const listaModalidades = dados.modalidades?.data || dados.modalidades || [];

    return {
      id: item.id,
      titulo: dados.titulo,
      descricao: dados.descricao,
      dataInicio: dados.dataInicio,
      local: dados.local,
      slug: dados.slug,
      telefone: dados.contato || dados.telefone,
      horario: dados.horario,
      regulamentoUrl: this.extrairUrl(dados.regulamento),

      modalidades: listaModalidades.map((m: any) => {
        const mod = m.attributes || m;
        return {
          id: m.id,
          nome: mod.nome,
          slug: mod.slug,
          texto_historia: '',
          imagem_hero: { url: '', texto_alternativo: '' },
          imagem_historia: { url: '' },
          icone: { url: '' },
        };
      }),

      imagemUrl: urlRelativa
        ? urlRelativa.startsWith('http')
          ? urlRelativa
          : `${baseUrl}${urlRelativa}`
        : '',
    };
  }
  /*  Fim Métodos relacionados aos eventos Eventos */
}
