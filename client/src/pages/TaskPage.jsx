import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await axios.get('/api/tasks');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
