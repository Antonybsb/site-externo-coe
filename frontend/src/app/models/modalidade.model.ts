export interface ModalidadeModel {
  id: number;
  nome: string;
  slug: string;
  texto_historia: string;
  imagem_hero: {
    url: string;
    texto_alternativo: string;
  };
  imagem_historia: {
    url: string;
  };
  icone: {
    url: string;
  };
}
