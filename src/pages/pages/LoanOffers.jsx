import { Link } from "react-router-dom";
import { useTrustScore } from "../../context/TrustScoreContext";
import { getLoanOffers } from "../../utils/trustScoreCalculator";
import LoanCard from "../../components/loans/LoanCard";

function LoanOffers() {
  const { scoreData } = useTrustScore();

  const offers = scoreData
    ? getLoanOffers(scoreData.score, scoreData.loanEligibility)
    : [{ bank: "Upload transactions to see offers", amount: 0, interest: 0, disabled: true }];

  return (
    <div>
      <h1>Loan Offers</h1>
      <p style={{ marginBottom: "24px" }}>
        {scoreData
          ? `Available offers based on your TrustScore (${scoreData.score})`
          : "Upload your transaction file to see personalized loan offers"}
      </p>
      {!scoreData && (
        <Link to="/upload">
          <button className="btn-primary" style={{ marginBottom: "24px" }}>
            Upload Transactions
          </button>
        </Link>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {offers.map((offer, i) => (
          <LoanCard
            key={i}
            bank={offer.bank}
            amount={offer.amount}
            interest={offer.interest}
            disabled={offer.disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default LoanOffers;
