import express, { type Application, type NextFunction, type Request, type Response } from "express";
import cors from "cors";

import config from "./config/config";
import { sendSuccesResponse } from "./utils";
import routerAuth from "./app/auth/auth-router";

export class Server {
  app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set("port", config.PORT);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use((req: Request, _: Response, next: NextFunction) => {
      console.log("🏈 Solicitud recibida:", req.method, req.url);
      console.log("🏈 Solicitud recibida:", req.body);
      next();
    });
  }

  private routes() {
    this.app.use("/images", express.static("public"));
    this.app.use("/auth", routerAuth);
    // this.app.use("/roles", routerRoles);
    this.app.get("/", (_, res) => {
      sendSuccesResponse(res, 200, "Bienvenido a la API");
    });
  }

  async listen(): Promise<void> {
    this.app.listen(this.app.get("port"));
    console.log("Servidor inicializado - Puerto:", this.app.get("port"));
  }
}

export default Server;