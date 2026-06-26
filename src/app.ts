import express, { type Application } from "express";
import { authRoute } from "./api/routes/auth.route";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(express.json());

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send(" onek pera diso miya tmi");
});

app.use("/api/auth", authRoute);
export default app;
