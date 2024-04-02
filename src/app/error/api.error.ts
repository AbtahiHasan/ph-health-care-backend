import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
    } catch (error) {
      next(error);
    }
  };
};
export default validateRequest;
