async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/projects?_embed`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return []; // ✅ won't crash Vercel build
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Projects</h1>
      {projects.length === 0 && <p>No projects found.</p>}
      {projects.map((project) => (
        <div key={project.id} style={{ marginBottom: '1.5rem' }}>
          <h2>{project.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
        </div>
      ))}
    </main>
  );
}