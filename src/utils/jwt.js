import pkg from "jsonwebtoken";
import { config } from "../config/env.js";
const { sign, verify, decode } = pkg;

export function generateToken(payload) {
  return sign(payload, config.SECURITY_KEY, { expiresIn: "30m" });
}

export function verifyToken(token) {
  return verify(token, config.SECURITY_KEY, { complete: true });
}

export function decodeToken(token) {
  return decode(token);
}
