const schemaValidator = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => {
        if (err.code === "unrecognized_keys") {
          return `Campo no permitido: ${err.keys.join(", ")}`;
        }

        return err.message;
      });
      
      return res.status(400).json({
        message: "Error al validar los datos",
        errors,
      });
    }

    next();
  };
};

export { schemaValidator };
