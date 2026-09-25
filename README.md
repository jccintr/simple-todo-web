# Simple Todo Web

Versão web (React + Vite + JavaScript, Tailwind CSS v4, flowbite-react) do
Simple Todo, consumindo a [`simple-todo-api`](https://github.com/jccintr/simple-todo-api)
— a mesma API do app mobile.

## Rodando o projeto

```bash
npm install
cp .env.example .env   # ajuste VITE_API_BASE_URL se necessário
npm run dev
```

## Tema claro/escuro

Três opções (não só um toggle): **Claro / Escuro / Sistema**, selecionáveis
no ícone de sol/lua no canto superior direito (visível nas telas de
login/cadastro e na navbar depois de logado). A escolha fica salva em
`localStorage` e persiste entre sessões; "Sistema" (o padrão) acompanha o
tema do SO em tempo real, inclusive se ele mudar com a aba aberta.

Tecnicamente: Tailwind v4 é "CSS-first" — não existe `tailwind.config.js`.
O dark mode manual é configurado em `src/index.css` via
`@custom-variant dark (&:where(.dark, .dark *));`, e a paleta em si é um
conjunto de variáveis CSS (`--color-background`, `--color-text`, etc.)
redefinidas dentro de `.dark` — é por isso que os componentes do app usam
classes como `bg-background`/`text-text` em vez de ficar escrevendo
`dark:bg-...` em todo canto.

## Estrutura

```
src/
├── api/            # client.js (fetch wrapper) + authApi/categoriesApi/todosApi
├── components/      # ConfirmModal, CategoryCard, TodoItem, PrioritySelector,
│                     # CategoryFormModal, TodoFormModal, PasswordInput, ThemeToggle, Logo
│   └── layout/       # AppLayout (navbar), AuthLayout
├── context/         # AuthContext (token/usuário + status de sessão), ThemeContext
├── routes/          # RequireAuth, RequireGuest
├── pages/           # auth/ (Login, Cadastro), categorias/ (Categorias, TarefasCategoria), perfil/
└── utils/           # priority.js (opções/cores/label de prioridade)
```

## Decisões que valem saber antes de mexer

- **Cadastro não loga automaticamente.** `POST /auth/register` não retorna
  token — só `{ message, user }`. Por isso `CadastroPage` manda de volta
  pro `LoginPage` (com o email pré-preenchido via `location.state`) em vez
  de logar direto.
- **Não existe endpoint de "todas as tarefas".** Só por categoria
  (`GET /todos/category/:categoryId`) — por isso a navegação é
  Categorias → Tarefas da categoria.
- **Excluir categoria com tarefas dentro retorna 409.** A API bloqueia de
  propósito; o modal de confirmação mostra a mensagem de erro da API em
  vez de fechar.
- **`GET /todos/category/:categoryId` não devolve o nome da categoria.**
  `TarefasCategoriaPage` busca a lista de categorias em paralelo só pra
  achar o nome e mostrar no título — não é o ideal (uma chamada a mais),
  mas evita duplicar essa info em outro lugar.
- **`PATCH /auth/me` só aceita `{ name }`.** Não dá pra trocar email nem
  senha por esse endpoint — `PerfilPage` reflete exatamente essa limitação.

## Validado, não visto renderizado

Rodei `npm run build` e `npm run lint` (0 erros — os avisos restantes são
`set-state-in-effect` ao resetar formulário quando um modal abre, mesmo
padrão já aceito nos outros dois apps web da Delivroo) neste ambiente, mas
não há como abrir num navegador aqui. O primeiro `npm run dev` do seu lado
é o teste real de renderização.
