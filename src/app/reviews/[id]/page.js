// We need some navigation
// We need to use params to render data dynamically
//!Remember the metadata

export default function IDPage() {
  // Here I need to get my posts from the db filtering by id (WHERE id = ${params.id})
  // Here I need to handle the submit for the comments form
  return (
    <>
      <h1>Dynamic router for each individual post</h1>
      {/* Here I need to display an individual post and relevant data */}
      {/* Here I will display a form with inputs that are connected to the comments table columns in my db */}
    </>
  );
}
