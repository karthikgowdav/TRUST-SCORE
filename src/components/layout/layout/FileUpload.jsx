import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrustScore } from "../../../context/TrustScoreContext";
import { parseFile } from "../../../utils/transactionParser";
import { calculateTrustScore } from "../../../utils/trustScoreCalculator";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateScoreData } = useTrustScore();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const processFile = async () => {
    if (!file) {
      setStatus("Please select a CSV file first.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const transactions = await parseFile(file);
      if (transactions.length === 0) {
        setStatus("No valid transactions found. Check your file format.");
        return;
      }
      const result = calculateTrustScore(transactions);
      updateScoreData({
        ...result,
        transactionsCount: transactions.length,
        processedAt: new Date().toISOString(),
      });
      setStatus(`Success! Processed ${transactions.length} transactions. Your TrustScore: ${result.score}`);
      navigate("/dashboard");
    } catch (err) {
      setStatus(err.message || "Failed to process file. Use a valid CSV with Date, Debit, Credit columns.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px" }}>
      <h2 style={{ marginBottom: "8px" }}>Upload UPI Transaction File</h2>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>
        Upload a CSV export of your bank/UPI transactions. Expected columns: Date, Narration/Description, Debit, Credit
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv"
        style={{ display: "block", marginBottom: "12px" }}
      />
      <button className="btn-primary" onClick={processFile} disabled={loading}>
        {loading ? "Processing..." : "Process & Calculate Score"}
      </button>
      {status && (
        <p
          style={{
            marginTop: "12px",
            color: status.includes("Success") ? "#059669" : "#dc2626",
            fontSize: "14px",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
