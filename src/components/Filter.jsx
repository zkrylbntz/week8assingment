export default async function Filter({searchParams}){
    const comments = await response.json();
    if (searchParams.sort === "desc") {
        comments.reverse()
    }
    return(
        <>
        <Link href="{/{params.id}?sort=asc}">Sort ascending</Link> - <Link href="/posts?sort=desc">
          Sort descending
        </Link>
        
        </>
    )
}

export default async function PostsPage({ searchParams }) {

    const comments = await response.json();
  
    // reverse the posts array if the sort parameter is set to descending
    if (searchParams.sort === "desc") {
      posts.reverse();
    }
  
    return (
      <div>
        <h2>Post List</h2>
        <Link href="/posts?sort=asc">Sort ascending</Link> - <Link href="/posts?sort=desc">
          Sort descending
        </Link>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/post/${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }