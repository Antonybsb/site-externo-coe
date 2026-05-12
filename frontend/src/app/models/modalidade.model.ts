import { Evento } from './evento';
import { MembroModel } from './membro.model';
import { ParceiroModel } from './parceiro.model';

export interface ModalidadeModel {
  id: number;
  nome: string;
  slug: string;
  status_consolidacao?: 'consolidado' | 'em_formacao';
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
  parceiros?: ParceiroModel[];
}
