# Matelas_Co
il s'agit d'une application qui permettra de gérer le stock d'une petite boutique de vente de matelas


🛠️ Prérequis
Avant de commencer, assure-toi d’avoir :

Node.js installé

PostgreSQL installé et en cours d’exécution

Un projet Node.js initialisé (npm init -y)

Les packages nécessaires installés

 Installation des dépendances
```npm install sequelize pg pg-hstore```
```npm install --save-dev sequelize-cli```

Créer le fichier config/config.json
```{```
 ``` "development": {```
    ```"username": "postgres",```
    ```"password": "ton_mot_de_passe",```
    ```"database": "stock_matelas",```
    ```"host": "127.0.0.1",```
    ```"dialect": "postgres"```
  ```}```
```}```

 Initialisation de Sequelize
 ```npx sequelize-cli init```

 Création de la base de données

```npx sequelize-cli db:create```

Exécution des migrations

```npx sequelize-cli db:migrate```"