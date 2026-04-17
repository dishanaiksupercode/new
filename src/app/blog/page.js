async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts?_embed`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '2rem' }}>Blogs</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{
            overflow: 'hidden',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}>

            {blog._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
              <img
                src={blog._embedded['wp:featuredmedia'][0].source_url}
                alt={blog.title.rendered}
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '200px', backgroundColor: '#e0e0e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999'
              }}>
                No Image
              </div>
            )}

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '220px' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
                {blog._embedded?.author?.[0]?.name} &nbsp;•&nbsp;
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>

              <a href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: '#000' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                  {blog.title.rendered}
                </h2>
              </a>

              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                {blog.excerpt?.rendered
                  ? blog.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120) + '...'
                  : 'No description available'}
              </p>

              {blog.acf?.tags && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {blog.acf.tags.split(',').map((tag, i) => (
                    <span key={i} style={{
                      padding: '0.25rem 0.75rem', borderRadius: '999px',
                      border: '1px solid #ccc', fontSize: '0.75rem', color: '#444'
                    }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}