import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const reviewScheme = Schema(
  {
    product_id: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Review = model('Review', reviewScheme);

export default Review;
