import express from "express";
import { sequelize } from "./config/database";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Database synced!");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });
