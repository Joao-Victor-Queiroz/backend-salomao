<p align="center">
  <h1 align="center">🕊️ Projeto Salomão - Backend API</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/typescript-%230074c1.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT">
</p>

<p align="center">
  <strong>Uma API RESTful robusta desenvolvida em NestJS para gestão e acompanhamento da pastoral de crisma, substituindo planilhas manuais por um sistema escalável e seguro.</strong>
</p>

---

## 🔄 A Motivação do Refactor: De Express para NestJS

Este projeto nasceu originalmente como uma API construída com **Node.js, Express e JavaScript puro**. Embora a primeira versão tenha sido funcional e tenha cumprido o papel de validar as regras de negócio iniciais, logo identifiquei alguns gargalos de arquitetura conforme o escopo e as funcionalidades cresciam:

1. **Falta de Padronização e Escalabilidade:** Com o Express, a liberdade arquitetural é enorme, mas isso pode resultar em um código fortemente acoplado. A divisão de responsabilidades (Controllers, Services, Repositories) dependia inteiramente de convenções manuais que não escalam tão bem a longo prazo.
2. **Tipagem e DX (Developer Experience):** O uso de JavaScript puro dificultava a detecção de erros em tempo de desenvolvimento. Refatorações eram arriscadas, pois não havia garantia estática do formato dos dados trafegados.

**Por que NestJS?**
Para resolver esses problemas de frente e elevar o nível técnico do projeto, decidi refatorar o backend utilizando **NestJS** e **TypeScript**. Esta escolha me proporcionou:
- **Arquitetura Fortemente Opinada e Modular:** Facilita a separação de domínios (ex: `Auth`, `Crismando`), injeção de dependências nativa (IoC) e uma base de código clara, testável e pronta para escalar, alinhada com padrões de mercado.
- **TypeScript-First:** Segurança de tipos de ponta a ponta, desde a validação de entrada (DTOs com `class-validator`) até a persistência no banco de dados.

## ✨ Principais Funcionalidades e Melhorias

Aproveitei o processo de reescrita para não apenas melhorar a arquitetura, mas também implementar funcionalidades críticas e regras de negócio essenciais para a pastoral:

### 🛡️ Segurança e Autenticação
- 🔐 **Autenticação Própria:** Anteriormente o sistema não possuía um módulo de autenticação. Agora, conta com um fluxo completo de login seguro e validação de rotas.
- 🎟️ **JWT e Refresh Tokens:** Autenticação baseada em JSON Web Tokens (Access Tokens de curta duração). As sessões são gerenciadas de forma segura com **Refresh Tokens**, que são validados e armazenados no banco de dados, permitindo a rotação segura de credenciais e revogação de acessos quando necessário.
- 🚧 **Controle de Acesso (RBAC):** Implementação de *Role-Based Access Control* utilizando **Decorators customizados** do NestJS, garantindo que apenas usuários com as permissões e cargos corretos acessem determinadas rotas.

### 📋 Gestão da Pastoral
- 👥 **Gerenciamento de Grupos:** Criação e administração estruturada das turmas de crisma.
- ✅ **Registro de Frequência:** Sistema otimizado para o lançamento e acompanhamento de presença focado por grupo, facilitando a gestão pelos catequistas.
- 💰 **Controle Financeiro:** Registro e acompanhamento dos valores pagos por cada crismando (ex: taxas, retiros, camisas).
- 🗄️ **Integração com Supabase:** Migração do armazenamento de dados para o **Supabase** (PostgreSQL), manipulado via **Prisma ORM**, o que garante queries otimizadas, seguras contra injeções e estritamente tipadas.

## 🛠️ Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para construção de aplicações backend.
- **[TypeScript](https://www.typescriptlang.org/)** - Adiciona tipagem estática, trazendo muito mais segurança na refatoração.
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para comunicação fluida com o banco de dados.
- **[Supabase (PostgreSQL)](https://supabase.com/)** - Banco de dados relacional na nuvem.
- **[Passport.js / JWT](https://docs.nestjs.com/security/authentication)** - Estratégias de autenticação e proteção de rotas.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Algoritmo de hash seguro para senhas.
- **[Class Validator & Class Transformer](https://github.com/typestack/class-validator)** - Validação declarativa de *payloads* de entrada.

## 🚀 Como executar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (v18 ou superior recomendado)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados PostgreSQL (recomenda-se criar um projeto no Supabase ou rodar localmente com Docker)

### Passo a passo

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/backend-salomao.git
cd backend-salomao
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configuração de Variáveis de Ambiente:**
Crie um arquivo `.env` na raiz do projeto contendo as chaves necessárias (use o arquivo de exemplo ou crie do zero):
```env
DATABASE_URL="sua_string_de_conexao_postgresql"
JWT_SECRET="sua_chave_secreta_jwt"
# Outras variáveis necessárias (ex: portas, etc)
```

4. **Configuração do Banco de Dados (Prisma):**
Execute as migrações para refletir o *schema* no seu banco de dados:
```bash
npx prisma migrate dev
```

*Caso queira popular o banco com dados fictícios ou iniciais, rode o arquivo de seed:*
```bash
npx prisma db seed
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run start:dev
```
A API estará disponível em `http://localhost:3000` (ou na porta definida no `.env`).

## 📂 Visão Geral da Estrutura

Graças ao NestJS, o projeto possui uma estrutura bem definida e dividida por módulos (Domain-Driven Design simplificado):

- **`src/auth/`**: Centraliza toda a lógica de segurança, estratégias locais e JWT, geração de tokens e controle de sessões via refresh tokens no banco.
- **`src/crismando/`** *(e outros módulos)*: Contém os *Controllers* (pontos de entrada REST), *Services* (regras de negócio) e *DTOs* (validação de dados) das entidades centrais da aplicação.
- **`prisma/`**: Abriga o `schema.prisma` com a modelagem do banco e scripts de *seed*.

## 👨‍💻 Autor

Feito por **João Victor Queiroz**.

Refatorar este projeto foi um excelente desafio para aplicar boas práticas de Engenharia de Software, focar em arquitetura limpa, Injeção de Dependências e segurança.

Sinta-se à vontade para explorar o código, avaliar a organização do projeto e como os design patterns do NestJS foram aplicados na prática!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]([SEU_LINK_DO_LINKEDIN_AQUI](https://www.linkedin.com/in/joaovictorqueirozdearaujo/))
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joaovictorqueiroz.dev@gmail.com)
