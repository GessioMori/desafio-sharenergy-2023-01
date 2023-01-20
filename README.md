# Desafio - Processo seletivo SHARENERGY 2023/01

Vídeo: [LINK - YOUTUBE](https://youtu.be/IYw2L1yCHFk)

Projeto full stack construído em TypeScript/Node.js.

## Back-end

### Features:

- A arquitetura do projeto segue os princípios SOLID, realizando a injeção de dependências com tsyringe.
- Testes de unidade e integração utilizando jest e supertest;
- Validação de dados utilizando zod;
- Rotas protegidas utilizando um middleware que captura o cookie do cliente e faz a verificação;
- Banco de dados MongoDB acessado via mongoose;
- Tratamento de erros com express-async-errors;
- Controle do número de requests/tempo utilizando express-rate-limit;
- Criptografia das senhas utilizando argon2;
- Documentação feita com Swagger.

### Instalação e uso:

Certifique-se de ter as seguintes versões instaladas (ou superiores):

- Node.js: 16.19.0
- npm: 8.13.3
- Docker 20.10.22

Clone o repositório e instale as dependências usando o npm install.

```bash
git clone https://github.com/GessioMori/desafio-sharenergy-2023-01.git
cd desafio-sharenergy-2023-01/server
npm install
```

Crie um arquivo .env na pasta server (utilize o arquivo .env.example como base). Além disso, crie o arquivo init-mongo.js (utilize o arquivo init-mongo.js.example como base), ele será responsável por criar três databases dentro do mesmo container do Docker (um para cada ambiente: development, test e production).
Para criar o banco de dados, execute:

```bash
docker compose up -d
```

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
npm run dev
```

Para compilar o projeto e iniciar o servidor em modo de produção, execute:

```bash
npm run build
npm start
```

### Documentação

A documentação pode ser acessada pela rota /api-docs.

### Testes

Para executar os testes, execute:

```bash
npm run test
```

## Front-end

### Features:

- Front-end construído com Vite/React e TypeScript;
- Custom hooks para as queries e mutations com react-query;
- Estilização com TailwindCSS e ícones do pacote phosphor-react;
- Formulários responsivos com react-hook-form;
- Validação de dados (tanto para queries quanto para mutations) com zod;
- Criação de rotas com react-router-dom, realizando o processo de autorização antes da renderização dos componentes;
- Conexão com as APIs feita através de axios.

### Instalação e uso:

Certifique-se de ter as seguintes versões instaladas (ou superiores):

- Node.js: 16.19.0
- npm: 8.13.3

Clone o repositório e instale as dependências usando o npm install.

```bash
git clone https://github.com/GessioMori/desafio-sharenergy-2023-01.git
cd desafio-sharenergy-2023-01/app
npm install
```

No arquivo .env, altere o valor da variável VITE_API_URL para o endereço do servidor (por padrão, o servidor é iniciado na porta 3333). Utilize o arquivo .env.example como base.

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
npm run dev
```

Para realizar o build do projeto, execute:

```bash
npm run build
```
