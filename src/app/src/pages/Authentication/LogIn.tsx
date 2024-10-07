import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginProps {
  setLoading: (loading: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoading }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  /*const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    const { username, password } = values;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password');
      }

      navigate('/dashboard');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };*/
  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    const { username, password } = values;

    // Hardcoded dummy credentials check
    if (username === '111' && password === '111') {
      navigate('/dashboard');
    } else {
      setLoginError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Welcome Back</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center">
                  <Field type="checkbox" className="form-checkbox text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline font-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
