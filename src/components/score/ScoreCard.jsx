function ScoreCard({ score, risk, loan }) {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      width: "280px",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ margin: "0 0 8px", fontSize: "14px", color: "#6b7280" }}>TrustScore</h2>
      <h1 style={{ margin: "0 0 16px", fontSize: "48px", color: "#6366f1" }}>{score}</h1>
      <p><strong>Risk Level:</strong> {risk}</p>
      <p><strong>Loan Eligibility:</strong> ₹{loan?.toLocaleString()}</p>
    </div>
  );
}

export default ScoreCard;