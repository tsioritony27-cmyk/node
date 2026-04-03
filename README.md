# Backend NestJS — Visiteurs

Backend NestJS (SQLite) pour gérer la table `visiteur` et exposer :
- CRUD visiteurs (ajout, liste, mise à jour, suppression)
- Calcul du `tarif` = `nombreJours * tarifJournalier` côté serveur
- Bilan (total / min / max) + données prêtes pour histogramme/camembert

## Project setup

```bash
$ npm install
```

## API (principaux endpoints)

Base URL par défaut : `http://localhost:3000`

- **POST** `/visiteurs`
  - Body:
    - `numeroVisiteur` (number)
    - `nom` (string)
    - `nombreJours` (number)
    - `tarifJournalier` (number)
  - Réponse : `{ success, message, data? }`

- **GET** `/visiteurs`
  - Réponse : liste avec `tarif` calculé :
    - `numeroVisiteur, nom, nombreJours, tarifJournalier, tarif`

- **PATCH** `/visiteurs/:numeroVisiteur`
  - Body : champs partiels (ex : `{ "nombreJours": 5 }`)
  - Réponse : `{ success, message, data? }`

- **DELETE** `/visiteurs/:numeroVisiteur`
  - Réponse : `{ success, message }`

- **GET** `/visiteurs/bilan`
  - Réponse :
    - `total`: somme des tarifs
    - `min`: tarif minimal (ou `null` si aucun visiteur)
    - `max`: tarif maximal (ou `null` si aucun visiteur)
    - `items` : `[{ numeroVisiteur, nom, tarif }]` (directement exploitable pour graphe)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

- La base SQLite est stockée localement (fichier `data.sqlite`) et n’est pas versionnée.
