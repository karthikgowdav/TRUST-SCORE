import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav style={{
      width: "220px",
      minWidth: "220px",
      background: "#f9fafb",
      borderRight: "1px solid #e5e7eb",
      padding: "20px"
    }}>
      <h3 style={{ margin: "0 0 16px", fontSize: "14px", color: "#6b7280" }}>Menu</h3>
      <div className="sidebar-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/loans">Loan Offers</NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;