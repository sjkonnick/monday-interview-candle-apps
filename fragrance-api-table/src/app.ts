import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.sqlite3");
const SqliteGuiNode = require("sqlite-gui-node");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(routes);

SqliteGuiNode(db, 3005).catch((err) => {
  console.error("Error starting the server:", err);
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

export default app;
