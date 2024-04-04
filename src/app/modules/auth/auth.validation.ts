import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const AuthValidations = { loginValidationSchema };
export default AuthValidations;
