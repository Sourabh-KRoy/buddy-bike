import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/all-services"; // adjust path as needed

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState(""); // use username instead of email
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await signup(username, password);
      alert(res.message); // Show: "User created"
      navigate("/login"); // Redirect to login
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
