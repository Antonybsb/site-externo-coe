import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { RouterLink } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../breadcrumb.component/breadcrumb.component';

@Component({
  selector: 'app-depoimentos-artigo',
  imports: [CommonModule, ContainerPadrao, RouterLink, BreadcrumbComponent],
  templateUrl: './depoimentos-artigo.html',
  styleUrl: './depoimentos-artigo.css',
})
export class DepoimentosArtigo implements OnInit {
  ngOnInit(): void {
    this.breadcrumbItems.set([
      { label: 'Home', url: '/' },
      { label: 'Depoimentos', url: '/depoimentos' },
      { label: this.artigo.titulo }, // Último item sem URL (página atual)
    ]);
  }
  breadcrumbItems = signal<BreadcrumbItem[]>([]);

  artigo = {
    titulo: 'Uma nova rotina, um novo eu',
    autor: 'Ana Beatriz',
    data: '12 de novembro de 2025',
    imagemCapa: 'assets/depoimentos/basketball-95607_640.jpg', // Imagem horizontal (topo)
    imagemMeio: 'assets/depoimentos/think-5011978_640.jpg', // Imagem vertical (meio do texto)

    // Simulando blocos de texto para intercalar com a imagem
    textoParte1: `
      <p>Sempre tive dificuldade em manter uma rotina saudável, mas ao participar das atividades do COE encontrei um ambiente acolhedor e motivador. Durante muito tempo, tentei iniciar práticas físicas por conta própria, mas a falta de constância e de incentivo me fazia desistir antes mesmo de notar qualquer progresso.</p>
      <p>Foi então que conheci o COE, e minha perspectiva começou a mudar. Logo nos primeiros encontros, percebi que ali havia mais do que exercícios: havia pessoas com histórias parecidas, instrutores comprometidos e uma energia coletiva que me impulsionava a continuar.</p>
    `,

    textoParte2: `
      <p>O ambiente do COE é leve, inclusivo e encorajador. Não importa o nível de preparo físico — todos são bem-vindos e respeitados. Isso me deu segurança para persistir, mesmo nos dias em que o cansaço ou a dúvida apareciam.</p>
      <p>Aos poucos, fui percebendo mudanças não só no corpo, mas também na mente. Minha autoestima melhorou, minha disposição aumentou e até meu humor se tornou mais estável.</p>
    `,

    textoParte3: `
      <p>Hoje, a prática esportiva faz parte da minha rotina de forma natural. Não é mais uma obrigação, mas um momento que espero com entusiasmo. O COE me ensinou que cuidar da saúde pode ser prazeroso, especialmente quando se está cercado por pessoas que compartilham do mesmo propósito.</p>
    `,
  };
}
