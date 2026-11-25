
# ♻️ EcoColeta API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

## 📖 Sobre o projeto

O EcoColeta é uma API REST desenvolvida para facilitar o gerenciamento de pontos de coleta, materiais recicláveis e solicitações de coleta seletiva.

O projeto foi desenvolvido como atividade acadêmica de Back-end, tendo como base os Objetivos de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU).

## 🌎 ODS 11 – Cidades e Comunidades Sustentáveis

### Problema identificado

A falta de informações sobre pontos de coleta e o descarte inadequado de resíduos recicláveis contribuem para a poluição ambiental e dificultam a construção de cidades sustentáveis.

### Solução proposta

Desenvolver uma API que permita organizar informações sobre pontos de coleta, cadastrar materiais recicláveis e gerenciar solicitações de coleta, incentivando práticas sustentáveis e o descarte correto de resíduos.

## 🎯 Objetivos

- Incentivar a reciclagem e a coleta seletiva.
- Facilitar o acesso a informações sobre pontos de coleta.
- Organizar o gerenciamento de materiais recicláveis.
- Permitir o acompanhamento de solicitações de coleta.
- Contribuir para a sustentabilidade urbana.

## 🚀 Funcionalidades

- Cadastro de usuários.
- Consulta, atualização e exclusão de usuários.
- Gerenciamento de pontos de coleta.
- Cadastro e gerenciamento de materiais recicláveis.
- Criação de solicitações de coleta.
- Atualização do status das solicitações.
- Armazenamento persistente de dados.
- Validação de informações obrigatórias.
- Documentação da API com Swagger.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js | Ambiente de execução |
| JavaScript | Linguagem de programação |
| Express | Desenvolvimento da API REST |
| SQLite | Banco de dados |
| Better SQLite3 | Integração com o banco |
| Swagger | Documentação da API |
| Dotenv | Variáveis de ambiente |
| CORS | Configuração de acesso |
| Nodemon | Desenvolvimento |
| Git e GitHub | Controle de versão |

## 📁 Estrutura do projeto

```text
ecocoleta-api/
├── src/
│   ├── database/
│   │   └── database.js
│   ├── routes/
│   │   ├── usuarios.js
│   │   ├── pontos.js
│   │   ├── materiais.js
│   │   └── solicitacoes.js
│   ├── swagger.js
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Instalação e execução

### Pré-requisitos

- Node.js compatível com as dependências (recomendado: 22 LTS).
- NPM.
- Git.

### 1. Clonar o repositório

```bash
git clone https://github.com/matheusdossantos0669/ecocoleta-api.git
```

### 2. Acessar a pasta

```bash
cd ecocoleta-api
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
```

### 5. Executar a aplicação

Modo de desenvolvimento:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

O servidor estará disponível em:

http://localhost:3000

O banco de dados SQLite será criado automaticamente durante a inicialização da aplicação.

## 📚 Endpoints da API

### Rota principal

| Método | Endpoint | Descrição |
|---|---|---|
| GET | / | Informações da API |

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /usuarios | Listar usuários |
| GET | /usuarios/:id | Buscar usuário |
| POST | /usuarios | Cadastrar usuário |
| PUT | /usuarios/:id | Atualizar usuário |
| DELETE | /usuarios/:id | Excluir usuário |

### Pontos de coleta

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /pontos-coleta | Listar pontos |
| GET | /pontos-coleta/:id | Buscar ponto |
| POST | /pontos-coleta | Cadastrar ponto |
| PUT | /pontos-coleta/:id | Atualizar ponto |
| DELETE | /pontos-coleta/:id | Excluir ponto |

### Materiais recicláveis

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /materiais | Listar materiais |
| POST | /materiais | Cadastrar material |
| PUT | /materiais/:id | Atualizar material |
| DELETE | /materiais/:id | Excluir material |

### Solicitações de coleta

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /solicitacoes | Listar solicitações |
| POST | /solicitacoes | Criar solicitação |
| PATCH | /solicitacoes/:id | Atualizar status |
| DELETE | /solicitacoes/:id | Excluir solicitação |

## 🧪 Exemplos de requisições

As requisições POST, PUT e PATCH devem utilizar o cabeçalho:

```text
Content-Type: application/json
```

### Cadastrar usuário

POST /usuarios

```json
{
  "nome": "Usuario Teste",
  "email": "usuario@example.com",
  "telefone": "66900000000"
}
```

### Cadastrar ponto de coleta

POST /pontos-coleta

```json
{
  "nome": "EcoPonto Central",
  "endereco": "Rua Principal, 100",
  "cidade": "Rondonópolis",
  "responsavel": "Responsavel Teste"
}
```

### Cadastrar material

POST /materiais

```json
{
  "nome": "Plástico",
  "descricao": "Garrafas e embalagens plásticas"
}
```

### Criar solicitação

POST /solicitacoes

```json
{
  "usuario_id": 1,
  "ponto_id": 1,
  "material_id": 1,
  "quantidade": 5
}
```

Os IDs informados devem corresponder a registros existentes no banco de dados.

### Atualizar status

PATCH /solicitacoes/1

```json
{
  "status": "Concluída"
}
```

## 📋 Status das solicitações

- Pendente
- Em andamento
- Concluída
- Cancelada

## 📊 Códigos de resposta HTTP

| Código | Descrição |
|---|---|
| 200 | Requisição realizada com sucesso |
| 201 | Registro criado com sucesso |
| 400 | Dados inválidos ou incorretos |
| 404 | Registro ou rota não encontrada |
| 409 | Conflito de informações |
| 500 | Erro interno do servidor |

## 🗄️ Banco de dados

O projeto utiliza SQLite para armazenamento das informações.

O banco de dados é composto por quatro tabelas:

- usuarios
- pontos_coleta
- materiais
- solicitacoes

A tabela de solicitações possui relacionamentos com as tabelas de usuários, pontos de coleta e materiais recicláveis por meio de chaves estrangeiras.

## 📑 Documentação Swagger

A interface Swagger está disponível após iniciar o servidor:

http://localhost:3000/api-docs

A documentação dos endpoints está em desenvolvimento.

As requisições também podem ser realizadas utilizando o Postman.

## 🔒 Segurança e privacidade

O projeto utiliza consultas SQL parametrizadas e validações básicas de entrada.

Os arquivos de configuração local, banco de dados e dependências são ignorados pelo Git.

Esta é uma API acadêmica, destinada ao aprendizado e à execução local. Ainda não possui autenticação e autorização de usuários, portanto não deve ser utilizada em produção com dados pessoais reais.

## 🔮 Melhorias futuras

- Implementação de autenticação JWT.
- Desenvolvimento de uma interface web.
- Integração com mapas e geolocalização.
- Filtros de busca por cidade e material.
- Dashboard de indicadores de reciclagem.
- Notificações de solicitações.
- Testes automatizados.
- Hospedagem da API em nuvem.

## 👨‍💻 Autor

**Matheus dos Santos Silva**

GitHub: https://github.com/matheusdossantos0669

## 🎓 Finalidade acadêmica

Projeto desenvolvido para a atividade de Back-end — API, com foco no ODS 11: Cidades e Comunidades Sustentáveis.

---

♻️ Tecnologia e sustentabilidade para construir cidades melhores.
