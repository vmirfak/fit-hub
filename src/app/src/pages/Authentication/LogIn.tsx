import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setLoading: (loading: boolean) => void; // Accept setLoading prop
}

const Login: React.FC<LoginProps> = ({ setLoading }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true); // Trigger loading state when login is clicked

    // Simulate an API call or loading delay
    setTimeout(() => {
      setLoading(false); // Stop the loader after the delay
      navigate('/dashboard'); // Redirect to the dashboard route
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
