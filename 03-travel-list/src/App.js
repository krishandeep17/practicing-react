import { useState } from "react";

import initialItems from "./data";
import { Form, Logo, PackingList, Stats } from "./components";

const App = () => {
  const [items, setItems] = useState(initialItems);

  // Add item in array
  const handleAddItems = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // Delete item in array
  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  // Update item in array
  const handleCheckItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  // Empty an array
  const handleClearList = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (isConfirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
