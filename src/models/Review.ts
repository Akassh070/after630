import mongoose, { Schema, model, models } from 'mongoose';

export interface IReview {
  _id: string;
  name: string;
  eventName: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, default: 'Anonymous' },
  eventName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model<IReview>('Review', ReviewSchema);

export default Review;
