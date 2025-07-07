import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";

const login = async ({ username, password }) => {
  const user = await userRepository.findUserByUsername(username);

  console.log("user", user);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  return generateToken({
    iss: "auth-jwt-express",
    sub: user.username,
    authorities: user.roles,
  });
};

export default { login };
