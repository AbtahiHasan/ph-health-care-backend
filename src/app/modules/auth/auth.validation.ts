import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "refresh token is required",
    }),
  }),
});

const AuthValidations = { loginValidationSchema, refreshTokenValidationSchema };
export default AuthValidations;
