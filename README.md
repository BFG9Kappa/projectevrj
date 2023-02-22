# ProjecteVRJ

## Instal·lació

```sh
npm install
cp .env.example .env
nodemon app.js
```
Modificar fitxer .env amb les credencials de la base de dades.

## Omplir DB amb dades

### Cridar seeder de forma individual
```sh
cd dataSeeders
node seederHoraris.js
```
### Cridar seeder de forma global
```sh
cd dataSeeders
chmod +x seeder.sh
./seeder.sh
```
