import { useState } from "react";

import Button from "./Button";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const paidByFriend = bill - paidByUser;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    // Negative number in the balance are owned by you(user) and positive number means that your friend is owning you.
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByFriend);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label htmlFor="bill">Bill value</label>
      <input
        type="number"
        id="bill"
        min="0"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="paidByUser">Your expense</label>
      <input
        type="number"
        id="paidByUser"
        min="0"
        max={bill}
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />

      <label htmlFor="paidByFriend">
        <span className="capitalize">{selectedFriend.name}</span>'s expense
      </label>
      <input type="number" id="paidByFriend" disabled value={paidByFriend} />

      <label htmlFor="whoIsPaying">Who is paying the bill?</label>
      <select
        id="whoIsPaying"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend" className="capitalize">
          {selectedFriend.name}
        </option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};

export default FormSplitBill;
