import { Routes } from '@angular/router';
import { Modalidades } from './components/screens/modalidades/modalidades';
import { Home } from './components/screens/home/home';
import { Contatos } from './components/screens/contatos/contatos';
import { Eventos } from './components/screens/eventos/eventos';
import { EventosDetalhes } from './components/screens/eventos-detalhes/eventos-detalhes';
import { NoticiasLista } from './components/screens/noticias-lista/noticias-lista';
import { NoticiaArtigo } from './components/screens/noticia-artigo/noticia-artigo';
import { DepoimentosLista } from './components/screens/depoimentos-lista/depoimentos-lista';
import { DepoimentosArtigo } from './components/screens/depoimentos-artigo/depoimentos-artigo';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'modalidades/:slug', component: Modalidades },
  { path: 'contatos', component: Contatos },
  { path: 'eventos', component: Eventos },
  { path: 'eventos/:id', component: EventosDetalhes },
  { path: 'noticias', component: NoticiasLista },
  { path: 'noticia-artigo/:id', component: NoticiaArtigo },
  { path: 'depoimentos', component: DepoimentosLista },
  { path: 'depoimento-artigo/:id', component: DepoimentosArtigo },
];
