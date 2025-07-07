import authService from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default { login };
