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
  subject: string;
  msg: string;
}
export const contactservice = async ({ email, subject, msg }: IOTP) => {
  const info = await transporter.sendMail({
    from: email,
    to: process.env.USER,
    subject: `${subject}`,
    text: `The provided email is "${email}" with this subject "${subject}" having this message "${msg}"`,
  });
};
