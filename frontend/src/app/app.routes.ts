import { Routes } from '@angular/router';
import { Modalidades } from './components/screens/modalidades/modalidades';
import { Home } from './components/screens/home/home';
import { Contatos } from './components/screens/contatos/contatos';
import { Eventos } from './components/screens/eventos/eventos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'modalidades/:slug', component: Modalidades },
  { path: 'contatos', component: Contatos },
  { path: 'eventos', component: Eventos },
];
