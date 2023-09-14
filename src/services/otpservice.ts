import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASS,
  },
});
interface IOTP {
  email: string;
  otp?: Number;
}
export const otpservice = async ({ email, otp }: IOTP) => {
  const info = await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject: 'OTP for Login',
    text: `Your one time OTP for login is ${otp}`,
  });
};
