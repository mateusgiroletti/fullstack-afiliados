# Fullstack Afiliados

## How to use?

To use the application it is recommended to have docker installed, so it is not necessary to install the database and other utilities found in the docker-compose file.

Clone this project on your favorite dir and change to backend dir:

```console
cd backend
```

Edit the .env.example file to .env and put the necessary environment variables.

Start the dockers containers.

```console
docker-compose up -d
```

Run the command to create the tables in the database

```console
npx prisma generate
```

Run the migrates

```console
npx prisma migrate deploy
```
 
Execute initial setups of prisma and run the migrations

>  This is a challenge by [Coodesh](https://coodesh.com/)
