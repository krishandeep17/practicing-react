const Item = ({ item, onDeleteItem, onCheckItem }) => {
  const { id, description, packed, quantity } = item;

  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        id={id}
        onChange={() => onCheckItem(id)}
      />
      <label
        htmlFor={id}
        style={packed ? { textDecoration: "line-through" } : {}}
      >
        {quantity} {description}
      </label>
      <button onClick={() => onDeleteItem(id)}>&times;</button>
    </li>
  );
};

export default Item;
