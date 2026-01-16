import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerPadrao } from '../../container-padrao/container-padrao';
import { SectionHeader } from '../../section-header/section-header';
import { NoticiasLista } from '../noticias-lista/noticias-lista';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticia-artigo',
  imports: [CommonModule, ContainerPadrao, SectionHeader, NoticiasLista, RouterLink],
  templateUrl: './noticia-artigo.html',
  styleUrl: './noticia-artigo.css',
})
export class NoticiaArtigo {
  noticia = {
    id: 1,
    titulo: 'Canoa Havaiana encanta participantes com experiência única em águas tranquilas',
    subtitulo:
      'No último dia 12 de novembro de 2025, servidores do Tribunal de Contas da União (TCU) vivenciaram uma experiência marcante ao participarem de uma atividade de canoa havaiana. Remando sobre águas serenas, os participantes destacaram a sensação de liberdade proporcionada pelo vento no rosto e a harmonia da equipe durante o percurso. A iniciativa, voltada ao bem-estar e à integração, reforça a importância de práticas esportivas coletivas como ferramenta de saúde e conexão entre colegas.Atividade promovida pelo TCU proporciona momentos de lazer e conexão com a natureza',
    data: '12 de novembro de 2025',
    autor: 'Ascom TCU',
    imagem: 'assets/imagens/lagoon-2349401_1280.jpg',
    conteudo: `A iniciativa, realizada como parte do programa de qualidade de vida do órgão, proporcionou aos participantes uma experiência memorável. Remando em sincronia sobre águas serenas, os servidores destacaram a sensação de liberdade ao sentir o vento no rosto e a força da equipe em perfeita harmonia. “Foi uma oportunidade única de desconectar da rotina e reconectar com os colegas de forma leve e saudável”, comentou uma das participantes, ressaltando o impacto positivo da atividade no bem-estar coletivo.

Mais do que uma prática esportiva, a canoa havaiana reforça valores essenciais como cooperação, equilíbrio e respeito ao ritmo coletivo. Cada remada exige sintonia entre os integrantes, o que simboliza a importância da união e da confiança mútua. Segundo os organizadores, o objetivo foi estimular a integração entre os servidores, promovendo saúde mental e física por meio do esporte. “A atividade nos lembra que, assim como no trabalho, só alcançamos resultados expressivos quando atuamos em conjunto”, destacou um dos instrutores.

A adesão superou as expectativas e já há planos para novas edições. Muitos servidores relataram que a experiência trouxe não apenas benefícios físicos, mas também emocionais, ao proporcionar momentos de reflexão e conexão com a natureza. “A receptividade foi excelente. Atividades como essa mostram que é possível cuidar do corpo e da mente enquanto fortalecemos os laços dentro da instituição”, afirmou um representante da área de gestão de pessoas do TCU.

Além de promover saúde e lazer, a iniciativa reforça o compromisso do TCU com a valorização de seus servidores. A prática esportiva, inserida em um ambiente de integração, contribui para uma cultura organizacional mais humana e colaborativa. “O esporte é uma ferramenta poderosa para aproximar pessoas e criar memórias positivas. Queremos que os servidores sintam que o tribunal é também um espaço de acolhimento e bem-estar”, acrescentou a coordenação do programa.

Com atividades como a canoa havaiana, o TCU demonstra que investir em qualidade de vida é investir em produtividade e engajamento. A expectativa é que novas modalidades esportivas sejam incorporadas ao calendário, ampliando ainda mais as oportunidades de participação e fortalecendo a ideia de que o equilíbrio entre trabalho e lazer é fundamental para o desenvolvimento pessoal e profissional.
A iniciativa, realizada como parte do programa de qualidade de vida do órgão, proporcionou aos participantes uma experiência memorável. Remando em sincronia sobre águas serenas, os servidores destacaram a sensação de liberdade ao sentir o vento no rosto e a força da equipe em perfeita harmonia. “Foi uma oportunidade única de desconectar da rotina e reconectar com os colegas de forma leve e saudável”, comentou uma das participantes, ressaltando o impacto positivo da atividade no bem-estar coletivo.

Mais do que uma prática esportiva, a canoa havaiana reforça valores essenciais como cooperação, equilíbrio e respeito ao ritmo coletivo. Cada remada exige sintonia entre os integrantes, o que simboliza a importância da união e da confiança mútua. Segundo os organizadores, o objetivo foi estimular a integração entre os servidores, promovendo saúde mental e física por meio do esporte. “A atividade nos lembra que, assim como no trabalho, só alcançamos resultados expressivos quando atuamos em conjunto”, destacou um dos instrutores.

A adesão superou as expectativas e já há planos para novas edições. Muitos servidores relataram que a experiência trouxe não apenas benefícios físicos, mas também emocionais, ao proporcionar momentos de reflexão e conexão com a natureza. “A receptividade foi excelente. Atividades como essa mostram que é possível cuidar do corpo e da mente enquanto fortalecemos os laços dentro da instituição”, afirmou um representante da área de gestão de pessoas do TCU.

Além de promover saúde e lazer, a iniciativa reforça o compromisso do TCU com a valorização de seus servidores. A prática esportiva, inserida em um ambiente de integração, contribui para uma cultura organizacional mais humana e colaborativa. “O esporte é uma ferramenta poderosa para aproximar pessoas e criar memórias positivas. Queremos que os servidores sintam que o tribunal é também um espaço de acolhimento e bem-estar”, acrescentou a coordenação do programa.

Com atividades como a canoa havaiana, o TCU demonstra que investir em qualidade de vida é investir em produtividade e engajamento. A expectativa é que novas modalidades esportivas sejam incorporadas ao calendário, ampliando ainda mais as oportunidades de participação e fortalecendo a ideia de que o equilíbrio entre trabalho e lazer é fundamental para o desenvolvimento pessoal e profissional.`,
  };
}
