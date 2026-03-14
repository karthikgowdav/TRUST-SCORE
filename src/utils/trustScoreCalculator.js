/**
 * Calculates TrustScore from UPI/bank transactions (client-side)
 * Score range: 300-900 (similar to CIBIL)
 */

export function calculateTrustScore(transactions) {
  if (!transactions || transactions.length === 0) {
    return {
      score: 0,
      risk: "Unknown",
      loanEligibility: 0,
      summary: { totalTransactions: 0, credits: 0, debits: 0, avgCredit: 0, avgDebit: 0 },
    };
  }

  const credits = transactions.filter((t) => t.amount > 0);
  const debits = transactions.filter((t) => t.amount < 0);

  const totalCredit = credits.reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = Math.abs(debits.reduce((sum, t) => sum + t.amount, 0));

  const avgCredit = credits.length ? totalCredit / credits.length : 0;
  const avgDebit = debits.length ? totalDebit / debits.length : 0;

  // Transaction frequency score (more regular = better)
  const frequencyScore = Math.min(100, transactions.length * 2);

  // Income vs expense ratio (savings behavior)
  const incomeExpenseRatio = totalDebit > 0 ? totalCredit / totalDebit : 1.5;
  const ratioScore = Math.min(100, Math.max(0, (incomeExpenseRatio - 0.5) * 80));

  // Regularity: credits per month (if we have dates)
  const monthlyCredits = getMonthlyAverage(credits);
  const regularityScore = Math.min(100, monthlyCredits * 15);

  // Average transaction size (moderate amounts = stable)
  const avgAmount = (totalCredit + totalDebit) / transactions.length;
  const sizeScore = avgAmount > 100 && avgAmount < 100000 ? 80 : 60;

  // Weighted combination
  const rawScore =
    frequencyScore * 0.25 +
    ratioScore * 0.3 +
    regularityScore * 0.25 +
    sizeScore * 0.2;

  // Scale to 300-900
  const score = Math.round(300 + (rawScore / 100) * 600);
  const clampedScore = Math.max(300, Math.min(900, score));

  // Risk level
  let risk = "High";
  if (clampedScore >= 750) risk = "Low";
  else if (clampedScore >= 600) risk = "Medium";

  // Loan eligibility (simplified)
  const loanEligibility = calculateLoanEligibility(clampedScore, totalCredit, totalDebit);

  return {
    score: clampedScore,
    risk,
    loanEligibility,
    summary: {
      totalTransactions: transactions.length,
      credits: credits.length,
      debits: debits.length,
      totalCredit: Math.round(totalCredit),
      totalDebit: Math.round(totalDebit),
      avgCredit: Math.round(avgCredit),
      avgDebit: Math.round(avgDebit),
    },
  };
}

function getMonthlyAverage(credits) {
  const months = new Set();
  credits.forEach((t) => {
    if (t.date) {
      const d = new Date(t.date);
      if (!isNaN(d)) months.add(`${d.getFullYear()}-${d.getMonth()}`);
    }
  });
  return months.size > 0 ? credits.length / months.size : 5;
}

function calculateLoanEligibility(score, totalCredit, totalDebit) {
  const baseByScore = score >= 750 ? 50000 : score >= 600 ? 30000 : score >= 450 ? 15000 : 5000;
  const incomeFactor = totalCredit > 0 ? Math.min(1.5, totalCredit / 20000) : 0.5;
  const eligibility = Math.round(baseByScore * (0.7 + 0.3 * incomeFactor));
  return Math.min(500000, Math.max(5000, eligibility));
}

export function getLoanOffers(score, loanEligibility) {
  const offers = [];

  if (score >= 600) {
    offers.push({
      bank: "HDFC Bank",
      amount: Math.min(loanEligibility, 100000),
      interest: score >= 750 ? 10 : 12,
    });
  }
  if (score >= 550) {
    offers.push({
      bank: "ICICI Bank",
      amount: Math.min(loanEligibility, 75000),
      interest: score >= 750 ? 11 : 13,
    });
  }
  if (score >= 500) {
    offers.push({
      bank: "Axis Bank",
      amount: Math.min(loanEligibility, 50000),
      interest: score >= 650 ? 12 : 14,
    });
  }
  if (score >= 450) {
    offers.push({
      bank: "Kotak Mahindra",
      amount: Math.min(loanEligibility, 40000),
      interest: 15,
    });
  }

  if (offers.length === 0) {
    offers.push({
      bank: "Upload transactions to see offers",
      amount: 0,
      interest: 0,
      disabled: true,
    });
  }

  return offers;
}
