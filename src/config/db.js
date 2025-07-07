import { Pool } from "pg";
import { config } from "./env.js";

const pool = new Pool({
  connectionString: config.DB_URL,
});

pool
  .connect()
  .then(() => console.log("Conexión a la base de datos establecida"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

export default pool;
