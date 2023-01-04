import errorResponse from "./error-response.js";

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error?.isJoi) {
      console.error("ERROR", error);
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
};

export default validateSchema;
