# ProjecteVRJ

## Instal·lació

```sh
npm install
cp .env.example .env
nodemon app.js
```
Modificar fitxer .env amb les credencials de la base de dades.

## Omplir DB amb dades

### Cridar seeders en especific
```sh
cd dataSeeders
node usuarisSeeder.js
node horarisSeeder.js
node absprevistesSeeder.js
node absnoprevistesSeeder.js
node baixesmediquesSeeder.js
node sortidescurricularsSeeder.js
```
### Cridar tots els seeders
```sh
cd dataSeeders
chmod +x seeder.sh
./seeder.sh
```
## Testing

### Cridar tots els tests
```sh
npm test
mocha test
```
## Usuaris de prova

#### Administrador:

Email: fusese91@vrj.com
PW: fusese

#### Professors:

Email: gafera90@vrj.com PW: gafera

Email: afjare62@vrj.com PW: afjare
