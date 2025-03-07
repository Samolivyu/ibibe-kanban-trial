import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './api/authService';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = ["Select Role", "Tester", "Unity dev", "Back-end", "Front-end", "API dev"];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { name, email, password, role };
    const { success, error } = await authService.register(userData);
    setLoading(false);
    
    if (error) {
      setError(error);
    } else {
      console.log(success);
      navigate("/dashboard");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          Sign Up
        </h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@ibibe.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Role
            </label>
            <select 
              id="role"
              name="role"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            >
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in here</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;