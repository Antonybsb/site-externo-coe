import { Component } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { HeroPadrao } from '../../hero-padrao/hero-padrao';

@Component({
  selector: 'app-contatos',
  imports: [ContainerPadrao, SectionHeader, HeroPadrao],
  templateUrl: './contatos.html',
  styleUrl: './contatos.css',
})
export class Contatos {}
