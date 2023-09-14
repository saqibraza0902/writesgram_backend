import mongoose from 'mongoose';

export interface IContact {
  email: string;
  subject: string;
  msg: string;
}

const ContactModal = new mongoose.Schema<IContact>(
  {
    email: { type: String, required: true },
    subject: { type: String, required: true },
    msg: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model<IContact>('contact', ContactModal, 'contact');
export default Contact;
