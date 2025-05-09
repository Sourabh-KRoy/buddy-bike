import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/all-services";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginData = await login(email, password);
      console.log("Login response:", loginData);

      if (loginData?.access_token) {
        localStorage.setItem("access_token", loginData.access_token);
        const decoded: any = jwtDecode(loginData.access_token);
        // Store the userId in localStorage
        localStorage.setItem("userId", decoded.sub);
        if (decoded.role === "Admin") {
          navigate("/admin");
        } else if (decoded.role === "User") {
          navigate("/");
        } else {
          alert("Unknown role!");
        }
      }
    } catch (error) {
      alert("Login failed! Please check your email and password.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-8 shadow-lg rounded-lg border border-gray-200 bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
