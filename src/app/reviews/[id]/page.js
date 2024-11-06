import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import reviewStyles from "@/app/reviews/[id]/reviews.module.css";

export async function generateMetadata({ params }) {
  const reviews = await db.query(
    `SELECT * FROM reviews8 WHERE id = ${params.id}`
  );
  const wrangledReviews = reviews;
  // //   const result = await fetch(`https://api.vercel.app/pokemon/${params.id}`);
  // const review = await result.json();

  return {
    title: `${reviews.book_name} by ${reviews.author}`,
    description: `This is a book review for ${reviews.book_name} written by ${reviews.author} I hope it inspires you.`,
  };
}

// We need some navigation
// We need to use params to render data dynamically
//!Remember the metadata

export default async function IdPage({ params }) {
  const reviews = await db.query(
    `SELECT * FROM reviews8 WHERE id = ${params.id}`
  );
  const wrangledReviews = reviews.rows;
  // Here I need to get my posts from the db filtering by id (WHERE id = ${params.id})
  // Here I need to handle the submit for the comments form
  async function handleSubmitComment(formData) {
    "use server";
    const users_name = formData.get("users_name");
    const comment = formData.get("comment");
    const rating = formData.get("rating");
    const reviews8_id = params.id;

    await db.query(
      `INSERT INTO comments8(users_name, comment, rating, reviews8_id) VALUES ($1, $2, $3, $4)`,
      [users_name, comment, rating, reviews8_id]
    );
    revalidatePath(`{/reviews/${params.id}`);
    // redirect(`{/reviews/${params.id}`);
  }

  const comments = await db.query(
    `SELECT * FROM comments8 WHERE reviews8_id = ${params.id}`
  );

  const wrangledComments = comments.rows;
  console.log(wrangledComments);

  return (
    <>
      {/* Here I need to display an individual post and relevant data */}
      {/* Here I will display a form with inputs that are connected to the comments table columns in my db */}
      {wrangledReviews.map((review) => (
        <div key={review.id}>
          <h1 className="text-4xl">{review.book_name}</h1>
          <h2 className="text-2xl">written by: {review.author}</h2>
          <h3>reviewed by: {review.users_name}</h3>
          <div
            id="review_container"
            className="flex flex-row w-1/3 items-center m-4"
          >
            <p>{review.review}</p>

            <Image
              className="hover:scale-110"
              src={review.image}
              alt=""
              width={200}
              height={300}
            />
          </div>
          <p className="text-2xl">Rating: {review.rating}</p>
        </div>
      ))}
      <h1>Add a comment</h1>
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
          required
          min={1}
          max={10}
          width={200}
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
