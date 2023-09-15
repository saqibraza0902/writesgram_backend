import { Response, Request } from 'express';
import Users from '../modals/User.modal';
import { createHashPassword } from '../utils/CreateHashPassword';
import { comparePassword } from '../utils/CompareHashPassword';
import { createAccessToken } from '../utils/CreateAccessToken';
import { loginValidator } from '../validators/Users.validators';
import OTP from '../modals/OTP.mdoal';
import { otpservice } from '../services/otpservice';
import Contact from '../modals/Contact.modal';
import { contactservice } from '../services/contactservice';

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, phone, country, city, email, password } = req.body;
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
      const user = await Users.findById(dbUser._id);
      const returneduser = {
        id: user._id,
        city: user.city,
        country: user.country,
        email: user.email,
        name: user.name,
        phone: user.phone,
        verified: user.verified,
      };
      return res.status(201).json({ token, user: returneduser });
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
    const user = await Users.findById(id);
    const returneduser = {
      id: user._id,
      city: user.city,
      country: user.country,
      email: user.email,
      name: user.name,
      phone: user.phone,
      verified: user.verified,
    };
    return res.status(201).json({ token, user: returneduser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const ContactUs = async (req: Request, res: Response) => {
  try {
    const { email, subject, msg } = req.body;
    if (email && subject && msg) {
      const newcontact = new Contact({
        email,
        subject,
        msg,
      });
      await newcontact.save();
      contactservice({ email, subject, msg });
      return res.status(200).json({ message: 'Message has been send' });
    }
    return res.status(400).json({ message: 'Please fill the fields' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const UpdateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, country, city } = req.body;
    const { id } = req.query;
    console.log(id, name, email, country, city);
    const UpdateUser = await Users.findByIdAndUpdate(
      { _id: id },
      { name: name, email: email, country: country, city: city }
    );
    if (UpdateUser) {
      return res.status(201).json({ message: 'Profile Updated Successfully' });
    }
    return res.status(400).json({ message: 'Error Updating Profile' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { oldpassword, newpassword, confirmnewpassword } = req.body;
    const { id } = req.query;
    const user = await Users.findById(id);
    const isPasswordOkay = await comparePassword(user.password, oldpassword);
    if (!isPasswordOkay) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }
    if (newpassword !== confirmnewpassword) {
      return res.status(400).json({
        message: 'New password and confirm new password should be same',
      });
    }
    const hashpassword = await createHashPassword(confirmnewpassword);
    await Users.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.status(200).json({ message: 'Password updated sucessfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
