# ProjecteVRJ

## Instal·lació

```sh
npm install
cp .env.example .env
nodemon app.js
```
Modificar fitxer .env amb les credencials de la base de dades.

## Omplir DB amb dades

```sh
cd dataSeeders
node seederCsv.js
node seederJson.js
```