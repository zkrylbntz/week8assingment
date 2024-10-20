import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// We need some navigation
// We need to use params to render data dynamically
//!Remember the metadata

export default async function IdPage({ params }) {
  const reviews = await db.query(
    `SELECT * FROM reviews WHERE id = ${params.id}`
  );
  const wrangledReviews = reviews.rows;
  // Here I need to get my posts from the db filtering by id (WHERE id = ${params.id})
  // Here I need to handle the submit for the comments form
  async function handleSubmitComment(formData) {
    "use server";
    const users_name = formData.get("users_name");
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    const reviews_id = params.id;

    await db.query(
      `INSERT INTO comments(users_name, comment, rating, reviews_id) VALUES ($1, $2, $3, $4)`,
      [users_name, comment, rating, reviews_id]
    );
    revalidatePath(`{/reviews/${params.id}`);
    // redirect(`{/reviews/${params.id}`);
  }

  const comments = await db.query(
    `SELECT * FROM comments WHERE reviews_id = ${params.id}`
  );

  const wrangledComments = comments.rows;
  console.log(wrangledComments);

  return (
    <>
      <h1>Review</h1>
      {/* Here I need to display an individual post and relevant data */}
      {/* Here I will display a form with inputs that are connected to the comments table columns in my db */}
      {wrangledReviews.map((review) => (
        <div key={review.id}>
          <h1>{review.book_name}</h1>
          <h2>written by: {review.author}</h2>
          <h3>reviewed by: {review.users_name}</h3>
          <p>{review.review}</p>
          <p>{review.rating}</p>
          <Image src={review.image} alt="" width={200} height={300} />
        </div>
      ))}
      <h1>A form to add a comment</h1>
      {/* Here I need a form to collect data from the user */}
      <form action={handleSubmitComment} className="flex flex-col items-center">
        <label htmlFor="users_name">Name:</label>
        <input
          type="text"
          name="users_name"
          id="users_name"
          placeholder="Your name"
          required
        />
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Your comment"
          required
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Rating"
          required
        />
        <button type="submit">Submit comment</button>
      </form>
      <h1>Comments</h1>

      {wrangledComments.map((comment) => (
        <div key={comment.id}>
          <h3>reviewed by: {comment.users_name}</h3>
          <p>{comment.comment}</p>
          <p>{comment.rating}</p>
        </div>
      ))}
    </>
  );
}
