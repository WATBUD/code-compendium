# Getting Started with Docker Using Node:
1. Create Dockerfile in command prompt
echo. > Dockerfile
- Place the above Dockerfile in your project's root directory and execute the following command in the terminal to build the Docker image:
docker build -t node_express_backend .
- ----------------option:----------------
# A: Use docker-compose directly
docker-compose up -d

docker-compose -p golang-container-group up -d
# B: Use Dockerfile Cli
- After the build completes, you can run the following command to start the container:

normal 
docker run -p 9421:9421 --name NodeServer node_express_backend --legacy-watch

bash 
docker run -p 9421:9421 -v $PWD:/app --name NodeServer node_express_backend 

normal 
docker run -p 9421:9421 --name NodeServer node_express_backend --legacy-watch

bash 
docker run -p 9421:9421 -v $PWD:/app --name NodeServer node_express_backend 

windows cmd 
docker run -p 9421:9421 -v %CD%:/app --name NodeServer node_express_backend npm start -- --legacy-watch


- Start the specified images
docker run -it --rm node:20.11.1-slim /bin/bash

docker run -it --rm node:20.11.1-slim Node.js 的交互式终端


