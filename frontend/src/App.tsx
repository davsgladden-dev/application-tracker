import { Routes, Route, Link } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import DashboardPage from "./pages/DashboardPage";
import AddApplicationPage from "./pages/AddApplicationPage";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Application Tracker</h1>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/applications">Application List</Link> |{" "}
        <Link to="/add">Add Application</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/add" element={<AddApplicationPage />} />
      </Routes>
    </>
  );
}

export default App;
