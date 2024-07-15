import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const { data } = await axios.get('/api/projects');
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ProjectForm fetchProjects={fetchProjects} />
      <ul>
        {projects.map(project => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
