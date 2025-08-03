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

app.get("/api/privado", jwtAuthentication, (req, res) => {
  res.json({ message: "Acceso concedido", token: req.token });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Recurso no encontrado",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Error interno al procesar la información" });
});

app.listen(config.PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${config.PORT}`);
});
