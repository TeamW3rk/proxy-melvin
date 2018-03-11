#!/bin/bash

# install deps
apt-get update
apt-get install -y mongodb-clients
apt-get install -y postgresql-client

# intially sleep 5s to wait for dbs to be ready
sleep 5

# seed mongo
mongorestore --host mongo --db admin /mongo_dump/admin
mongorestore --host mongo --db map_restaurants /mongo_dump/map_restaurants
mongorestore --host mongo --db restaurants /mongo_dump/restaurants
mongorestore --host mongo --db reviewservice /mongo_dump/reviewservice

# pg password
export PGPASSWORD=ebrustej

# seed pg
psql -h pg -U josh -d menus < /pg_dump/menus.sql

# ok
echo "DONE RESTORING MONGO RUNNING NGINX"

# start nginx
nginx -g "daemon off;"
