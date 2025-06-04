# Class 9 Evaluated Exercise

## Table of Contents

* [Prerequisites](#prerequisites)
* [Local Development](#local-development)
* [Production Deployment](#production-deployment)
* [NPM Scripts](#npm-scripts)
* [Environment Variables](#environment-variables)
  * [Adding new Environment Variables](#adding-new-environment-variables)
* [Add A New Migration](#add-a-new-migration)

## Prerequisites

* Docker Engine >=v20.10.24
* Docker Compose >=v2.17.2
* Nodejs >=v22.14.0

## Local Development

Prepare your local development environment with a single command:

```sh
npm run setup:dev
```

This command will do the following for you:
* Removes and reinstalls the node_modules with `npm run cleanup:dev`
* Stops all previous containers with `npm run setdown:dev`
* Spin up the database with `docker compose --file local-compose.yaml up --detach`
* Generate the types from the Prisma Schema for your database with `npm run prisma:generate:dev`
* Run all database migrations so your database is always on the latest schema with `npm run migrate:dev`

If you want to stop all containers after developing you can run:

```sh
npm run setdown:dev
```

Start the server with:

```sh
npm run start:dev
```

You can now visit [http://localhost:5000/ping](http://localhost:5000/ping) and start developing.

## Production Deployment

Start the application in production with:

```sh
docker compose up --build
```

This command will spin up:
* the database
* run run the database migrations
* start the web app that can communicate with the database on [http://localhost:5000/ping](http://localhost:5000/ping]

## NPM Scripts

* `npm run build`: will transpile the typescript app to javascript executable by nodejs
* `npm run start`: will start the server found in the `dist` folder
* `npm run migrate`: will start the migrations
* `npm run prisma:generate`: will create the types for the database interactions (create, update, delete, etc, ...)
* `npm run start:dev`: will start the server with nodemon that watches for changes in the code
* `npm run migrate:dev`: will start the migrations in development mode
* `npm run prisma:generate:dev`: will create the types for the database interactions in development mode (create, update, delete, etc, ...)
* `npm run setup:dev`: will prepare and setup your local environment with a single command
* `npm run setdown:dev`: will stop all running development containers
* `npm run cleanup:dev`: will remove and reinstall all node_modules

## Environment Variables

We use `dotenv-cli` to pass the environment variables to a command, like:

```sh
dotenv -e .env -- npx prisma migrate deploy
```

### Adding new Environment Variables

For local development modify the `.env.local`file and for production the `.env` file, like:

```txt
# commments
MY_NEW_VARIABLE="my-new-value"
```

## Add a new Migration

Modify the `prisma.schema` in `app/database/prisma/prisma.schema`, like:

```prisma
model SomeNewModel {
  // add your table fields
}
```

and run `npm run migrate`.
