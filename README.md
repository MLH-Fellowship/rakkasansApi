# Dummy API

This is a Node/Express/Postgres service that allows us to dev comfortably.

It's not meant to be used in production (at least at this point). The idea is recreate a realistic enviroment and avoid hardcoding data in the frontend.

As a result, we have tried to make this code as simple as possible but have not spent time making it particularly efficient or extensible.

There needs to be a conversion with the project owner regarding what should eventually happen with the backend.

## How to run

First, install packages:

```
=> npm i
```

This project uses Docker. If you need help setting up / understanding Docker, they have great [documentation](https://docs.docker.com/get-started/).

Once you have Docker installed and running, clone this repo. In the root of the project run:

```
=> docker-compose build
```

You will only have to run this command only once unless you make changes to `.Dockerfile`. If so, just run it agian.

To get everything running, run:

```
=> docker-compose up
```

## Persisting Data

Let's say you added some rows to the db while deving and you want to get back to the original state. Simply end the process and run:

```
=> docker-compose down
```

Next time you run `docker-compose up`, it will re-initialize your db in its original state.

## Seeding the db

`/seed/seed.sql` will be executed by `docker-compose up` only if the database is empty. Otherside, the seed file will be ignored.

Add addtional seed data to the `seed.sql` file.

## Debugging

Here is some techniques that have helped us debug:

1. Look at the logs! Every action for every service will be logged in the tab you ran `docker-compose up`. You can see what endpoints are being used, response code, etc.

2. Use Adminer. Adminer is an interface for dbs. This can help you see how the tables look and gives you a good bird eye's view of the app. Go to `http://localhost:8080/`. Input the following:

   `System`: `PostgreSQL`,

   `Server`: `db`,

   `Username`: `postgres`,

   `Password`: `example`

   Then click on the `rakkasans` database.
