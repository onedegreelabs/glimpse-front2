#!/bin/sh

cd /home/ubuntu/glimpse-frontend

DOCKER_IMAGE_NAME=client-img

DOCKER_CONTAINER_NAME=client-container

docker system prune -a -f

docker rm -f $(docker ps -qa)

docker build -t ${DOCKER_IMAGE_NAME} .

docker run -d -p 80:3000 -e NODE_ENV=${NODE_ENV} --name ${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME}
