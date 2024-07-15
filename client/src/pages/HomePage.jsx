import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <h1>Welcome to Task Tracker</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login or register</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
