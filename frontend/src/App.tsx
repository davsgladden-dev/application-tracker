import { Routes, Route, Link } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import DashboardPage from "./pages/DashboardPage";
import AddApplicationPage from "./pages/AddApplicationPage";

function App() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <>
        <h1 className="text-3xl font-bold text-blue-600 m-6">
          Application Tracker
        </h1>
        <nav className="flex gap-4 mb-8">
          <Link className="text-blue-600 hover:underline" to="/">
            Dashboard
          </Link>
          <Link className="text-blue-600 hover:underline" to="/applications">
            Application List
          </Link>
          <Link className="text-blue-600 hover:underline" to="/add">
            Add Application
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/add" element={<AddApplicationPage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
