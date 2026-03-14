import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>TrustScore</h1>
      <p style={{ fontSize: "18px", marginBottom: "24px" }}>
        Credit score for the informal economy.
      </p>
      <Link to="/upload">
        <button className="btn-primary">Upload UPI Transactions</button>
      </Link>
    </div>
  );
}

export default Home;