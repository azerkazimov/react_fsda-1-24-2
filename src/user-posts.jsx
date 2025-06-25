export default function UserPost({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      ))}
    </div>
  );
}
