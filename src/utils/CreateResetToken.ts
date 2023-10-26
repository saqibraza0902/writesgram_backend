import jwt from "jsonwebtoken";
import { SessionUser } from "../types";

export const CreateResetToken = (data: SessionUser) => {
  return jwt.sign(data, process.env.SECRET, { expiresIn: "10m" });
};
