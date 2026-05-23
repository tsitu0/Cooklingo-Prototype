import cors from "cors";
import express from "express";
import recipeRoutes from "./routes/recipeRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/recipes", recipeRoutes);

export default app;
