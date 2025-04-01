import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="text-lg font-bold">Face Attendance</h1>
      <div>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/attendance">Attendance</Link>
      </div>
    </nav>
  );
}

export default Navbar;
