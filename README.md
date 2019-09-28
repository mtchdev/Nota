# MailX
[![Actions Status](https://github.com/spliitzx/mailx/workflows/Client%20(Node%20CI)/badge.svg)](https://github.com/spliitzx/mailx/actions)
[![Actions Status](https://github.com/spliitzx/mailx/workflows/API/badge.svg)](https://github.com/spliitzx/mailx/actions)
![Size](https://img.shields.io/github/repo-size/spliitzx/mailx)
![License](https://img.shields.io/github/license/spliitzx/mailx)

An open-source smart, optimized, and clean email desktop application designed with **[Electron](https://github.com/atom/electron)**, **[Angular](https://github.com/angular/angular)**, and **[Flask](https://palletsprojects.com/p/flask/)**. With the option of having your own MailX account, you can have multiple mail accounts accessible from anywhere in the world.

## Setup
⚠️ **MailX is in a very early development stage.** We're still designing!  

### Prerequisites
* Node 8.0+
* MongoDB
* Git
* Python 3.6+ (only for the API)

### Installation
```
$ git clone https://github.com/spliitzx/mailx && cd mailx
```
Once you have cloned MailX, run the following commands:

**Client** (Desktop Application):
```
cd mailx
npm install
```

**Server** (API):
```
cd api
python3 -m pip install -r requirements.txt
```

## Running

Unless you're building from source, you want to run the application in a development environment. To do so, you will need to compile Electron &amp; Angular together, through the following command (in the `/mailx` subdirectory):  

`npm run start:dev`

Or, likewise in a production environment:  

`npm run start:prod`  
