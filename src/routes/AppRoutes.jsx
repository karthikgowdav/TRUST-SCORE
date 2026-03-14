import { Routes, Route } from "react-router-dom";

import Home from "../pages/pages/Home";
import UploadTransactions from "../pages/pages/UploadTransactions";
import Dashboard from "../pages/pages/Dashboard";
import LoanOffers from "../pages/pages/LoanOffers";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadTransactions />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loans" element={<LoanOffers />} />
    </Routes>
  );
}

export default AppRoutes;