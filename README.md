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
node horarisSeeder.js
node baixesmediquesSeeder.js
```
### Cridar seeder de forma global
```sh
cd dataSeeders
chmod +x seeder.sh
./seeder.sh
```
## Testing

### Cridar test de forma individual
```sh
npm test test/integration/server.test.js
```
o
```sh
mocha test test/integration/server.test.js
```
### Cridar tots els tests
```sh
npm test
```
o
```sh
mocha test
```
