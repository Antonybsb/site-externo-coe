export interface MembroModel {
  id: number;
  nome: string;
  cargo: string;
  imagem: string;
  categoria: 'comite' | 'voluntario';
}
