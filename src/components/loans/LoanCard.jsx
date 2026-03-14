function LoanCard({ bank, amount, interest, disabled }) {
  return (
    <div style={{
      padding: "24px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      width: "280px",
      background: disabled ? "#f9fafb" : "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      opacity: disabled ? 0.8 : 1,
    }}>
      <h3 style={{ margin: "0 0 12px" }}>{bank}</h3>
      {!disabled && (
        <>
          <p><strong>Amount:</strong> ₹{amount?.toLocaleString()}</p>
          <p><strong>Interest:</strong> {interest}% p.a.</p>
          <button className="btn-primary" style={{ marginTop: "12px", width: "100%" }}>Apply</button>
        </>
      )}
    </div>
  );
}

export default LoanCard;
