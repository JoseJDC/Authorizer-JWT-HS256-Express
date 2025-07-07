import { verifyToken } from "../utils/jwt.js";

const jwtAuthentication = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "Token faltante o inválido" });

  const token = header.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.token = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export { jwtAuthentication };
