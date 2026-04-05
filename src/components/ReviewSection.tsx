import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import ReviewSectionClient from './ReviewSectionClient';

export default async function ReviewSection() {
  // Fetch approved reviews on the server
  let initialReviews = [];
  try {
    await dbConnect();
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    initialReviews = JSON.parse(JSON.stringify(reviews));
  } catch (err) {
    console.error("Failed to fetch reviews", err);
  }

  return <ReviewSectionClient initialReviews={initialReviews} />;
}
