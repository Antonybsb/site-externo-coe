export interface NoticiaModel {
  id: number;
  titulo: string;
  subtitulo?: string;
  resumo: string;
  data: string;
  imagem: string;
  autor?: string;
  conteudo?: string;
}
