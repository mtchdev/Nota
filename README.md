![Nota Logo](https://raw.githubusercontent.com/mtchdev/Nota/master/nota/src/assets/logo/nota_banner_full.png)
![CLIENT-Test-DEV](https://github.com/mtchdev/Nota/workflows/CLIENT-Test-DEV/badge.svg)
![API-Test-DEV](https://github.com/mtchdev/Nota/workflows/API-Test-DEV/badge.svg)
![Size](https://img.shields.io/github/repo-size/mtchdev/nota)
![License](https://img.shields.io/github/license/mtchdev/nota)

An open-source smart, optimized, and modern note-taking desktop application designed with **[Electron](https://github.com/atom/electron)**, **[Angular](https://github.com/angular/angular)**, and **[Flask](https://palletsprojects.com/p/flask/)**. With the option of having your own Nota account, you can synchronize your notes wherever you are.

**Trello** (track our progress!): [https://trello.com/b/FCZa1QZr/nota](https://trello.com/b/FCZa1QZr/nota)

## Setup
⚠️ **Nota is in a very early development stage.** We're still designing!  

### Prerequisites
* Node 8.0+
* Git
* Docker

### Installation
```
$ git clone https://github.com/spliitzx/Nota && cd Nota
```
Once you have cloned Nota, run the following commands:

**Client** (Desktop Application):
```
cd nota
npm install
```

**Server** (API):
```
cd api
make server.install
make database.upgrade
make server.start
```

*You will need to rename `.env.example` to `.env` and edit the values to your liking.*

## Running

Unless you're building from source, you want to run the application in a development environment. To do so, you will need to compile Electron &amp; Angular together, through the following command (in the `/nota` subdirectory):  

`npm run start:dev`

Or, likewise in a production environment:  

`npm run start:prod`  

To run the **API**, you will need Docker. To view the setup, look at the README file in `/api`

