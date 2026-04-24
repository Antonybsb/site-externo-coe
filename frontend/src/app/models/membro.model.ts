export interface MembroModel {
  id: number;
  nome: string;
  cargo: string;
  imagem: string;
  foto?: { url: string }; // <-- Mudou de 'imagem: string' para 'foto?: { url: string }'
  categoria: 'comite' | 'voluntario';
}
