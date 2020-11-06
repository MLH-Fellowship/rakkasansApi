# Dummy API

This is a Node/Express/Postgres service that allows us to dev comfortable. 

## How to run

This project uses Docker. If you need help setting up / understanding Docker, they have great [documentation](https://docs.docker.com/get-started/).

Once you have Docker installed an running, clone this repo. In the root of the project run:

```
=> docker-compose build
```

You will only have to run this command once (unless we make changes). Now you can get everything started by running:

```
=> docker-compose up 
```

## Persisting Data

Let's say you added some rows to the db while deving and you want to get back to the original state. Simply end the process and run:

```
=> docker-compose down
```

Next time you run `docker-compose up`, it will re-initialize your db. 