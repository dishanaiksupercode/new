async function getProjects() {
  const res = await fetch(
    'http://localhost:81/my-site/wp-json/wp/v2/projects'
  );
  const projects = await res.json();
  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
        </div>
      ))}
    </main>
  );
}