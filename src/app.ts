import compression from "compression";
import cors from "cors";
import express, { Request as ExRequest, Response as ExResponse } from "express";
import flash from "express-flash";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import routes from "./routes";

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(compression());
app.use(express.json());
app.use(cors());

app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

app.use(flash());

app.use(routes);

RegisterRoutes(app);

export default app;
