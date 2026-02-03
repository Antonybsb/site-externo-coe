import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ModalidadeModel } from '../models/modalidade.model';
import { Evento } from '../models/evento';
import { NoticiaModel } from '../models/noticia.model';
import { RespostaPaginadaModel } from '../models/resposta-paginada.model';

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

    const imgParaUsar = dados.imagem || dados.banner_carrossel_home;
    const urlRelativa = this.extrairUrl(imgParaUsar);
    const baseUrl = 'http://localhost:1337';

    // LÓGICA HÍBRIDA PARA LISTA DE MODALIDADES
    // Tenta pegar .data (v4) ou pega direto (v5) ou array vazio
    const listaModalidades = dados.modalidades?.data || dados.modalidades || [];

    return {
      id: item.id,
      titulo: dados.titulo,
      descricao: dados.descricao,
      dataInicio: dados.dataInicio || dados.data_inicio || dados.data_evento,
      dataFim: dados.dataFim || dados.data_fim,
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

  // Busca os últimos 3 eventos para o carrossel
  getEventosHome(): Observable<any[]> {
    // Filtros:
    // - sort=dataInicio:desc (Do mais novo para o mais antigo) ou :asc (próximos a acontecer)
    // - pagination[limit]=3 (Só traz 3)
    // populate=* traz tudo, inclusive o novo 'banner_carrossel_home'
    const url = `${this.apiUrl}/eventos?sort=dataInicio:asc&pagination[limit]=3&populate=*`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const lista = response.data || [];
        return lista.map((item: any) => {
          const dados = item.attributes || item;
          const formatado = this.formatarEvento(item);

          // LÓGICA ESPECIAL PARA O CARROSSEL

          // 1. Resolve a imagem do banner.
          // Se tiver 'banner_carrossel_home', usa ela. Se não, usa a 'imagem' padrão.
          const bannerUrlRaw = dados.banner_carrossel_home || dados.imagem;
          const bannerUrl = this.extrairUrl(bannerUrlRaw);
          const baseUrl = 'http://localhost:1337';

          const bannerFinal = bannerUrl
            ? bannerUrl.startsWith('http')
              ? bannerUrl
              : `${baseUrl}${bannerUrl}`
            : '';

          return {
            ...formatado,
            // Aqui adaptamos para o seu Boolean (TRUE = imagem_completa, FALSE = padrao)
            tipo: dados.tipo_exibicao === true ? 'imagem_completa' : 'padrao',

            // Sobrescrevemos a imagemUrl apenas para o carrossel usar o banner wide
            imagemUrl: bannerFinal,

            link: `/eventos/${dados.slug}`,
          };
        });
      }),
    );
  }

  getProximoEvento(): Observable<any> {
    // sort=dataInicio:asc -> O mais breve possível (o próximo)
    // pagination[limit]=1 -> Apenas um
    const url = `${this.apiUrl}/eventos?sort=dataInicio:asc&pagination[limit]=1&populate=*`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const lista = response.data || [];
        if (lista.length > 0) {
          return this.formatarEvento(lista[0]);
        }
        return null;
      }),
    );
  }

  /*  Fim Métodos relacionados aos eventos Eventos */

  /* --- MÉTODOS DE NOTÍCIAS --- */

  getNoticias(
    pagina: number = 1,
    itensPorPagina: number = 5,
  ): Observable<RespostaPaginadaModel<NoticiaModel>> {
    // Montamos a Query String:
    // 1. populate=*: Traz a imagem
    // 2. sort=data_publicacao:desc : Traz as mais novas primeiro
    // 3. pagination[page] : Qual página queremos
    // 4. pagination[pageSize] : Quantos itens
    const query = `?populate=*&sort=data_publicacao:desc&pagination[page]=${pagina}&pagination[pageSize]=${itensPorPagina}`;

    return this.http.get<any>(`${this.apiUrl}/noticias${query}`).pipe(
      map((response) => {
        const dadosRaw = response.data || [];
        const meta = response.meta || {};

        // Mapeia os dados usando a lógica de formatação
        const noticiasFormatadas = dadosRaw.map((item: any) => this.formatarNoticia(item));

        return {
          dados: noticiasFormatadas,
          meta: meta,
        };
      }),
    );
  }

  getNoticiaPorId(id: number): Observable<NoticiaModel> {
    // ESTRATÉGIA SEGURA V5:
    // Em vez de /noticias/2 (que exige documentId), usamos filtro:
    // /noticias?filters[id][$eq]=2
    const url = `${this.apiUrl}/noticias?filters[id][$eq]=${id}&populate=*`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const lista = response.data || [];

        // Como usamos filtro, o Strapi devolve um Array. Pegamos o primeiro item.
        if (lista.length > 0) {
          return this.formatarNoticia(lista[0]);
        }

        throw new Error('Notícia não encontrada');
      }),
    );
  }

  // Helper para formatar Notícia (Blindado v4/v5)
  private formatarNoticia(item: any): NoticiaModel {
    const dados = item.attributes || item;
    const baseUrl = 'http://localhost:1337';
    const urlRelativa = this.extrairUrl(dados.imagem_capa);

    return {
      id: item.id,
      titulo: dados.titulo,
      // Se não tiver subtítulo no Strapi, deixamos vazio ou undefined
      subtitulo: dados.subtitulo || '',
      // Se não tiver autor cadastrado, colocamos um padrão
      autor: dados.autor || 'Assessoria COE',
      conteudo: this.converterBlocksParaHtml(dados.conteudo),
      resumo: dados.resumo,
      data: dados.data_publicacao,
      imagem: urlRelativa
        ? urlRelativa.startsWith('http')
          ? urlRelativa
          : `${baseUrl}${urlRelativa}`
        : '',
    };
  }

  // --- MÉTODO NOVO: O TRADUTOR DE BLOCKS ---
  // Transforma o JSON louco do Strapi v5 em HTML legível
  private converterBlocksParaHtml(blocks: any[]): string {
    if (!blocks || !Array.isArray(blocks)) {
      return '';
    }

    return blocks
      .map((block) => {
        // Função interna para processar negrito, itálico, etc.
        const renderChildren = (children: any[]): string => {
          if (!children) return '';
          return children
            .map((child: any) => {
              let text = child.text || '';

              // Tratamento de estilos básicos
              if (child.bold) text = `<strong>${text}</strong>`;
              if (child.italic) text = `<em>${text}</em>`;
              if (child.underline) text = `<u>${text}</u>`;
              if (child.strikethrough) text = `<s>${text}</s>`;
              if (child.code) text = `<code class="bg-gray-100 p-1 rounded">${text}</code>`;

              // Tratamento de Links no texto
              if (child.type === 'link') {
                return `<a href="${child.url}" class="text-blue-600 underline">${renderChildren(child.children)}</a>`;
              }

              return text;
            })
            .join('');
        };

        // Switch para decidir qual tag HTML criar
        switch (block.type) {
          case 'paragraph':
            return `<p class="mb-4 text-gray-700 leading-relaxed">${renderChildren(block.children)}</p>`;

          case 'heading':
            // Cria h1, h2, h3... dinamicamente
            const sizes: any = { 1: 'text-3xl', 2: 'text-2xl', 3: 'text-xl', 4: 'text-lg' };
            const sizeClass = sizes[block.level] || 'text-lg';
            return `<h${block.level} class="${sizeClass} font-bold text-azul-coe-escurissimo mt-6 mb-3">${renderChildren(block.children)}</h${block.level}>`;

          case 'list':
            const tag = block.format === 'ordered' ? 'ol' : 'ul';
            const listStyle = block.format === 'ordered' ? 'list-decimal' : 'list-disc';

            const itens = block.children
              .map((li: any) => `<li class="ml-4 mb-1">${renderChildren(li.children)}</li>`)
              .join('');

            return `<${tag} class="${listStyle} list-inside mb-4 ml-4">${itens}</${tag}>`;

          case 'image':
            const imgUrl = block.image.url;
            const alt = block.image.alternativeText || '';
            return `<img src="${imgUrl}" alt="${alt}" class="w-full rounded-lg my-6" />`;

          case 'quote':
            return `<blockquote class="border-l-4 border-emerald-500 pl-4 italic my-4 bg-gray-50 py-2">${renderChildren(block.children)}</blockquote>`;

          default:
            return '';
        }
      })
      .join('');
  }
}
