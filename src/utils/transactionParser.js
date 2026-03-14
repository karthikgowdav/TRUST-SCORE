/**
 * Parses CSV transaction files (UPI/bank statements)
 * Supports formats with: Date, Narration/Description, Debit, Credit, Balance
 */

export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const transactions = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 2) continue;

    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim().toLowerCase()] = values[idx]?.trim() || "";
    });

    const debit = parseAmount(row.debit || row["debit amount"] || row["withdrawal"] || 0);
    const credit = parseAmount(row.credit || row["credit amount"] || row["deposit"] || 0);
    const amount = parseAmount(row.amount || 0);

    let transactionAmount = 0;
    let type = "other";

    if (debit > 0) {
      transactionAmount = -debit;
      type = "debit";
    } else if (credit > 0) {
      transactionAmount = credit;
      type = "credit";
    } else if (amount !== 0) {
      transactionAmount = amount;
      type = amount > 0 ? "credit" : "debit";
    }

    if (transactionAmount !== 0) {
      transactions.push({
        date: row.date || row["transaction date"] || row["value date"] || "",
        description: row.narration || row.description || row.particulars || "",
        amount: transactionAmount,
        type,
        debit: debit,
        credit: credit,
      });
    }
  }

  return transactions;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if ((char === "," && !inQuotes) || char === "\t") {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseAmount(val) {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^\d.-]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result || "";
        const ext = (file.name || "").toLowerCase();
        if (ext.endsWith(".csv")) {
          resolve(parseCSV(text));
        } else {
          reject(new Error("Only CSV files are supported. Please upload a .csv file."));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file, "UTF-8");
  });
}
