FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY public /public
COPY mongo_dump /mongo_dump
COPY pg_dump /pg_dump
COPY ./restore_mongo.sh /scripts/restore_mongo.sh

RUN chmod -R 775 /scripts