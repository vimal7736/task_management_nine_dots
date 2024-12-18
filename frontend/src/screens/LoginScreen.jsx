import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/features/auth/userApislice';
import { setCredentials } from '../slices/features/auth/authSlice';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customToastStyle = (type) => {
  if (type === 'success') {
    return {
      background: 'linear-gradient(to right, #6a1b9a, #4e148c, #212121)', 
      color: 'white',
    };
  }
  return {
    background: 'linear-gradient(to right, #e53935, #b71c1c)', 
    color: 'white',
  };
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/tasks');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/task');
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Error Adding Task", { style: customToastStyle('err') });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-600 to-purple-950 flex items-center justify-center py-8 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg relative z-10">
        <h1 className="text-2xl font-bold text-center text-gray-500 mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-950"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-black disabled:opacity-50 transition duration-300"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>


        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            New here?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
