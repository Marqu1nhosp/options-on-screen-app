# Options on Screen - Descobridor de Filmes

Uma aplicação web moderna que ajuda usuários a descobrir filmes aleatoriamente quando não sabem o que assistir. Desenvolvida com Next.js, React e integrada com The Movie Database (TMDB) API.

## Descrição do Projeto

Options on Screen é uma aplicação de descoberta de filmes que fornece recomendações aleatórias de forma simples e intuitiva. A aplicação busca informações de filmes populares da API The Movie Database e apresenta ao usuário de forma elegante e responsiva.

## Problema que o Projeto Resolve

O projeto aborda um problema comum: **a paralisia de decisão ao escolher um filme para assistir**. Muitas pessoas passam mais tempo escolhendo um filme do que assistindo-o. Esta aplicação resolve esse problema oferecendo:

- Recomendações aleatórias de filmes populares
- Interface simples e direta com um único clique
- Informações completas do filme (título, sinopse, pôster)
- Suporte a temas claro e escuro para melhor experiência do usuário
- Busca contínua em diferentes páginas de resultados da API

## Demonstração Visual

A aplicação apresenta uma interface limpa e moderna com:

- **Cabeçalho:** Pergunta "Não sabe o que assistir?" em destaque
- **Seção Principal:** Exibe a imagem do pôster do filme à esquerda e informações (título e sinopse) à direita
- **Animações:** Transição suave dos elementos com fade-down ao carregar um novo filme
- **Botão de Ação:** Botão principal "Encontrar filme" para gerar novas recomendações
- **Tema:** Alternância entre modo escuro e claro com ícone de lua
- **Rodapé:** Identificação do desenvolvedor

## Tecnologias Utilizadas

### Frontend

- **Next.js 14.0.2** - Framework React com renderização híbrida e roteamento otimizado
- **React 18** - Biblioteca para construção de interfaces com componentes
- **TypeScript 5** - Linguagem de programação com tipagem estática
- **Tailwind CSS 3.3.0** - Framework CSS utilitário para estilização responsiva
- **Tailwind Animated** - Plugin para animações avançadas

### Utilitários e Ícones

- **Axios 1.6.1** - Cliente HTTP para requisições à API
- **Phosphor React 1.4.1** - Biblioteca de ícones SVG

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para análise de código estática
- **Rocketseat ESLint Config** - Configuração padrão de ESLint
- **PostCSS** - Transformador de CSS com Autoprefixer
- **TypeScript Compiler** - Compilador TypeScript

### API Externa

- **The Movie Database (TMDB)** - Fonte de dados sobre filmes e informações multimídia

## Arquitetura do Projeto

Arquitetura utilizada: **Componentizada com padrão Container/Presentation + Context API**

```
┌─────────────────────────────────────────────────┐
│          Next.js App Router (Layout)            │
│  (RootLayout - Configuração Global e Metadata)  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│       Context API (Theme Provider)              │
│  (Gerencia estado global de tema escuro/claro)  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│     Container Component (OptionsOnScreen)       │
│  - Gerencia estado da aplicação                 │
│  - Lógica de requisição à API                   │
│  - Orquestração de componentes                  │
└────────┬────────────────┬────────────┬──────────┘
         │                │            │
         ▼                ▼            ▼
    ┌─────────┐     ┌──────────┐ ┌──────────────┐
    │Buttons  │     │Movie     │ │Text Content  │
    │Theme    │     │Display   │ │Info          │
    │Find     │     │(Image +  │ │Components    │
    │Movie    │     │Details)  │ └──────────────┘
    └─────────┘     └──────────┘
         │                │
         └────────┬───────┘
                  ▼
         ┌─────────────────┐
         │  Services (API) │
         │  TMDB API calls │
         └────────┬────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ External API     │
         │ The Movie DB    │
         └──────────────────┘
```

### Fluxo de Dados

1. **Inicialização:** RootLayout carrega, Theme Provider inicializa tema padrão (escuro)
2. **Renderização:** OptionsOnScreen (container) é renderizado com componentes de apresentação
3. **Interação:** Usuário clica em "Encontrar filme"
4. **Requisição:** handleRandomMovie() faz requisição ao TMDB via Axios
5. **Processamento:** Seleciona um filme aleatório da resposta
6. **Atualização de Estado:** movie, desableClickFindMovie e animações são atualizados
7. **Renderização:** Componentes de apresentação refletem o novo estado
8. **Animação:** Fade-down animate-fade-down executa por 1.3 segundos
9. **Tema:** Usuário pode alternar entre temas usando os botões de tema

## Estrutura de Pastas Explicada

```
options-on-screen-app/
├── public/                      # Arquivos estáticos e públicos
│   └── (favicon, etc)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz do Next.js 14
│   │   │                       # Define metadata, fontes, estrutura HTML
│   │   └── page.tsx            # Página principal - renderiza Home()
│   │                           # Integra Theme Provider e OptionsOnScreen
│   │
│   ├── components/             # Componentes reutilizáveis (Presentation)
│   │   ├── ButtonFindMovie.tsx    # Botão principal de busca
│   │   ├── ButtonThemeDark.tsx    # Botão para ativar tema escuro
│   │   ├── ButtonThemeLight.tsx   # Botão para ativar tema claro
│   │   ├── ClickFindMovie.tsx     # Texto instrucional inicial
│   │   ├── DontKnowWhatToWatch.tsx# Título principal
│   │   └── DevCreate.tsx          # Footer com créditos
│   │
│   ├── contexts/               # Context API para estado global
│   │   └── ThemeDarkLightContext.tsx
│   │       - Gerencia tema escuro/claro globalmente
│   │       - Manipula classes CSS do HTML root
│   │       - Persiste estado com localStorage (implementação futura)
│   │
│   ├── pages/                  # Containers/Smart Components
│   │   └── OptionsOnScreen.tsx    # Componente principal container
│   │       - Gerencia estado da aplicação
│   │       - Lógica de requisição à API
│   │       - Orquestra componentes filhos
│   │       - Controla animações
│   │
│   ├── services/               # Serviços e integração com APIs
│   │   └── api.tsx                # Configurações da API TMDB
│   │       - URL base da API
│   │       - Chave de autenticação
│   │       - URL base de imagens
│   │
│   └── styles/
│       └── global.css          # Estilos globais e reset CSS
│           - Imports do Tailwind
│           - Reset de propriedades padrão
│           - Scroll behavior suave
│
├── next.config.js              # Configuração do Next.js (vazio - padrão)
├── tsconfig.json               # Configuração TypeScript
│                              # Path aliases (@/* = ./src/*)
│                              # Modo strict mode ativado
├── tailwind.config.ts          # Configuração Tailwind CSS
│                              # Modo dark mode class-based
│                              # Temas customizados (gradientes)
│                              # Plugin tailwindcss-animated
├── postcss.config.js           # Configuração PostCSS
│                              # Plugins: Tailwind, Autoprefixer
├── package.json                # Dependências e scripts
└── README.md                   # Esta documentação
```

### Responsabilidades de Cada Pasta

- **app/** - Roteamento e estrutura base da aplicação (Next.js App Router)
- **components/** - Componentes visuais reutilizáveis sem lógica complexa
- **contexts/** - Gerenciamento de estado global (tema, autenticação futura)
- **pages/** - Componentes containers que orquestram lógica e componentes
- **services/** - Configurações e chamadas de APIs externas
- **styles/** - Estilos globais e variáveis CSS

## Como Rodar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** - Versão 18.x ou superior
  - Download: https://nodejs.org/
  - Verificar: `node --version` e `npm --version`
- **Git** - Para clonar o repositório

  - Download: https://git-scm.com/

- **Editor de Código** (recomendado)
  - Visual Studio Code: https://code.visualstudio.com/

### Instalação Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/options-on-screen-app.git
   cd options-on-screen-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente (se necessário)**

   ```bash
   # Criar arquivo .env.local na raiz do projeto
   # (Atualmente não há variáveis obrigatórias, API key está hardcoded no serviço)
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Acesse a aplicação**
   - Abra o navegador e acesse: `http://localhost:3000`
   - A aplicação recarrega automaticamente ao salvar mudanças (Hot Reload)

## Scripts Disponíveis

Apresentação dos scripts npm configurados no `package.json`:

```bash
# Desenvolvimento
npm run dev
# Inicia servidor de desenvolvimento na porta 3000
# Com hot reload automático para mudanças de arquivo

npm run build
# Compila a aplicação para produção
# Otimiza e minifica assets
# Gera pasta .next com build estático

npm start
# Inicia servidor de produção
# Requer execução de 'npm run build' antes

npm run lint
# Executa ESLint em todos os arquivos TypeScript/JavaScript
# Verifica boas práticas e erros de sintaxe
# Pode ser combinado com --fix para correção automática
npm run lint -- --fix
```

## Exemplos de Uso da Aplicação

### Fluxo de Uso Principal

1. **Acesse a aplicação**

   - Navegador abre em `http://localhost:3000`
   - Vê pergunta: "Não sabe o que assistir?"
   - Tema escuro é aplicado por padrão

2. **Clique em "Encontrar filme"**

   - Botão faz requisição à API TMDB
   - Seleciona filme aleatório da resposta
   - Exibe pôster, título e sinopse
   - Animação fade-down anima a aparição

3. **Continue buscando**

   - Clique novamente para mais recomendações
   - Cada clique busca nova página de filmes
   - Sem limite de buscas

4. **Alterne o tema**
   - Clique no ícone da lua para escuro
   - Clique no ícone do sol para claro
   - Tema alterna globalmente
   - Aplicado via classe CSS no HTML root

### Exemplos de Estrutura de Resposta da API

A API TMDB retorna resposta JSON similar a:

```json
{
  "page": 1,
  "results": [
    {
      "id": 985939,
      "title": "O Incrível Hulk",
      "overview": "Sinopse do filme...",
      "poster_path": "/caminho/para/imagem.jpg",
      "vote_average": 7.5,
      "release_date": "2008-06-13"
    }
    // ... mais filmes
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

### Exemplo de Uso via Código

Se estender a aplicação:

```typescript
// Importar e usar o contexto de tema
import { useContext } from 'react'
import { ThemeDarkLightContext } from '@/contexts/ThemeDarkLightContext'

export function MeuComponente() {
  const { theme, setTheme } = useContext(ThemeDarkLightContext)

  return (
    <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
      Tema atual: {theme}
    </div>
  )
}
```

## API Utilizada

### The Movie Database (TMDB) API

**Endpoint:** `https://api.themoviedb.org/3/movie/popular`

**Parâmetros:**

- `api_key` - Chave de autenticação da API (obtida em https://www.themoviedb.org/settings/api)
- `language` - Idioma dos resultados (pt-br para português)
- `page` - Número da página (aplicação incrementa após 20 filmes)

**Exemplo de Requisição:**

```bash
GET https://api.themoviedb.org/3/movie/popular?api_key=SEU_API_KEY&language=pt-br&page=1
```

**Resposta:** Lista de filmes com título, sinopse, caminho do pôster, avaliação e data de lançamento

**Imagens:**

```
Base: https://image.tmdb.org/t/p/w500
Completo: https://image.tmdb.org/t/p/w500/caminho/do/poster.jpg
```

## Boas Práticas Utilizadas no Projeto

### 1. **TypeScript e Type Safety**

- Tipos explícitos em interfaces (`MovieData`, `ButtonFindMovieProps`)
- Strict mode habilitado no `tsconfig.json`
- Type inference para variáveis quando apropriado

### 2. **Arquitetura em Componentes**

- Separação entre componentes Container (lógica) e Presentation (visualização)
- `OptionsOnScreen` - Container com estado e lógica
- Componentes em `/components` - Apenas apresentação

### 3. **State Management**

- Context API para estado global (tema)
- useState para estado local de componentes
- Desacoplamento de contextos (não abuso de global state)

### 4. **Responsividade**

- Tailwind CSS com breakpoints (sm, md, lg)
- Classes como `md:flex-row`, `md:text-left`
- Grid layout flexível

### 5. **Acessibilidade**

- Elementos semânticos HTML (`<h1>`, `<div>`, `<footer>`)
- Atributos alt em imagens
- Contraste de cores adequado

### 6. **Animações**

- Uso de plugin `tailwindcss-animated` para animações suaves
- Controle de duração das animações
- Fade-down customizado

### 7. **Code Quality**

- ESLint configurado com padrão Rocketseat
- Supressão justificada de regras (`// eslint-disable-line`)
- Nomes de arquivo em padrão PascalCase para componentes React

### 8. **Path Organization**

- Aliases de path (`@/*` = `./src/*`) para imports limpos
- Evita imports relativos complexos

### 9. **Performance**

- Componentes funcionais e hooks (mais eficientes)
- Next.js otimização de imagens e fontes
- Code splitting automático

### 10. **Documentação de Código**

- JSDoc implícito via TypeScript
- Nomes descritivos e autoexplicativos
- Comments em pontos críticos

### 11. **Dark Mode**

- Suporte a temas com Tailwind dark mode
- Classes prefixadas com `dark:`
- Persistência de tema via Context

### 12. **HTTP Client**

- Usar Axios (instalado) em vez de fetch
- Erro handling robusto (implementação futura)

## Possíveis Melhorias Futuras

### Curto Prazo (Priority: Alta)

1. **Persistência de Tema**

   - Salvar preferência de tema em localStorage
   - Recuperar preferência ao carregar a página
   - Respeitar preferência do SO via `prefers-color-scheme`

2. **Error Handling Robusto**

   - Try-catch em requisições à API
   - Mensagens de erro ao usuário
   - Retry automático em caso de falha
   - Loading states durante requisição

3. **Variáveis de Ambiente**

   - Mover API key para `.env.local`
   - Criar arquivo `.env.example` com template
   - Nunca commitar API keys

4. **Loading State e Skeleton**
   - Mostrar indicador de carregamento durante requisição
   - Placeholder skeleton enquanto dados carregam
   - Melhor feedback para usuário

### Médio Prazo (Priority: Média)

5. **Filtros de Busca**

   - Filtrar por gênero
   - Filtrar por ano de lançamento
   - Ordenar por avaliação

6. **Histórico de Filmes**

   - Manter lista de filmes sugeridos
   - Permitir marcar como favoritos
   - Salvar em localStorage ou BD

7. **Página de Detalhes do Filme**

   - Link para página individual do filme
   - Informações expandidas
   - Elenco, crewmembers, reviews

8. **Validação de Imagens**
   - Tratamento para posters não disponíveis
   - Imagem placeholder padrão
   - Fallback para filme sem poster

### Longo Prazo (Priority: Baixa)

9. **Backend e Banco de Dados**

   - Criar backend Node.js/Express
   - Banco de dados para favoritismo
   - Autenticação de usuário

10. **Sistema de Ratings**

    - Permitir ao usuário avaliar filmes
    - Salvar avaliações
    - Mostrar média de avaliações

11. **Recomendações Inteligentes**

    - IA para recomendar baseado em histórico
    - Filmografia de atores/diretores
    - Filmes similares

12. **Mobile App**

    - React Native ou Expo
    - Instalável como PWA
    - Offline support

13. **Testes Automatizados**

    - Unit tests com Jest
    - Component tests com React Testing Library
    - E2E tests com Cypress/Playwright

14. **Otimizações de Performance**

    - Image optimization avançada
    - Lazy loading de componentes
    - Caching de requisições

15. **Analytics**
    - Google Analytics
    - Rastreamento de eventos
    - Dashboard de uso

## Diagrama de Arquitetura Expandido

```
┌──────────────────────────────────────────────────────────────┐
│                    Browser / Client Side                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │           RootLayout (Next.js App Router)              │ │
│  │  - Configuração de metadados                           │ │
│  │  - Font loading (Inter)                                │ │
│  └────────────────────┬────────────────────────────────────┘ │
│                       │                                       │
│                       ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │    ThemeContextProvider (Global State Management)      │ │
│  │  - theme: 'dark' | 'light'                             │ │
│  │  - setTheme: (value: string) => void                   │ │
│  │  - useEffect monitora mudanças e aplica classes CSS    │ │
│  └────────────────────┬────────────────────────────────────┘ │
│                       │                                       │
│                       ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │      OptionsOnScreen (Container / Smart Component)     │ │
│  │                                                         │ │
│  │  State:                                                 │ │
│  │  - movie: MovieData | undefined                         │ │
│  │  - disbleClickFindMovie: boolean                        │ │
│  │  - currentPage: number                                  │ │
│  │  - animateFadeDown: string                              │ │
│  │  - animateDuration: string                              │ │
│  │                                                         │ │
│  │  Methods:                                               │ │
│  │  - handleRandomMovie(): Promise<void>                   │ │
│  │    * Faz requisição axios à API TMDB                    │ │
│  │    * Seleciona índice aleatório                         │ │
│  │    * Atualiza estado                                    │ │
│  │    * Dispara animações                                  │ │
│  └────────┬────────────────────────┬───────────────────────┘ │
│           │                        │                         │
│           ▼                        ▼                         │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  Presentation Layer  │  │  Presentation Layer  │         │
│  ├──────────────────────┤  ├──────────────────────┤         │
│  │ - ButtonThemeDark    │  │ - DontKnowWhatToWatch│         │
│  │ - ButtonThemeLight   │  │ - ClickFindMovie     │         │
│  │ - ButtonFindMovie    │  │ - Movie Display      │         │
│  │ - DevCreate (Footer) │  │ (Image + Details)    │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │             Styling Layer (Tailwind CSS)               │ │
│  │  - global.css (reset e imports)                         │ │
│  │  - tailwind.config.ts (themes customizados)             │ │
│  │  - Responsive design (md:, lg: breakpoints)             │ │
│  │  - Dark mode class-based                                │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────┐
│                    Services Layer                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │            api.tsx (Configuration)                      │ │
│  │  - api = TMDB API endpoint com API key                  │ │
│  │  - apiImg = TMDB Image base URL                         │ │
│  │  - Axios instance (would be improvements)               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────┐
│              External APIs / Backend Services                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │     The Movie Database (TMDB) API                       │ │
│  │     https://api.themoviedb.org/3/movie/popular          │ │
│  │                                                         │ │
│  │  Endpoints consumidos:                                  │ │
│  │  - GET /movie/popular (com paginação)                   │ │
│  │  - Retorna JSON com películas e informações             │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Deploy

### Usando Vercel (Recomendado)

```bash
# 1. Push para GitHub
git push origin main

# 2. Conecte no Vercel
# - Acesse https://vercel.com
# - Clique "New Project"
# - Selecione repositório GitHub
# - Deploy automático em push

# 3. Configure variáveis de ambiente
# - Painel Vercel > Settings > Environment Variables
```

### Deploy Manual

```bash
# 1. Build para produção
npm run build

# 2. Teste antes de deployar
npm run start

# 3. Deploy em serviço de escolha
# - Vercel (recomendado)
# - Netlify (com configuração _redirects)
# - AWS Amplify
# - Railway
# - Render
```

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para detalhes.

## Suporte

Para dúvidas, sugestões ou reportar bugs:

- Abra uma issue no GitHub
- Envie um email para o desenvolvedor
- Consulte a documentação do Next.js: https://nextjs.org/docs

## Gloasário de Termos

| Termo            | Explicação                                                        |
| ---------------- | ----------------------------------------------------------------- |
| **Context API**  | Sistema de gerenciamento de estado global do React                |
| **Hook**         | Função especial do React que permite usar state e outras features |
| **SSR/SSG**      | Server-Side Rendering e Static Site Generation (Next.js features) |
| **Hydration**    | Processo onde Next.js torna HTML estático interativo no cliente   |
| **Dark Mode**    | Tema com cores mais escuras para proteger os olhos                |
| **API Key**      | Chave de autenticação para usar APIs externas                     |
| **Tailwind CSS** | Framework CSS baseado em classes utilitárias                      |
| **PostCSS**      | Ferramenta para transformar CSS com JavaScript                    |
| **ESLint**       | Ferramenta para identificar problemas em código JS/TS             |
| **TMDB**         | The Movie Database - banco de dados de filmes e séries            |

## Changelog

### v0.1.0 (Versão Inicial)

- Setup inicial do projeto com Next.js 14
- Integração com TMDB API
- Sistema de tema escuro/claro com Context API
- Interface responsiva com Tailwind CSS
- Animações suaves
- Component structure organizado

## Contato

**Desenvolvido por:** Marcos Porto

Para contato ou mais informações sobre o desenvolvedor, consulte o footer da aplicação.
