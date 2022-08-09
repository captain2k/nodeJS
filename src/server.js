import express from "express";
import configViewEngine from "./configs/viewEngine";
import { initApiRoute } from "./route/ApiRoute";
import { initWebRoute } from "./route/web";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Config

// Set up view engine
configViewEngine(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// init web route
initWebRoute(app);

// init api route
initApiRoute(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
