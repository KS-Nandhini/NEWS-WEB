import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CitizenLogin from "./pages/CitizenLogin";
import CitizenSignup from "./pages/CitizenSignup";
import Upload from "./pages/Upload";
import MediaDashboard from "./pages/MediaDashboard";
import Navbar from "./components/Navbar";
import MediaLogin from "./pages/MediaLogin";
import LoginPage from "./pages/Login";
import MediaSignup from "./pages/MediaSignup";
import UserDashboard from "./pages/UserDashboard";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 🌐 Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 👤 Citizen */}
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/citizen-signup" element={<CitizenSignup />} />
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* ✅ MAIN */}
        <Route path="/upload" element={<Upload />} /> {/* upload page */}

        {/* 📰 Media */}
        <Route path="/media-login" element={<MediaLogin />} />
        <Route path="/media-signup" element={<MediaSignup />} />
        <Route path="/media-dashboard" element={<MediaDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;