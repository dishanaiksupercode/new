export default async function BlogDetailPage({ params }) {
  const { slug } = await params;  // ✅ destructure after await

  const res = await fetch(
    `http://localhost:81/my-site/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { cache: 'no-store' }
  );

  const blogs = await res.json();
  const blog = blogs[0];

  if (!blog) {
    return (
      <main style={{ padding: '2rem' }}>
       
        <h1>Blog not found!</h1>
        <p>Slug received: {slug}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
     
      <h1 dangerouslySetInnerHTML={{ __html: blog.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
    </main>
  );
}