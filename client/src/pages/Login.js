import React, { useState } from 'react';
import { MatrixClient, createClient } from 'matrix-js-sdk';
import { useNavigate } from 'react-router-dom';

const Login = ({ setMatrixClient }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const client = createClient({
        baseUrl: 'https://matrix.fightclubwv.org', // Replace with your Matrix server URL
        userId: `@${username}:fightclubwv.org`,
      });

      await client.login('m.login.password', {
        user: username,
        password,
      });

      setMatrixClient(client);
      navigate('/channels');
    } catch (err) {
      setError('Login failed. Check your credentials.');
      console.error(err);
    }
  };

  const handleRegister = async () => {
    setError('');
    try {
      const client = createClient({
        baseUrl: 'https://matrix.fightclubwv.org',
      });

      const response = await client.register({
        username,
        password,
        initial_device_display_name: 'Fight Club WV Matrix Social',
      });

      setMatrixClient(client);
      navigate('/channels');
    } catch (err) {
      setError('Registration failed. Username may be taken.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Login or Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username (Alias)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your alias"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;