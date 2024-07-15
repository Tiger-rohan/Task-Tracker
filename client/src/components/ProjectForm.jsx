import { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = ({ fetchProjects }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [owner, setOwner] = useState('');
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/users');
      setOwners(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/projects', { name, description, startDate, endDate, owner });
      fetchProjects();
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setOwner('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
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
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
