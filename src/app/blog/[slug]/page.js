async function getBlog(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const blogs = await res.json();
    return blogs[0];
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

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
      <a href="/blog">← Back to Blogs</a>
      <h1 dangerouslySetInnerHTML={{ __html: blog.title.rendered }} />

      {blog._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img
          src={blog._embedded['wp:featuredmedia'][0].source_url}
          alt={blog.title.rendered}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} />
    </main>
  );
}