require('dotenv').config({path: __dirname + '/../.env'});

import express from 'express';
import usersRoute from "./routes/users.route";
import statusRoute from "./routes/status.route";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import jwtAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware";

const app = express();

// Application Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers Settings
app.use(statusRoute);                   //Status
app.use(authorizationRoute);            //Authentication

app.use(jwtAuthenticationMiddleware);   //Middleware
app.use(usersRoute);                    //Users

// Handlers Errors Settings
app.use(errorHandler);

// Server Port
app.listen(3000, () => {
    console.log("Executing application on port 3000!");
});