import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { jwtAuthentication } from "./middlewares/jwt.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
// app.use("/api/privado");

app.get("/api/privado", jwtAuthentication, (req, res) => {
  res.json({ mensaje: "Acceso concedido", token: req.token });
});

app.listen(config.PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${config.PORT}`);
});
