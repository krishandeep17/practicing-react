import { useState } from "react";

import Item from "./Item";

const PackingList = ({ items, onDeleteItem, onCheckItem, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortItems;

  if (sortBy === "input") sortItems = items;

  // Sorting non-ASCII characters
  if (sortBy === "description") {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  // Sorting numbers
  if (sortBy === "quantity") {
    sortItems = items.slice().sort((a, b) => a.quantity - b.quantity);
  }

  // Sorting boolean
  if (sortBy === "packed") {
    sortItems = items.slice().sort((a, b) => a.packed - b.packed);
  }

  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="quantity">Sort by quantity</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button className="btn-reset" onClick={onClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
};

export default PackingList;
