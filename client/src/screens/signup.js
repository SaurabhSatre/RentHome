import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../helper/helper.functions.js";
import ToastMessage from "../components/ToastMessage.js";
import { API_BASE } from "../constants.js";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = data.get("name");
      const email = data.get("email");

      if (password !== confirmPassword) {
        setToastMessage("Passwords do not match");
        setSeverity("error");
        setShowToast(true);
        return;
      }

      if (!validateEmail(email)) {
        setToastMessage("Email is not valid!");
        setSeverity("error");
        setShowToast(true);
        return;
      }

      if (!validatePassword(password)) {
        setToastMessage("Password is not valid!");
        setSeverity("error");
        setShowToast(true);
        return;
      }

      const userData = {
        name,
        email,
        password
      };

      //console.log("This is user URL : " , `${process.env.REACT_APP_BACKENDURL}/api/v1/user/signup`);

      const res = await fetch(`${API_BASE}/api/auth/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const response = await res.json();

      //console.log("This is response from server : " , response);

      if (response.success) {
        setToastMessage('Sign up successful!');
        setSeverity('success');
        setShowToast(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setToastMessage(response.message || 'Signup failed!');
        setSeverity('error');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setToastMessage("Something went wrong");
      setSeverity("error");
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight text-center mb-2">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Sign up to get started
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] font-medium"
          >
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-medium hover:text-blue-700 transition-colors underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <ToastMessage
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        severity={severity}
      />
    </div>
  );
};

export default SignUpPage;