import { Routes, Route, NavLink } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import DashboardPage from "./pages/DashboardPage";
import AddApplicationPage from "./pages/AddApplicationPage";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white border-shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Application Tracker
          </h1>
          <nav className="flex gap-6">
            <NavLink className={navClass} to="/" end>
              Dashboard
            </NavLink>
            <NavLink className={navClass} to="/applications">
              Application List
            </NavLink>
            <NavLink className={navClass} to="/add">
              Add Application
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/add" element={<AddApplicationPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
