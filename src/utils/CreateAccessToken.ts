import jwt from 'jsonwebtoken';
import { SessionUser } from '../types';

export const createAccessToken = (data: SessionUser) => {
  return jwt.sign(data, process.env.SECRET, { expiresIn: '90d' });
};
