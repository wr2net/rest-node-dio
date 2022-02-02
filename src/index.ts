import express, {Request, Response, NextFunction} from 'express';
import usersRoute from "./routes/user.route";
import statusRoute from "./routes/status.route";

const app = express();

// Application Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers Settings
app.use(usersRoute);        //Users
app.use(statusRoute);       //Status

// Server Port
app.listen(3000, () => {
    console.log("Executing application on port 3000!");
});