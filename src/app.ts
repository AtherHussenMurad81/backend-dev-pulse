import express, { type Application } from "express";
import { authRoute } from "./api/routes/auth.route";
import cookieParser from "cookie-parser";
import { issueRoute } from "./api/routes/issue.route";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send(" onek pera diso miya tmi");
});

app.use("/api/auth", authRoute);
app.use("/api", issueRoute);
export default app;
