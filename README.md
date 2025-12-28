# GitHub Dashboard - Desafio Técnico

Aplicação de dashboard desenvolvida para visualização de métricas de repositórios do GitHub. O projeto foi criado como parte de um teste técnico, com foco em organização de arquitetura, TypeScript e UX/UI.

## Tecnologias Utilizadas

O projeto foi inicializado com o template Vite, utilizando React e TypeScript para garantir tipagem estática e melhor manutenibilidade.

- React e TypeScript
- Axios para consumo da API do GitHub
- Recharts para visualização de dados (gráficos)
- Lucide React para ícones
- CSS Variables para implementação do tema escuro (Dark Mode)

## Estrutura do Projeto

O código foi estruturado para separar responsabilidades e facilitar a escalabilidade:

src/
├── components/   # Componentes visuais reutilizáveis
├── pages/        # Páginas da aplicação
├── services/     # Configuração de API e requisições HTTP
└──types/        # Definições de interfaces TypeScript

## Decisões de Projeto

Durante o desenvolvimento, algumas decisões foram tomadas para atender aos requisitos:

1. Repositório Inicial:
O desafio solicitava exibir o repositório mais popular do GitHub ao iniciar. Como os repositórios com mais estrelas geralmente são apenas listas de links (sem commits de código), optei por carregar o repositório "facebook/react" como padrão caso a busca venha vazia. Isso permite que a interface demonstre os gráficos de commits corretamente desde o primeiro acesso.

2. Modo Escuro (Dark Mode):
Utilizei variáveis CSS nativas para o gerenciamento de temas. Isso evita a necessidade de bibliotecas adicionais de estilo, mantendo o bundle da aplicação mais leve e performático.

3. Tratamento de Erros:
A aplicação implementa feedback visual para estados de carregamento e erros de requisição, além de tratar casos onde o repositório existe mas não possui histórico de commits recente.

## Como Rodar Localmente

1. Clone o repositório
2. Instale as dependências com: npm install
3. Inicie o servidor: npm run dev
