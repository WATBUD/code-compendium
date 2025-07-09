

# Getting Started with Docker Using Node:
1. Create Dockerfile in command prompt
echo. > Dockerfile
# option:
- A: Use docker-compose directlypgo
docker-compose up -d
docker-compose -p golang-container-group up -d
- B: Use Dockerfile Cli
- Place the above Dockerfile in your project's root directory and execute the following command in the terminal to build the Docker image:
docker build -t golang_image .
- After the build completes, you can run the following command to start the container:
docker run -d -p 8080:8080 --name golangContainer golang_image
docker run golang_image
# bash 
docker run -p 8083:8083 -v $PWD:/app --name golangContainer golang_image
- Start the specified images
docker run -it --rm golang:alpine /bin/sh


