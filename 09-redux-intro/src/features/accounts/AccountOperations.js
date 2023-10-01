import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  function handleDeposit() {
    if (!depositAmount) return;

    // when we `dispatch` here and then call the `deposit` action creator instead of ending up with the event object, we'll end up a function
    // when a function dispatch, `Redux` know that, that function is the `thunk`
    dispatch(deposit(depositAmount, currency));

    setDepositAmount("");
    setCurrency("INR");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;

    dispatch(withdraw(withdrawalAmount));

    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;

    dispatch(requestLoan(loanAmount, loanPurpose));

    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (!account.loan) return;

    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            min={0}
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Rupee</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button disabled={account.isLoading} onClick={handleDeposit}>
            {account.isLoading ? "Converting" : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            min={0}
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            min={0}
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {account.loan ? (
          <div>
            <span>Pay back</span>{" "}
            <span>
              {formatCurrency(account.loan)} ({account.loanPurpose})
            </span>{" "}
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AccountOperations;
