import mongoose from 'mongoose'
export interface ISubscribe {
  email: string
}
const SubscribeModel = new mongoose.Schema<ISubscribe>(
  {
    email: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Subscribe = mongoose.model<ISubscribe>('subscribe', SubscribeModel)
export default Subscribe
