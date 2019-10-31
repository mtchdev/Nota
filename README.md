# Nota
[![Actions Status](https://github.com/spliitzx/mailx/workflows/Client%20(Node%20CI)/badge.svg)](https://github.com/spliitzx/mailx/actions)
[![Actions Status](https://github.com/spliitzx/mailx/workflows/API/badge.svg)](https://github.com/spliitzx/mailx/actions)
![Size](https://img.shields.io/github/repo-size/spliitzx/mailx)
![License](https://img.shields.io/github/license/spliitzx/mailx)

An open-source smart, optimized, and modern note-taking desktop application designed with **[Electron](https://github.com/atom/electron)**, **[Angular](https://github.com/angular/angular)**, and **[Flask](https://palletsprojects.com/p/flask/)**. With the option of having your own Nota account, you can synchronize your notes wherever you are.

**Trello** (track our progress!): [https://trello.com/b/FCZa1QZr/mailx](https://trello.com/b/FCZa1QZr/mailx)

## Setup
⚠️ **Nota is in a very early development stage.** We're still designing!  

### Prerequisites
* Node 8.0+
* MongoDB
* Git
* Python 3.6+ (only for the API)

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
python3 -m pip install -r requirements.txt
```

## Running

Unless you're building from source, you want to run the application in a development environment. To do so, you will need to compile Electron &amp; Angular together, through the following command (in the `/nota` subdirectory):  

`npm run start:dev`

Or, likewise in a production environment:  

`npm run start:prod`  

To run the **API**, you will need to set the `FLASK_APP` variable in `PATH` and run the following:

`python3 -m flask run`

