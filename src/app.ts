import express, { type Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(" onek pera diso miya tmi");
});
export default app;
