# Blogsite with SQL

Similar to the blogsite app form part 4 except this time we use a proper database.

## Postgres database in Docker

The app was developed with a Postgres db in a Docker container that can be run with
```
docker run -d -e DATABASE_PASSWORD=mypassword -p 5433:5432 postgres
```

and the database can be accessed with
```
docker exec -it <container name> psql -U postgres <mypassword>
```
