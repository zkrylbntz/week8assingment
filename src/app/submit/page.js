import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Some navigation here
//!Remember the metadata
export function generateMetadata() {
  return {
    title: `Submit`,
    description: `Read a good book? Submit it here, lets talk about it!`,
  };
}

export default function Submit() {
  async function handleSubmitPost(formData) {
    "use server";
    const users_name = formData.get("users_name");
    const book_name = formData.get("book_name");
    const author = formData.get("author");
    const review = formData.get("review");
    const rating = formData.get("rating");
    const image = formData.get("image");

    await db.query(
      `INSERT INTO reviews8 (users_name, book_name, author, review, rating, image) VALUES ($1, $2, $3, $4, $5, $6)`,
      [users_name, book_name, author, review, rating, image]
    );
    revalidatePath("/reviews");
    redirect("/reviews");
  }
  // Here I need to handle the submit of the posts form
  return (
    <>
      <div className="bg-purple-300 p-2 text-white">
        <h1 className="text-3xl flex flex-col items-center">Submit</h1>
        <p className=" flex flex-col items-center">
          Read a great book? Let us know all about it here and spread the word!
        </p>
      </div>
      {/* Here I need a form to collect data from the user */}
      <form
        action={handleSubmitPost}
        className="flex flex-col items-center p-4 justify-evenly h-2/5"
      >
        <label htmlFor="users_name">Name:</label>
        <input
          type="text"
          name="users_name"
          id="users_name"
          placeholder="Your name"
          required
        />
        <label htmlFor="book_name">Book title:</label>
        <input
          type="text"
          name="book_name"
          id="book_name"
          placeholder="Book title"
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Author"
          required
        />
        <label htmlFor="review">Review:</label>
        <textarea
          className="border-2 p-2 border-black"
          rows={4}
          cols={40}
          type="textarea"
          name="review"
          id="review"
          placeholder="Your review"
          required
        />
        <label htmlFor="rating">Rating:</label>
        <input
          className="border-2 p-2 border-black"
          type="number"
          name="rating"
          id="rating"
          min={1}
          max={10}
          required
        />
        <label htmlFor="image">Image URL:</label>
        <input type="text" name="image" id="image" placeholder="Image URL" />
        <button
          className="border-2 p-2 border-black hover:scale-105 hover:bg-purple-300 hover:text-white"
          type="submit"
        >
          Submit review
        </button>
      </form>
    </>
  );
}
{
  /* <textarea
rows={4}
cols={40} */
}
