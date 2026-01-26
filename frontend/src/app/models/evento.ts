import { ModalidadeModel } from './modalidade.model';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  local: string;
  imagemUrl: string;
  slug: string;
  dataFim?: string;
  horario?: string;
  telefone?: string;
  regulamentoUrl?: string;
  modalidades?: ModalidadeModel[];
}
