# Steinheuser Web — Portfólio de Desenvolvimento

Portfólio comercial criado para apresentar projetos, soluções e serviços de desenvolvimento web de forma clara, responsiva e orientada à conversão.

## Sobre o projeto

A página reúne uma apresentação profissional, estudos de caso, soluções comerciais, processo de trabalho e caminhos diretos para solicitar uma proposta. O objetivo é mostrar não apenas a execução técnica, mas também o problema resolvido, a solução entregue e o benefício de negócio de cada projeto.

## Projetos apresentados

- D Confeito — site institucional para confeitaria, com apresentação desktop/mobile e caminho direto para pedidos.
- Barbearia Monteiro — site institucional para barbearia, orientado a descoberta e agendamento.
- Arena Viva — estudo colaborativo de reservas esportivas em evolução com [gDorigon](https://github.com/gDorigon). A [prévia técnica pública](https://github.com/gabrielsteinheuser/arena-viva) é apresentada separadamente dos projetos publicados.

Cada estudo de caso apresenta:

- desafio e solução;
- imagens do resultado em desktop e mobile, quando o projeto está publicado;
- entrega e tecnologias de forma breve;
- status e benefício comercial;
- link para a versão pública;
- CTA contextual para solicitar um projeto semelhante pelo WhatsApp.

## Soluções comerciais

O site organiza a oferta em três pontos de partida:

- landing page;
- site institucional;
- projeto personalizado.

Os valores e prazos finais são confirmados após um diagnóstico inicial, evitando promessas genéricas antes da definição de conteúdo, integrações e complexidade. Cada solução possui um CTA próprio para iniciar uma conversa já contextualizada no WhatsApp.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Design responsivo
- Git e GitHub

## Principais características

- interface adaptada para computadores e dispositivos móveis;
- apresentação de projetos em estudos de caso;
- benefícios comerciais explícitos em cada projeto;
- imagens dos cases dentro do modal de detalhes;
- CTAs de orçamento na primeira dobra, nas soluções e em cada case;
- mensagens de WhatsApp contextualizadas por serviço e projeto;
- seção de soluções com escopo, investimento e prazo definidos em proposta;
- navegação simples e direta;
- identidade visual própria;
- tipografia e áreas de toque revisadas para celular;
- suporte a teclado, foco visível e preferência por movimento reduzido;
- estrutura desenvolvida sem frameworks ou dependências externas.

## Como executar

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/gabrielsteinheuser/steinheuser-portfolio.git
cd steinheuser-portfolio
```

Abra o arquivo `index.html` no navegador ou inicie um servidor local:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Estrutura principal

```text
steinheuser-portfolio/
├── .github/      # Deploy automático no Cloudflare Pages
├── assets/       # Imagens e recursos dos projetos
├── functions/    # Métricas serverless no Cloudflare
├── scripts/      # Build estático
├── index.html    # Estrutura da página
├── style.css     # Estilos e responsividade
└── script.js     # Interações, estudos de caso e eventos
```

## Build e validação

```bash
npm run check
npm run build
```

O build copia os arquivos públicos para `dist/`, diretório publicado no Cloudflare Pages.

## Deploy automático

O workflow `.github/workflows/pages-deployment.yml` publica a branch `main` no projeto
`steinheuser-portfolio`. O repositório precisa ter estes secrets configurados:

- `CLOUDFLARE_ACCOUNT_ID`;
- `CLOUDFLARE_API_TOKEN`, limitado à permissão Cloudflare Pages Edit.

## Métricas

O endpoint `/api/events` recebe e valida eventos de navegação e conversão sem cookies ou dados
pessoais. São aceitos: visualização da página, abertura e visita de projetos, solicitação de projeto
semelhante, cliques nos CTAs de WhatsApp por origem, Instagram e LinkedIn.

Quando o binding opcional `ANALYTICS` estiver configurado em uma conta com Cloudflare Analytics
Engine habilitado, os eventos são gravados no dataset informado. Sem o binding, o endpoint mantém
o contrato HTTP e não persiste os eventos, evitando que a ausência do serviço impeça o deploy do site.

## Conversão e contato

O CTA principal abre uma conversa de orçamento no WhatsApp. Os projetos e as soluções usam
mensagens diferentes para preservar o contexto do interesse do visitante. O CTA flutuante atua
como atalho durante a navegação, e a seção final de orçamento reforça que a conversa inicial é
sem compromisso.

## Autor

Desenvolvido por **Gabriel Steinheuser**, estudante de Análise e Desenvolvimento de Sistemas.
