import Link from "next/link";
import { db } from "@/utils/dbConnection";

// We need some navigation
// We need query string to sort the data asc and desc
//! Remember the metadata

export default async function ReviewsPage() {
  const reviews = await db.query(`SELECT * FROM reviews`);
  const wrangledReviews = reviews.rows;
  // Here I need to get the posts from the db
  return (
    <>
      <h1>Reviews Page</h1>
      {/* Here I need a list of my posts */}
      {wrangledReviews.map((review) => (
        <div key={review.id}>
          <h1>{review.book_name}</h1>
          <h2>written by: {review.author}</h2>
          <h3>reviewed by: {review.users_name}</h3>
          <p>{review.review}</p>
          <p>{review.rating}</p>
        </div>
      ))}
    </>
  );
}
