1. O Gatilho: ngOnInit()
O que é: O momento em que você senta na mesa.

Fluxo: O Angular termina de criar o HTML básico do componente e diz: "Pronto, pode rodar a lógica inicial".

2. O Pedido: this.apiService.getModalidades()
O que é: Você chama o garçom e pede o cardápio.

Fluxo: O código manda um sinal lá para o Strapi (Back-end) dizendo "Me manda a lista de esportes".

Detalhe Importante: O código não trava aqui. O Javascript continua rodando enquanto o Strapi processa o pedido. Ele não fica parado esperando.

3. A Assinatura: .subscribe({ ... })
O que é: Você diz ao garçom: "Quando o prato chegar, coloque na minha mesa (next). Se a cozinha pegar fogo, me avise (error)".

Fluxo: Você define o que vai acontecer no futuro. O código dentro de next ainda não rodou. Ele fica em "stand-by".

(Aqui ocorre um intervalo de tempo de milissegundos ou segundos enquanto a internet trabalha...)
4. A Chegada (O Callback): next: (response) => { ... }
O que é: O garçom chegou com o prato!

Fluxo: O Strapi respondeu com sucesso. Agora, e só agora, o código dentro dessas chaves começa a ser executado. O response é o pacote que veio do servidor.

5. A Normalização (O Filtro de Segurança)
const dadosCheios = response.data || response;

O Problema: O Strapi v4 manda os dados dentro de uma "caixa" chamada data. O Strapi v5 (ou outras APIs) pode mandar os dados "soltos".

A Solução: Esse código diz: "Se existir uma caixa data, use ela. Se não, use o pacote inteiro".

Resultado: dadosCheios agora é, com certeza, a sua lista (Array) de esportes.

6. A Verificação Defensiva
if (dadosCheios && dadosCheios.length > 0)

O Conceito: Programação Defensiva.

Fluxo: Antes de tentar pegar o item, perguntamos: "Essa lista existe mesmo? Tem pelo menos um item dentro?"

Por que? Se a lista vier vazia e tentarmos acessar a posição [0], o código quebraria (erro crítico).

7. A Seleção do "Herói"
this.modalidadeDestaque = dadosCheios[0];

O Conceito: Acesso a Array por Índice.

Fluxo: Como queremos fazer um Hero Banner (que mostra apenas UM destaque), pegamos apenas o primeiro item da lista (índice 0) e guardamos na variável modalidadeDestaque.

Resultado: Agora temos um objeto único com Título, Imagem Hero, etc.

8. A Ordem de Pintura (Renderização)
this.cd.detectChanges();

O que é: Você gritando para a cozinha.

Fluxo: Como vimos antes, o Angular às vezes não percebe que a variável this.modalidadeDestaque mudou lá dentro do passo 7. Esse comando obriga o Angular a atualizar o HTML imediatamente. Sem isso, a tela poderia continuar branca mesmo com os dados já carregados.

Resumo Visual
Componente Nasce (ngOnInit)

Dispara Pedido HTTP (getModalidades) -> Javascript continua, não espera.

... tempo passa ...

Resposta Chega (subscribe ativa o next)

Trata os dados (Normaliza e Valida)

Atualiza Variável (this.modalidadeDestaque = ...)

Atualiza Tela (detectChanges)

# Padroes de algorítmos para buscar dados.

Em programação, geralmente existem três formas de buscar dados. O código que fizemos é o Nível 1 (Didático), porque ele te mostra passo a passo o que está acontecendo.

Aqui está a evolução para você entender onde estamos e para onde vamos:

1. O Jeito "Manual" (O que estamos usando)
Você pede os dados, abre o pacote manualmente (.subscribe), guarda numa variável e avisa a tela.

Vantagem: Ótimo para debugging (colocar console.log e ver o dado chegar) e para lógicas complexas (como aquele if que criamos para o Strapi v4/v5).

Desvantagem: Verboso. Exige gerenciar a memória e atualizar a tela manualmente (detectChanges) em casos específicos.

2. O Jeito "Reativo Clássico" (Async Pipe)
É o padrão da indústria até o Angular 16. Você não usa .subscribe() no TypeScript. Você entrega o "fluxo" (Observable) direto para o HTML.

Código: modalidades$ = this.apiService.getModalidades();

HTML: @if (modalidades$ | async as lista) { ... }

Vantagem: O Angular faz o subscribe e o unsubscribe sozinho. Não vaza memória.

Desvantagem: A lógica de tratamento de dados (aquele if do Strapi) precisa ser feita com operadores RxJS (map, tap), que tem uma curva de aprendizado alta.

3. O Jeito "Moderno" (Signals)
É o futuro (Angular 17+). Você transforma a requisição num Sinal.

Conceito: Uma variável que, quando muda, avisa a tela automaticamente com precisão cirúrgica.

Código: modalidades = toSignal(this.apiService.getModalidades());

Vantagem: Performance máxima, zero necessidade de ChangeDetectorRef ou Zone.js.

Resumo da Aula
O algoritmo lógico é sempre o mesmo (Pedir -> Esperar -> Receber), mas a implementação muda:

Manual (Atual): Você é o garçom. Pega o prato na cozinha, leva até a mesa e avisa o cliente.

AsyncPipe: Você cria uma esteira rolante da cozinha direto para a mesa.

Signals: A mesa "sabe" magicamente quando o prato está pronto na cozinha.

Minha recomendação: Mantenha o código atual (Manual) enquanto estamos construindo a lógica e tratando os dados do Strapi. É mais fácil de "ver" os problemas. Quando o site estiver pronto, podemos fazer uma refatoração para Signals como passo final de polimento.

# 📘 Documentação Técnica: HeroPadraoComponent

## 1. Visão Geral
O **`HeroPadraoComponent`** é um *dumb component* (componente de apresentação) responsável por renderizar o banner principal (Hero Section) das páginas.

Ele foi projetado para ocupar **100% da altura da viewport** (`h-screen`) e gerenciar automaticamente a sobreposição de três camadas visuais:
1.  Imagem de fundo (*Background Image*).
2.  Máscara de cor (*Overlay*).
3.  Conteúdo textual (Título).

> **Nota de Arquitetura:** Este componente **não utiliza** o `ContainerPadraoComponent`. Ele implementa sua própria lógica de container internamente para garantir que a imagem de fundo se estenda de ponta a ponta (*full-width*), enquanto o texto permanece centralizado (`max-w-7xl`).

---

## 2. Fluxo de Dados
1.  **Entrada:** O componente pai fornece os dados via **Angular Signals** (`titulo`, `imagemUrl`, `classeCorOverlay`).
2.  **Renderização:**
    * A `imagemUrl` é aplicada como `style.backgroundImage`.
    * A `classeCorOverlay` é injetada em uma `div` absoluta (z-index baixo).
    * O `titulo` é renderizado sobre as camadas (z-index alto).

---

## 3. API do Componente (Inputs)

| Input | Tipo | Obrigatório? | Default | Descrição |
| :--- | :--- | :---: | :--- | :--- |
| `titulo` | `string` | ✅ Sim | - | O texto principal do banner. |
| `imagemUrl` | `string` | ✅ Sim | - | Caminho relativo ou absoluto da imagem. |
| `classeCorOverlay` | `string` | ❌ Não | `bg-[#2B2171]/30` | Classes Tailwind para a máscara de cor. |

---

## 4. Implementação (Código Fonte)

### 4.1 TypeScript (`hero-padrao.component.ts`)

```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-padrao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-padrao.component.html',
})
export class HeroPadraoComponent {
  // Dados obrigatórios
  titulo = input.required<string>();
  imagemUrl = input.required<string>();

  // Dado opcional (Default: Azul COE translúcido)
  classeCorOverlay = input<string>('bg-[#2B2171]/30');
}
```

### 4.2 Template HTML (`hero-padrao.component.html`)

```html
<section class="w-full h-screen flex justify-center relative bg-cover bg-center"
    [style.backgroundImage]="'url(' + imagemUrl() + ')'">

    <div class="absolute inset-0" [class]="classeCorOverlay()"></div>

    <div class="w-full max-w-7xl px-6 lg:px-0 flex items-center h-full z-10">
        <h1 class="text-6xl lg:text-8xl font-bold text-white break-words">
            {{ titulo() | uppercase }}
        </h1>
    </div>

</section>
```

---

## 5. Exemplos de Uso

**Exemplo A: Padrão (Institucional)**
```html
<app-hero-padrao
    titulo="Vôlei de Praia"
    imagemUrl="/assets/imagens/volei.jpg">
</app-hero-padrao>
```

**Exemplo B: Customizado (Outra cor)**
```html
<app-hero-padrao
    titulo="Futebol"
    imagemUrl="/assets/imagens/futebol.jpg"
    classeCorOverlay="bg-green-600/60">
</app-hero-padrao>
```