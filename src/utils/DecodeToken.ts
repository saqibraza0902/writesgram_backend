import jwt_decode from "jwt-decode";
import dotenv from "dotenv";
dotenv.config();
export const DecodeToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    return error;
  }
};
