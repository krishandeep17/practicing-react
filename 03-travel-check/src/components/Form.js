import { useState } from "react";

const Form = ({ onAddItems }) => {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };

    onAddItems(newItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <div className="add-form">
      <h2>What do you need for your 😍 trip?</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          autoCapitalize="on"
          autoComplete="off"
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={!description} type="submit" className="btn-form">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
