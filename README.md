# Steinheuser Web — Portfólio de Desenvolvimento

Portfólio pessoal criado para apresentar projetos, habilidades e serviços de desenvolvimento web de forma clara e responsiva.

## Sobre o projeto

A página reúne uma apresentação profissional, projetos selecionados, informações sobre serviços e formas de contato. O objetivo é demonstrar conhecimentos de front-end e criar uma presença digital para oportunidades profissionais e trabalhos independentes.

## Projetos apresentados

- D Confeito — site institucional para confeitaria.
- Barbearia Monteiro — site institucional para barbearia.
- Arena Viva — projeto de reservas esportivas em colaboração com [gDorigon](https://github.com/gDorigon), com repositório privado. A [demonstração pública](https://github.com/gabrielsteinheuser/arena-viva) é uma versão separada.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Design responsivo
- Git e GitHub

## Principais características

- interface adaptada para computadores e dispositivos móveis;
- apresentação de projetos em estudos de caso;
- navegação simples e direta;
- identidade visual própria;
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

O endpoint `/api/events` registra eventos de navegação e conversão, sem cookies ou dados
pessoais, no dataset `steinheuser_portfolio_events` do Cloudflare Analytics Engine.

São registrados: visualização da página, abertura e visita de projetos e cliques no WhatsApp,
Instagram e LinkedIn.

## Autor

Desenvolvido por **Gabriel Steinheuser**, estudante de Análise e Desenvolvimento de Sistemas.
