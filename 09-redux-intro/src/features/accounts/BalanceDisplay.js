import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

// Before we had hooks, this is way we needed to do it

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// map some state from our store to a prop
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

// `connect` function return a new function and so `connect(mapStateToProps)` become a function and the `BalanceDisplay` component will then be the argument of that new function. And so that new function is basically a new component and that new component will have the `balance` prop
export default connect(mapStateToProps)(BalanceDisplay);
