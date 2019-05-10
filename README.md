# Sherlock
Notes
* Angular client and express server will be served from dedicated docker container.
* Docker compose yaml file will help to run these both container
* Server and Client code will be served from container ports are 3000 and 4200 respectively.

We can access both containers from host machine using below url once after running docker-compose up.
Angular client = http://localhost:4200
Express Server = http://localhost:3000
