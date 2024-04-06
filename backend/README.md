# Backend Setup

## Run docker postgres server with pgadmin
``sudo docker-compose up -d``

#### If you want to connect to the database in pg admin
1. Find ip of a docker postgres server ``sudo docker inspect <container_name>``.
2. Look for **NetworkSettings** section then find **Networks** JSON object and copy the value of **IPAddress**.

### How to run migrations
``goose postgres <db_connection_link> up``

**After changing a schema remember to update queries and then generate new golang code**
``sqlc generate``
