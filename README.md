# README para Aplicação Full Stack

## Descrição

Esta aplicação é um projeto full stack que consiste em um frontend desenvolvido com React e um backend construído com Node.js, TypeScript, e Prisma para interagir com um banco de dados MySQL. Além disso, a aplicação integra o Elasticsearch para melhorar a busca e a indexação de dados.

## Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js com TypeScript
- **Banco de Dados**: MySQL (gerenciado pelo Prisma)
- **Busca e Indexação**: Elasticsearch

## Configuração do Ambiente

### Pré-requisitos

- Node.js (versão recomendada: 14.x)
- Yarn ou npm
- MySQL Server (versão recomendada: 8.x)
- Elasticsearch (versão recomendada: 7.x)

### Configuração do Backend

1. **Instalação das Dependências**:
   Navegue até a pasta do backend e execute o comando para instalar todas as dependências necessárias:

bash yarn install

   ou
bash npm install


2. **Configuração do Banco de Dados**:
   - Certifique-se de que o MySQL Server está em execução.
   - Crie um banco de dados para a aplicação.
   - Atualize o arquivo `.env` na raiz do projeto backend com as credenciais do banco de dados.

3. **Execução das Migrações do Prisma**:
   Execute o seguinte comando para aplicar as migrações do banco de dados:

bash yarn prisma migrate dev

   ou
bash npx prisma migrate dev


4. **Iniciar o Servidor de Desenvolvimento**:
   Inicie o servidor de desenvolvimento com o seguinte comando:

bash yarn dev

   ou
bash npm run dev


### Configuração do Frontend

1. **Instalação das Dependências**:
   Navegue até a pasta do frontend e execute o comando para instalar todas as dependências necessárias:

bash yarn install

   ou
bash npm install


2. **Iniciar o Servidor de Desenvolvimento**:
   Inicie o servidor de desenvolvimento com o seguinte comando:

bash yarn start

   ou
bash npm start


### Configuração do Elasticsearch

1. **Instalação**:
   Siga as instruções oficiais para instalar o Elasticsearch em seu ambiente.

2. **Configuração**:
   Configure o Elasticsearch de acordo com as necessidades da aplicação, incluindo a criação de índices e a configuração de mapeamentos.

3. **Integração com o Backend**:
   Certifique-se de que o backend esteja configurado para se comunicar corretamente com o Elasticsearch, incluindo a configuração de URLs e credenciais, se aplicável.

## Execução da Aplicação

Após configurar o ambiente de desenvolvimento, a aplicação pode ser iniciada com os seguintes comandos:

- **Backend**: `yarn dev` ou `npm run dev`
- **Frontend**: `yarn start` ou `npm start`

Acesse a aplicação pelo navegador, utilizando o endereço `http://localhost:3000` para o frontend e `http://localhost:3001` para o backend (ou os portas configuradas).

## Contribuições

Contribuições são bem-vindas. Para contribuir, faça um fork do repositório, crie uma branch com suas alterações e envie um pull request.

## Licença

Este projeto está sob a licença MIT.
