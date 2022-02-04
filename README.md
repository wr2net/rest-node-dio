# Explorando o Estilo Arquitetural REST com Node.js

Este é um projeto desenvolvido durante o Bootcamp Inter Frontend Developer dentro da plataforma DIO - Digital Innovation One.

# Composição do nosso projeto

Neste projeto temos alguns Endpoints Base que podem ser extendidos da forma mais adequada para seu contexto.

São eles:
## Status

* GET /status

## Usuários

* GET /users
* GET /user/:uuid
* POST /user
* PUT /user/:uuid
* DELETE /user/:uuid

# Requisitos
NodeJs v16.13.2
Banco de dados PostgreSQL configurado no ElephantSQL.

## Instalação
```
$ git clone git@github.com:wr2net/rest-node-dio.git
$ cd rest-node-dio
$ npm install
```

`$ cp .env.example .env`

Informe a string de conexão com o banco de dados no .env em 'DATABASE_STRING'.

## Rodando em ambiente de desenvolvimento
`$ npm run dev`

## Como testar?
Você precisa ter o Insomnia ou outro software que permita realizar requisições HTTP.
Importe o arquivo de environments e a collection, contido no diretório Insomnia, para o Insomnia.
Desta forma, você poderá realizar as requisições para o backend.

## Gerando build da aplicação
`$ npm run build`
