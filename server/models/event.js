import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const eventSchema = Schema(
  {
    title: { type: String },
    description: { type: String },
    redirectUrl: { type: String },
    image: { type: Buffer },
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

export default Event;
