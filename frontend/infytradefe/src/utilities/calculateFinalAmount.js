export function calculateFinalAmount(transactionType, currentBalance, amount) {
  switch (transactionType) {
    case "addFunds":
      return currentBalance + amount;
    case "withdraw":
      return currentBalance - amount;
    case "deposit":
      return currentBalance + amount;
    default:
      throw new Error("Invalid transaction type");
  }
}
