# Gerenciador de Tarefas - API RESTful com Clean Architecture

Projeto desenvolvido em Node.js com Express, Sequelize e SQLite.

## 1. Requisitos

- Node.js instalado
- npm instalado
- Git instalado

## 2. Instalação

Entre na pasta do projeto e execute:

```bash
npm install
git init
```

## 3. Executar em desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

Para executar normalmente:

```bash
npm start
```

## 4. Executar os testes

```bash
npm test
```

## 5. Estrutura

```text
src/
├── domain/
│   └── entities/
│       └── Tarefa.js
├── application/
│   └── services/
│       ├── tarefas/
│       └── usuarios/
├── infrastructure/
│   ├── database/
│   │   ├── database.js
│   │   └── models/
│   │       ├── TarefaModel.js
│   │       └── UsuarioModel.js
│   └── repositories/
│       ├── TarefaRepository.js
│       └── UsuarioRepository.js
├── interfaces/
│   ├── controllers/
│   │   ├── TarefaController.js
│   │   └── UsuarioController.js
│   └── routes/
│       └── routes.js
├── app.js
└── server.js
```

## 6. Rotas

### Criar usuário

```http
POST /usuarios
Content-Type: application/json
```

```json
{
  "nome": "Ruan",
  "email": "ruan@email.com"
}
```

### Listar usuários

```http
GET /usuarios
```

### Criar tarefa

```http
POST /tarefas
Content-Type: application/json
```

```json
{
  "titulo": "Estudar Clean Architecture",
  "usuarioId": 1
}
```

A tarefa é criada com status `PENDENTE`.

### Listar tarefas

```http
GET /tarefas
```

### Alterar título

```http
PUT /tarefas/1
Content-Type: application/json
```

```json
{
  "titulo": "Novo título"
}
```

### Excluir tarefa

```http
DELETE /tarefas/1
```

### Iniciar tarefa

```http
POST /tarefas/1/iniciar
```

Transição válida:

```text
PENDENTE -> EM_ANDAMENTO
```

Um usuário pode possuir no máximo 5 tarefas em `EM_ANDAMENTO`.

### Concluir tarefa

```http
POST /tarefas/1/concluir
```

Transição válida:

```text
EM_ANDAMENTO -> CONCLUIDA
```

## 7. Regra de negócio principal

Antes de iniciar uma tarefa, o `IniciarTarefaService` conta quantas tarefas
do mesmo usuário estão com status `EM_ANDAMENTO`.

Se a quantidade for 5 ou mais, a operação é bloqueada com a mensagem:

```text
Limite atingido: o usuário já possui 5 tarefas EM_ANDAMENTO.
```

Caso contrário, o serviço recupera a tarefa, cria a entidade pura de domínio,
invoca `tarefa.iniciar()` e pede ao repositório para persistir o novo estado.

## 8. Roteiro rápido para demonstrar em sala

1. Crie um usuário com `POST /usuarios`.
2. Crie seis tarefas com `POST /tarefas`, todas usando o ID desse usuário.
3. Confira as tarefas com `GET /tarefas`.
4. Inicie as cinco primeiras com `POST /tarefas/:id/iniciar`.
5. Tente iniciar a sexta. A API deve responder HTTP 400 e informar que o limite foi atingido.
6. Altere o título de uma tarefa com `PUT /tarefas/:id`.
7. Apague a tarefa com `DELETE /tarefas/:id`.
8. Execute `npm test` para demonstrar os testes automatizados.

## 9. Clean Architecture aplicada

- **Domain:** contém a regra pura da entidade `Tarefa`, sem Express ou Sequelize.
- **Application:** contém os casos de uso, um serviço por ação.
- **Infrastructure:** contém banco, modelos Sequelize e repositórios.
- **Interfaces:** contém controllers HTTP e roteamento.
- **Injeção de Dependência:** é feita manualmente no `app.js`, criando repositórios,
  passando-os aos serviços e passando os serviços aos controllers.
