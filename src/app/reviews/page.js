import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";

// We need some navigation
// We need query string to sort the data asc and desc
//! Remember the metadata

export default async function ReviewsPage({ searchParams }) {
  const reviews = await db.query(`SELECT * FROM reviews`);
  const wrangledReviews = reviews.rows;
  // Here I need to get the posts from the db
  if (searchParams.sort === "desc") {
    wrangledReviews.reverse();
  }
  return (
    <>
      <h1>Reviews Page</h1>
      <Link href="/reviews?sort=asc">Sort ascending</Link>
      <Link href="/reviews?sort=desc">Sort descending</Link>

      {/* Here I need a list of my posts */}
      {wrangledReviews.map((review) => (
        <div key={review.id}>
          <Link href={`/reviews/${review.id}`}>{review.book_name}</Link>
        </div>
      ))}
    </>
  );
}
