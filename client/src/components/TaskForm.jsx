import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('not started');
  const [owner, setOwner] = useState('');
  const [project, setProject] = useState('');
  const [owners, setOwners] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUsersAndProjects = async () => {
      const usersData = await axios.get('/api/users');
      const projectsData = await axios.get('/api/projects');
      setOwners(usersData.data);
      setProjects(projectsData.data);
    };
    fetchUsersAndProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', { description, dueDate, status, owner, project });
      fetchTasks();
      setDescription('');
      setDueDate('');
      setStatus('not started');
      setOwner('');
      setProject('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="not started">Not Started</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Owner</label>
        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          <option value="">Select owner</option>
          {owners.map(owner => (
            <option key={owner._id} value={owner._id}>{owner.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Project</label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">Select project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
