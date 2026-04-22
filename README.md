# 🚀 Freebet Pro - Backend

API desenvolvida para gerenciamento de operações de apostas (freebet, surebet e apostas normais), com autenticação de usuários e controle completo de dados.

---

## 🧠 Funcionalidades

- ✅ Cadastro e login de usuários (JWT)
- ✅ CRUD completo de operações
- ✅ Proteção de rotas com autenticação
- ✅ Validação de dados com Zod
- ✅ Cálculo automático de lucro e ROI
- ✅ Filtros por:
  - tipo (freebet, surebet, normal)
  - CPF
  - período (7d / 30d)
  - ordenação (lucro, roi, data)
- ✅ Paginação de resultados

---

## 🛠️ Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Zod
- JSON Web Token (JWT)
- Bcrypt

---

## 📦 Instalação

```bash
# clonar o repositório
git clone https://github.com/VictorPortelaDev/freebet-pro-backend.git

# entrar na pasta
cd freebet-pro-backend

# instalar dependências
npm install
```

--- 

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:


```env
DATABASE="sua_url_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```


---


## ▶️ Rodando o projeto

``` bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3333
```

---


## 🔐 Autenticação

A API utiliza autenticação via JWT.

Envie o token no header das requisições protegidas:

```http
Authorization: Bearer SEU_TOKEN
```

---

## 📌 Endpoints principais

### 🔑 Auth

#### Criar usuário
```http
POST /auth/register
```

#### Login
```http
POST /auth/login
```

---

### 📊 Operações

#### Criar operação
````https
POST /operations
````

#### Listar operações
````https
GET /operations
````

#### Atualizar operação
````https
PUT /operations/:id
````

#### Deletar operação
````https
DELETE /operations/:id
````


## 🧮 Regras de Negócio

- O **lucro** é calculado automaticamente:

```bash
lucro = retorno - stake
```

- O **ROI** é calculado automaticamente:

```bash
O ROI é calculado automaticamente:
roi = (lucro / stake) * 100
```

- O cliente **não pode enviar lucro ou ROI**, esses valores são definidos pelo backend.

---

## 🧪 Exemplo de requisição

```json
{
  "casa": "Bet365",
  "esporte": "Futebol",
  "odd": 2.1,
  "stake": 100,
  "retorno": 210,
  "cpf": "12345678900",
  "tipo": "freebet"
}
```

---

## ⚠️ Observações

- Cada usuário só pode acessar suas próprias operações
- Todos os dados são validados antes de serem processados
- Rotas protegidas exigem autenticação via token

---

## 📈 Melhorias futuras
- Dashboard com métricas
- Testes automatizados
- Deploy em produção
- Rate limiting e segurança avançada

---

## 👨‍💻 Autor

Desenvolvido por Victor Portela