import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";

// We need some navigation
// We need query string to sort the data asc and desc
//! Remember the metadata
export function generateMetadata() {
  return {
    title: `Reviews`,
    description: `Looking for a new book to read? Look no further!`,
  };
}

export default async function ReviewsPage({ searchParams }) {
  const reviews = await db.query(`SELECT * FROM reviews`);
  const wrangledReviews = reviews.rows;
  // Here I need to get the posts from the db
  if (searchParams.sort === "desc") {
    wrangledReviews.reverse();
  }
  return (
    <>
      <div className="bg-purple-300 p-2 text-white">
        <h1 className="text-3xl flex flex-col items-center">Reviews </h1>
        <p className=" flex flex-col items-center">
          Pick a book, click to view, read a review, lets start a conversation!
        </p>
      </div>
      <div>
        <p>Sort by - </p>
        <Link href="/reviews?sort=asc">Ascending / </Link>
        <Link href="/reviews?sort=desc">Descending</Link>
      </div>
      <div className="flex flex-col items-center gap-12">
        {/* Here I need a list of my posts */}
        {wrangledReviews.map((review) => (
          <div key={review.id}>
            <Link href={`/reviews/${review.id}`}>{review.book_name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
