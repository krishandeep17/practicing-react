const Stats = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentPacked = Math.round((numPacked / numItems) * 100);

  if (numItems === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items in your packing list 🚀</em>
      </footer>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? "You got everything, ready to go! ✈️"
          : `
            🧳You have ${numItems} items in your list, and you already packed
            ${numPacked} (${percentPacked}%)
          `}
      </em>
    </footer>
  );
};

export default Stats;
