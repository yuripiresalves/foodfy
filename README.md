<h1 align="center">
<br>
  <img src="public/assets/chef.png" alt="FOODFY" width="216">
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

## :pushpin: Conteúdo

<p align="center">
  <a href="#desktop_computer-demonstração">Demonstração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :desktop_computer: Demonstração

[//]: # 'Add your gifs/images here:'

<span align="center">
  <p>Site:</p>
  <img src="https://i.ibb.co/Zgn956H/Foodfy.gif" alt="Foodfy" height="315">
  <br/><br/>
  <p>Parte administrativa com usuário adiministrador:</p>
  <img src="https://i.ibb.co/4t80VsJ/Admin.gif" alt="Admin" height="315">
  <br/><br/>
  <p>Parte administrativa com usuário comum:</p>
  <img src="https://i.ibb.co/qykWFGk/User.gif" alt="User" height="315">
</span>

<hr/>

## :rocket: Tecnologias utilizadas

[//]: # 'Add the features of your project here:'

- **HTML**
- **CSS**
- **JavaScript**
- **Nunjucks**
- **NodeJS**
- **Express**
- **PostgreSQL**

## :construction_worker: Instalação

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

### Windows:

1. Abra o Powershell como administrador, e navegue até a pasta da instação

_Note que neste exemplo estou utilizando a versão 13, caso você esteja com uma versão diferente, troque o numéro 13 para o correspondente à sua versão._

```bash
cd "C:\Program Files\PostgreSQL\13\bin\"
```

2. Inicie o postgres com o comando abaixo:

```bash
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\13\data" start
```

_Note que o -D tem que ser maiúsculo para que o comando seja executado perfeitamente._

**Desligar o Postgres**

Use o passo número 1 acima e digite o comando para desligar

```bash
.\pg_ctl.exe -D "C:\Program Files\PostgreSQL\13\data" stop
```

### Mac:

```shell
brew install postgres
```

**Iniciar o postgres**

```shell
pg_ctl -D /usr/local/var/postgres start
```

**Desligar o postgres**

```shell
pg_ctl -D /usr/local/var/postgres stop
```

### Linux:

[Documentação Oficial de Instalação do Postgres](https://www.postgresql.org/download/linux/)

## Utilizando o Postbird

Ao abrir o postbird, utilize o arquivo `database.sql` para criar um novo banco de dados e as tabelas. _Lembre-se de mudar as configurações em `src/config/db.js` para seu usuário e senha._

## Executando a aplicação

```bash
# Certifique-se de estar no diretório foodfy

# Execute o arquivo seed.js para popular o banco de dados:
$ node seed.js

# Execute a aplicação:
$ npm start
```

* A aplicação estará sendo executada na porta 5000 (http://localhost:5000)
* A senha padrão para todos os usuários gerados através do arquivo `seed.js` é **123**.
* Para envio de e-mails com o [mailtrap](https://mailtrap.io) altere o arquivo `src/lib/mailer.js` com seu **user** e **pass**.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Feito com :orange_heart: por [Yuri Alves](https://linkedin.com/in/yuripiresalves)

[git]: https://git-scm.com/
[node]: nodejs.org/en/
[postgresql]: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
[postbird]: https://www.electronjs.org/apps/postbird
