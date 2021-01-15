<h1 align="center">
<br>
  <img src="public/assets/chef.png" alt="FOODFY" width="220">
<br>
<br>

</h1>

<p align="center">Foodfy é um site de receitas desenvolvido durante o bootcamp Launchbase da Rocketseat. </p>

<p align="center">
  <a href="https://linkedin.com/in/yuripiresalves">
    <img src="https://img.shields.io/badge/made%20by-Yuri%20Alves-6558C3" alt="Made by Yuri Alves">
  </a>
  
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-6558C3.svg" alt="License MIT">
  </a>
</p>

[//]: # (Add your gifs/images here:)
<div>
<!--   <img src="https://i.ibb.co/Ns5nWny/web.gif" alt="web-demo" height="370"> -->
  <!-- <img src="https://i.ibb.co/KFp5xvY/mobile.gif" alt="mobile-demo" height="370"> -->
</div>

<hr />

## 🚀 Tecnologias
[//]: # (Add the features of your project here:)

-  **HTML**
-  **CSS** 
-  **JavaScript** 
-  **Nunjucks** 
-  **NodeJS** 
-  **Express** 
-  **PostgreSQL**

## 👷‍♂️ Instalação

Para executar essa aplicação você precisará ter instalado em sua máquina o [Git][git], [Node][node] e [PostgreSQL][postgresql].

<p>Após isso, siga os passos abaixo:</p>

```bash
# No terminal, clone o repositório com o comando:
$ git clone https://github.com/yuripiresalves/foodfy.git

# Entre no diretório:
$ cd foodfy

# Instale as dependências
$ npm install
```

### Agora, você precisa configurar o banco de dados

Instale o [Postbird][postbird] para poder utilizar o PostgreSQL com uma interface gráfica e fazer as operações no banco de dados.

### Ligar o Postgres

## Windows:

1. Abra o Powershell como administrador, e navegue até a pasta da instação

```bash
cd "C:\Program Files\PostgreSQL\12\bin\"
```

2. Inicie o postgres com o comando abaixo:

```bash
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" start
```

*Note que o -D tem que ser maiúsculo para que o comando seja executado perfeitamente.*

**Desligar o Postgres**

Use o passo número 1 acima e digite o comando para desligar

```bash
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" stop
```

## Mac:

```shell
brew install postgres
```

### Iniciar o postgres

```shell
pg_ctl -D /usr/local/var/postgres start
```

### Desligar o postgres

```shell
pg_ctl -D /usr/local/var/postgres stop
```

## Linux:

[Documentação Oficial de Instalação do Postgres](https://www.postgresql.org/download/linux/)

## Utilizando o Postbird

Ao abrir o postbird, utilize o arquivo `database.sql` para criar um novo banco de dados e as tabelas. *Lembre-se de mudar as configurações em `src/config/db.js` para seu usuário e senha.*

## Executando a aplicação

```bash
# Certifique-se de estar no diretório foodfy

# Execute o arquivo seed.js para popular o banco de dados:
$ node seed.js

# Execute a aplicação:
$ npm start
```

A aplicação estará sendo executada na porta 5000 (http://localhost:5000)


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

---

Made with 💚

[git]: https://git-scm.com/
[node]: nodejs.org/en/
[postgresql]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
[postbird]: https://www.electronjs.org/apps/postbird
