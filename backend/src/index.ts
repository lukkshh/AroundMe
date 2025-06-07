import express from "express";
import { sequelize } from "./config/database";

import locationRoutes from "./routes/location.routes";

const app = express();

app.use(express.json());

app.use("/api", locationRoutes);

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
