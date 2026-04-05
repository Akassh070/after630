'use server';

import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import { revalidatePath } from 'next/cache';

export async function submitReview(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get('name') as string || 'Anonymous';
    const eventName = formData.get('eventName') as string;
    const rating = parseInt(formData.get('rating') as string, 10);
    const text = formData.get('text') as string;

    if (!eventName || !rating || !text) {
      return { success: false, message: 'All fields are required.' };
    }

    const newReview = new Review({
      name,
      eventName,
      rating,
      text,
      isApproved: false, // Manual approval required
    });

    await newReview.save();

    return { success: true, message: 'Review submitted successfully! It will appear once approved.' };
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return { success: false, message: 'Failed to submit review. Please try again later.' };
  }
}

export async function getApprovedReviews() {
  try {
    await dbConnect();
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
    
    return JSON.parse(JSON.stringify(reviews)); // serialize for client
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}
