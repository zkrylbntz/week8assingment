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
          <h1 className="bg-purple-300 p-2 text-white text-4xl">
            {review.book_name}
          </h1>
          <h2 className="bg-purple-300 p-2 text-white text-2xl">
            written by: {review.author}
          </h2>
          <h3 className="bg-purple-300 p-2 text-white">
            reviewed by: {review.users_name}
          </h3>
          <div className={reviewStyles.review_container}>
            <div
              id="review_image"
              className="flex flex-row w-1/2 items-center m-4"
            >
              <div className="flex flex-col">
                <p>{review.review}</p>
                <p className="text-2xl mt-4">Rating: {review.rating}</p>
              </div>
              <Image
                className=" m-4 hover:scale-110"
                src={review.image}
                alt=""
                width={200}
                height={300}
              />
              <div className="items-center m-4">
                <h1>Add a comment</h1>
                <form
                  action={handleSubmitComment}
                  className="flex flex-col items-center justify-items-center"
                >
                  <label htmlFor="users_name">Name:</label>
                  <input
                    type="text"
                    name="users_name"
                    id="users_name"
                    placeholder="Your name"
                    required
                  />
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    className="border-2 p-2 border-black"
                    rows={2}
                    cols={20}
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="Your comment"
                    required
                  />
                  <label htmlFor="rating">Rating:</label>
                  <input
                    className="border-2 p-2 border-black"
                    type="number"
                    name="rating"
                    id="rating"
                    required
                    min={1}
                    max={10}
                    width={200}
                  />
                  <button
                    className="border-2 p-2 border-black hover:scale-105 hover:bg-purple-300 hover:text-white"
                    type="submit"
                  >
                    Submit comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h1>Comments</h1>

      {wrangledComments.map((comment) => (
        <div key={comment.id}>
          <h3>reviewed by: {comment.users_name}</h3>
          <p>{comment.comment}</p>
          <p>Rating: {comment.rating}</p>
        </div>
      ))}
    </>
  );
}
