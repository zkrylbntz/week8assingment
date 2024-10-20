import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// Some navigation here
//!Remember the metadata

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
      `INSERT INTO reviews (users_name, book_name, author, review, rating, image) VALUES ($1, $2, $3, $4, $5, $6)`,
      [users_name, book_name, author, review, rating, image]
    );
    revalidatePath("/reviews");
    redirect("/reviews");
  }
  // Here I need to handle the submit of the posts form
  return (
    <>
      <h1>A form to add a new book review</h1>
      {/* Here I need a form to collect data from the user */}
      <form action={handleSubmitPost} className="flex flex-col items-center">
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
        <input
          type="textarea"
          name="review"
          id="review"
          placeholder="Your review"
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
        <label htmlFor="image">Image URL:</label>
        <input type="text" name="image" id="image" placeholder="Image URL" />
        <button type="submit">Submit review</button>
      </form>
    </>
  );
}
