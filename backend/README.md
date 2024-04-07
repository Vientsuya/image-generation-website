# Backend Setup

## Run docker postgres server with pgadmin
``sudo docker-compose up -d``

#### If you want to connect to the database in pg admin
1. Find ip of a docker postgres server ``sudo docker inspect <container_name>``.
2. Look for **NetworkSettings** section then find **Networks** JSON object and copy the value of **IPAddress**.

### How to run migrations
``goose postgres <db_connection_link> up``
``goose postgres <db_connection_link> down``

**To regenerate the most recent migration just use the down command and then up.

**After changing a schema or creating a new query remember to update queries and then generate new golang code**
``sqlc generate``
