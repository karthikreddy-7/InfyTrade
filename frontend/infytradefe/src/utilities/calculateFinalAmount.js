export function calculateFinalAmount(transactionType, currentBalance, amount) {
  let finalAmount;
  switch (transactionType) {
    case "withdraw":
      finalAmount = Number(currentBalance) - Number(amount);
      return finalAmount;
    case "deposit":
      finalAmount = Number(currentBalance) + Number(amount);
      return finalAmount;
    default:
      throw new Error("Invalid transaction type");
  }
}
