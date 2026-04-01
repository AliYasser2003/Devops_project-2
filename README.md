DevOps Project 2 --Multi Container Application
*************************************************
This project demonstrates a containerized full-stack application using Docker Compose.


Architecture
***************
Nginx (Reverse Proxy & Frontend)
Node.js (Backend API)
PostgreSQL (Database)

User -> Nginx -> Node.js -> PostgreSQL


Access
*********
Frontend: http://localhost
API: http://localhost/users


How It Works
***************
1) User opens the application in the browser (http://localhost)
2) Nginx serves the frontend (HTML page)
3) When user interacts (add/get users), frontend sends API requests
4) Nginx forwards API requests to Node.js backend
5) Node.js processes the request and communicates with PostgreSQL which stores data

FINAL:
This project helped me gain hands-on experience with:
1) build and run multi-container applications using Docker Compose
2) how containers communicate using docker networks
3) connect a backend application to a database inside containers
4) Also i learnt in it to debug container issues using:
     (docker ps), (docker logs), (docker inspect)
