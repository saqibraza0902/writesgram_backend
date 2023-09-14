import { Response, Request } from 'express';
import Users from '../modals/User.modal';
import { createHashPassword } from '../utils/CreateHashPassword';
import { comparePassword } from '../utils/CompareHashPassword';
import { createAccessToken } from '../utils/CreateAccessToken';
import { loginValidator } from '../validators/Users.validators';
import OTP from '../modals/OTP.mdoal';
import { otpservice } from '../services/otpservice';

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, phone, country, city, email, password } = req.body;
    console.log(name, phone, country, city, email, password);
    const isExist = await Users.findOne({ email: email });
    if (isExist) {
      return res.status(409).json({ message: 'User already exist' });
    }
    const hashpassword = await createHashPassword(password);
    const newuser = new Users({
      name,
      phone,
      country,
      city,
      email,
      password: hashpassword,
    });
    if (newuser) {
      newuser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = await loginValidator.validate(req.body);
    const dbUser = await Users.findOne({ email });
    if (!dbUser) {
      return res.status(404).json({ message: 'Incorrect credentials' });
    }
    const isPasswordOkay = await comparePassword(dbUser.password, password);
    if (!isPasswordOkay) {
      return res.status(401).json({ messsage: 'Incorrect credentials' });
    }
    const isVerifed = await Users.findOne({ email: email });
    if (isVerifed.verified) {
      const token = createAccessToken({
        _id: String(dbUser._id),
      });
      return res.status(201).json({ token });
    }
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    let otpData = new OTP({ user: dbUser._id, code: otpCode });
    const otp = Number(JSON.stringify(otpCode));
    await otpData.save();
    otpservice({ email, otp });
    return res.status(201).json({ verified: false, id: dbUser._id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const VerifyOtp = async (req: Request, res: Response) => {
  try {
    const { id, otp } = req.body;
    const check = await OTP.findOne({ code: otp, user: id });
    if (!check) {
      return res.status(400).json({ message: 'Invalid Otp' });
    }
    const token = createAccessToken({
      _id: String(id),
    });
    await Users.findByIdAndUpdate({ _id: id }, { verified: true });
    await OTP.deleteMany({ user: id });
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
