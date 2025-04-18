This is my own solution to CodeGeeks test task.

To run application follow next steps:

1. download repository (clone or download zip file)
2. install dependencies on frontend and backend by open terminal in each folders and run npm install.
3. open your database app, i use pgAdmin 4, create database with custom name
4. on backend create .env file and insert there this part of variables and input youd db name and password

APP_PORT=5000
APP_HOST="localhost"

POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USER="postgres"
POSTGRES_PASSWORD=""
POSTGRES_DB=""

5.  run next command in backend folder terminal npm run typeorm -- migration:run

6.  start backend with command npm start:dev

7.  go to frontend folder and run it with command npm run dev

Now you are ready to go :)
