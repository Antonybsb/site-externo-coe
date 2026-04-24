import { Evento } from './evento';
import { MembroModel } from './membro.model';

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
  descricao?: string;
  dias_horarios?: string;
  endereco?: string;
  link_whatsapp?: string;
  lideres?: MembroModel[];
  eventos?: Evento[];
}
