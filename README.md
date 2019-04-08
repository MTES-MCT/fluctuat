# Fluctuat

[![Travis](https://travis-ci.org/MTES-MCT/fluctuat.svg?branch=master)](https://travis-ci.org/MTES-MCT/fluctuat)

Flucu@t est une plateforme qui permet de créer des lettres de voiture numériques pour le transport fluvial et de les
partager entre les différents acteurs (transporteur, donneur d’ordre, affréteur et responsable du chargement, etc ...).

## Structure

Ce repo contient tous les projets de Fluctu@t :


 - [fluctuat-api](/fluctuat-api): API consommé par le front
 - [fluctuat-web](/fluctuat-web): fluctuat web app

## Développement

Suivre le README de chacun des projets pour la installation et le lancement en mode développement.

## Lancement avec Docker Compose

Seulement la prémière fois, exécuter le script

    ./flucuat-api/scripts/init-config.js

Lancer l'environnement avec docker-compose

    docker-compose up

L'application sera disponible sur l'adresse:

   http://localhost:4200

Utiliser la commande `docker-compose down` pour arreter l'application

### Création des comptes de test

Créez un compte depuis la page http://localhost:4200/inscription pour commencer à utiliser l'application.

Notez que si l'envoie de mail est désactivé (mode debug activé) vous pourrez récupérer les liens de validation en
regardant le contenu des emails sur les logs du container `fluctuat-api`.


## Crédits

### Production

- [La Fabrique Numérique, Ministère de la transition écologique et solidaire](https://www.ecologique-solidaire.gouv.fr/inauguration-fabrique-numerique-lincubateur-des-ministeres-charges-lecologie-et-des-territoires)

### Équipe

- Karl Dupart, intrapreneur
- Sebastien Jallot, coach
- [Elias Boukamza](https://github.com/eboukamza), développeur


## Licence

[AGPL 3 ou plus récent](https://spdx.org/licenses/AGPL-3.0-or-later.html)
