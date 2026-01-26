import { ModalidadeModel } from './modalidade.model';

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: string;
  local: string;
  imagemUrl: string;
  slug: string;
  dataFim?: string; // Opcional (pode ser de 1 dia só)
  horario?: string;
  telefone?: string;
  regulamentoUrl?: string;
  modalidades?: ModalidadeModel[]; // Lista de modalidades do evento
}
