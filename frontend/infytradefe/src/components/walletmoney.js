import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getRandomTimeout } from "../utilities/getRandomTimeout";
import { useDispatch, useSelector } from "react-redux";
import { calculateFinalAmount } from "../utilities/calculateFinalAmount";
import { updateUser } from "../api/auth";
import ModalComponent from "./modal";

function Walletmoney() {
  const [loading, setLoading] = useState(true);
  const [loadingMinTimeElapsed, setLoadingMinTimeElapsed] = useState(false);

  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const [amount, setAmount] = useState(""); // State to store the amount input
  const [transactionType, setTransactionType] = useState(""); // State to store the current transaction type

  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);

  const transactions = [
    {
      id: 1,
      date: "2024-07-29",
      type: "Deposit",
      amount: "$500.00",
      balanceAfter: "$1500.00",
    },
    {
      id: 2,
      date: "2024-07-28",
      type: "Withdrawal",
      amount: "$200.00",
      balanceAfter: "$1000.00",
    },
    {
      id: 3,
      date: "2024-07-27",
      type: "Deposit",
      amount: "$300.00",
      balanceAfter: "$1200.00",
    },
    {
      id: 4,
      date: "2024-07-26",
      type: "Withdrawal",
      amount: "$100.00",
      balanceAfter: "$900.00",
    },
    {
      id: 5,
      date: "2024-07-25",
      type: "Deposit",
      amount: "$400.00",
      balanceAfter: "$1300.00",
    },
    {
      id: 6,
      date: "2024-07-24",
      type: "Withdrawal",
      amount: "$150.00",
      balanceAfter: "$1150.00",
    },
    {
      id: 7,
      date: "2024-07-23",
      type: "Deposit",
      amount: "$250.00",
      balanceAfter: "$1400.00",
    },
    {
      id: 8,
      date: "2024-07-22",
      type: "Withdrawal",
      amount: "$300.00",
      balanceAfter: "$1100.00",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMinTimeElapsed(true);
      setLoading(false);
    }, getRandomTimeout());

    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    console.log("inside handlesubmit");
    const finalAmount = calculateFinalAmount(
      transactionType,
      user.balance,
      parseFloat(amount)
    );

    try {
      const response = await updateUser(
        user.id,
        { balance: finalAmount },
        dispatch
      );
      console.log(response);
      user = response;
      if (transactionType === "addFunds") setIsAddFundsOpen(false);
      if (transactionType === "withdraw") setIsWithdrawOpen(false);
      if (transactionType === "deposit") setIsDepositOpen(false);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <>
      {loading || !loadingMinTimeElapsed ? (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex flex-row">
            <div className="flex flex-col justify-center items-start h-screen">
              <div className="stats bg-primary text-primary-content justify-center items-center ml-8">
                <div className="stat">
                  <div className="stat-title text-white">Account balance</div>
                  <div className="stat-value text-white">${user.balance}</div>
                  <div className="stat-actions">
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => {
                        setTransactionType("addFunds");
                        setIsAddFundsOpen(true);
                      }}
                    >
                      Add Funds
                    </button>
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-actions">
                    <button
                      className="btn btn-sm m-2"
                      onClick={() => {
                        setTransactionType("withdraw");
                        setIsWithdrawOpen(true);
                      }}
                    >
                      Withdrawal
                    </button>
                    <button
                      className="btn btn-sm m-2"
                      onClick={() => {
                        setTransactionType("deposit");
                        setIsDepositOpen(true);
                      }}
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-screen flex flex-col justify-center items-center p-12">
              <div className="m-2 text-2xl font-bold p-4">Wallet Summary</div>
              <div className="overflow-x-auto w-full">
                <table className="table table-zebra w-full">
                  {/* Table Head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover">
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.balanceAfter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Funds Modal */}
          <ModalComponent
            title="Add Funds"
            isOpen={isAddFundsOpen}
            setIsOpen={setIsAddFundsOpen}
            buttons={[
              {
                label: "Confirm",
                color: "success",
                variant: "solid",
                onClick: handleSubmit,
              },
              {
                label: "Cancel",
                color: "error",
                variant: "ghost",
                onClick: () => setIsAddFundsOpen(false),
              },
            ]}
          >
            {/* Modal content for adding funds */}
            <div>
              <p>Enter amount to add:</p>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered w-full max-w-xs m-4 input-info"
              />
            </div>
          </ModalComponent>

          {/* Withdraw Modal */}
          <ModalComponent
            title="Withdraw"
            isOpen={isWithdrawOpen}
            setIsOpen={setIsWithdrawOpen}
            buttons={[
              {
                label: "Confirm",
                color: "success",
                variant: "solid",
                onPress: handleSubmit,
              },
              {
                label: "Cancel",
                color: "error",
                variant: "ghost",
                onPress: () => setIsWithdrawOpen(false),
              },
            ]}
          >
            {/* Modal content for withdrawing */}
            <div>
              <p>Enter amount to withdraw:</p>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered w-full max-w-xs m-4 input-info"
              />
            </div>
          </ModalComponent>

          {/* Deposit Modal */}
          <ModalComponent
            title="Deposit"
            isOpen={isDepositOpen}
            setIsOpen={setIsDepositOpen}
            buttons={[
              {
                label: "Confirm",
                color: "success",
                variant: "solid",
                onPress: handleSubmit,
              },
              {
                label: "Cancel",
                color: "error",
                variant: "ghost",
                onPress: () => setIsDepositOpen(false),
              },
            ]}
          >
            {/* Modal content for depositing */}
            <div>
              <p>Enter amount to deposit:</p>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input input-bordered w-full max-w-xs m-4 input-info"
              />
            </div>
          </ModalComponent>
        </>
      )}
    </>
  );
}

export default Walletmoney;
