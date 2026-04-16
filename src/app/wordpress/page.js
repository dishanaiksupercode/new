async function getPages() {
  const res = await fetch(
    'http://localhost:81/my-site/wp-json/wp/v2/pages'
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