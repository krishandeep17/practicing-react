const Item = ({ item, onDeleteItem, onCheckItem }) => {
  const { id, description, packed, quantity } = item;
  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => {
          onCheckItem(id);
        }}
      />
      <label style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </label>
      <button style={{ color: "red" }} onClick={() => onDeleteItem(id)}>
        X
      </button>
    </li>
  );
};

export default Item;
