async function getPages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/posts?_embed`
  );
  const pages = await res.json();
  return pages;
}

export default async function Home() {
  const pages = await getPages();

  return (
    <main>
      <h1>My WordPress Pages</h1>
      {pages.map((page) => (
        <div key={page.id}>
          <h2>{page.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      ))}
    </main>
  );
}