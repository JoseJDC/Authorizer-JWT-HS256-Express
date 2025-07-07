import z from "zod";

const userSchema = z.object({
  id: z.number().int().positive(),
  username: z.string({ required_error: "Nombre de usuario requerido" }),
  password: z.string({ required_error: "Contraseña requerida" }).min(4),
  authorities: z.array(z.string()),
});

const loginUserSchema = userSchema
  .pick({
    username: true,
    password: true,
  })
  .strict();

export { loginUserSchema };
