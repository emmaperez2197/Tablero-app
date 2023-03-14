# Tablero-app
Simular un tablero de jira

  API TABLERO


Esta api se encarga de simular un tablero jira donde se consigue crear, modificar y asignar tickets para los usuarios registrados.

       SERVICIOS DE LA ENTIDAD USUARIO
POST   “/api/user/register”
Este servicio se encarga  de enviar un email a la casilla del usuario para que posteriormente sea confirmado su registro

POST “/api/user/confirmRegister/{token}”
Este servicio se encarga de confirmar el registro del usuario que llega vía email

  POST  “/api/user/login”
   Este servicio se encarga de loguear al usuario

  POST  “/api/user/recoverPassword”
   Este servicio se encarga de enviar un email a la casilla del usuario    para que pueda recuperar su contraseña olvidada

  POST  “api/user/confirmPassword/”
Este servicio se encarga de confirmar la nueva contraseña del usuario que modificó via email

 PUT   “api/user/changesPassword ”
Este servicio le permite al usuario cambiar su contraseña

 
    

            
           SERVICIOS DE LA ENTIDAD COLUMNA
POST “api/colum/create”
Este servicio se encarga de crear una columna para ser asignada a un tablero
PUT  “api/colum/addTicket/{idColum}”
Este servicio se encarga de mover el ticket entre columnas

                 SERVICIOS DE LA ENTIDAD TICKET

POST “/api/ticket”
Este servicio se encarga de crear un ticket

 GET “api/ticket/get”
Este servicio se encarga de volver todos los tickets creados, con los datos del informante y la columna a la que pertenece


                        SERVICIOS DE LA ENTIDAD TABLERO

POST  “api/board/create”
Este servicio se encarga de crear un nuevo tab

           Tecnologias usadas:
Node.js
MongoDB
 Docker





Docker Compose:
Este docker compose se encarga de construir la imagen de node.js y levantar dos contenedores, uno con el proyecto y otro con la base de datos, donde se utilizó mongodb. También se creó una red para que los contenedores estén comunicados.
Para levantar y buildear el docker, basta con el comando “docker compose up”

versión: '3.7'


services:
 board:
   container_name: board
   env_file: ./.env
   restart: unless-stopped
   image: node
   volumes:
     - './:/app:delegated'
   command: /bin/sh -c "npm install; node server.js"
   working_dir: /app
   ports:
     - "7777:7777"
   networks:
     my-network:
       aliases:
         - board-app
   depends_on:
     - database


 database:
   container_name: mongodb
   image: mongo
   restart: always
   volumes:
     - './data:/data/db'
   ports:
     - '27018:27017'
   networks:
     my-network:
       aliases:
         - db


networks:
 my-network:
   driver: bridge

