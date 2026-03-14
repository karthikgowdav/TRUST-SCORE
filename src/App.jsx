import Navbar from "./components/layout/layout/Navbar";
import Sidebar from "./components/layout/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <div>

      <Navbar />

      <div className="app-layout">
        <Sidebar />
        <div className="page-content">
          <AppRoutes />
        </div>
      </div>

    </div>
  );
}

export default App;