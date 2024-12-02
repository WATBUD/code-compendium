- Start the specified images
docker run -it --rm node:20.11.1-slim /bin/bash

# 構建 Docker 映像：
docker build -t mai_today .
# 運行 Docker 容器：
docker run -d -p 8080:8080 --name mai_today_container mai_today


# Run the following command in Docker Quickstart Terminal or Windows PowerShell to execute the script:
bash sh_FileName.sh






- docker network

Commands:
  connect     Connect a container to a network
  disconnect  Disconnect a container from a network
 # Create a network
- docker network create custom_network     
- docker network create --subnet=172.18.0.0/16 custom_subnet_network

#   Remove one or more networks 
- docker network rm custom_subnet_network   
#  List networks              
- docker network ls    
#  Display detailed information on one or more networks             
- docker network inspect host      
- docker network inspect bridge  
- docker network inspect custom_subnet_network   


# View the IP addresses of all running containers
- bash
- docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)

