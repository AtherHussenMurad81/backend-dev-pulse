import express, { type Application } from "express";
import { authRoute } from "./api/routes/auth.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(" onek pera diso miya tmi");
});

app.use("/api/auth", authRoute);
export default app;
