// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; // Optional
import ProtectedRoute from "./routes/ProtectedRoute";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminDashboard from "./pages/admin-dashboard/AdminDasboard";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/booking-status" element={<ConfirmationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
