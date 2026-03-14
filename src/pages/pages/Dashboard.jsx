import { Link } from "react-router-dom";
import { useTrustScore } from "../../context/TrustScoreContext";
import ScoreCard from "../../components/score/ScoreCard";

function Dashboard() {
  const { scoreData } = useTrustScore();

  if (!scoreData) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p style={{ marginBottom: "24px" }}>Your credit overview</p>
        <div
          style={{
            padding: "32px",
            border: "1px dashed #d1d5db",
            borderRadius: "12px",
            background: "#f9fafb",
            maxWidth: "400px",
          }}
        >
          <p style={{ marginBottom: "16px" }}>
            No data yet. Upload your UPI transaction file to calculate your TrustScore.
          </p>
          <Link to="/upload">
            <button className="btn-primary">Upload Transactions</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ marginBottom: "24px" }}>Your credit overview (from uploaded transactions)</p>
      <ScoreCard
        score={scoreData.score}
        risk={scoreData.risk}
        loan={scoreData.loanEligibility}
      />
      {scoreData.summary && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f9fafb",
            borderRadius: "8px",
            maxWidth: "400px",
            fontSize: "14px",
          }}
        >
          <p><strong>Transactions processed:</strong> {scoreData.transactionsCount || scoreData.summary.totalTransactions}</p>
          <p><strong>Total credit:</strong> ₹{scoreData.summary.totalCredit?.toLocaleString()}</p>
          <p><strong>Total debit:</strong> ₹{scoreData.summary.totalDebit?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
