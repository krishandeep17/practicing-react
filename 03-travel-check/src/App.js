import { useState } from "react";

import { Form, Header, PackingList, Stats } from "./components";
import { initialItems } from "./data";

const App = () => {
  const [items, setItems] = useState(initialItems);

  // Add item in array
  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  // Delete item in array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Update item in array
  function handleCheckItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Empty an array
  function handleClearList() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (isConfirmed) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItem} />
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
