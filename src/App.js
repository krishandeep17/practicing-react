import { pizzaData } from "./data";

const Header = () => {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
};

const Footer = () => {
  const openHour = 10;
  const closeHour = 22;
  const currentHour = new Date().getHours();

  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We're open from {openHour}:00 to {closeHour}:00. Come visit us or
            order online.
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
};

const Pizza = ({ name, ingredients, price, image, soldOut }) => {
  return (
    <li className={`pizza ${soldOut && "sold-out"}`}>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
};

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>
      <ul className="pizzas">
        {pizzaData.map((pizza) => {
          const { id, name, ingredients, price, image, soldOut } = pizza;
          return (
            <Pizza
              key={id}
              name={name}
              ingredients={ingredients}
              price={price}
              image={image}
              soldOut={soldOut}
            />
          );
        })}
      </ul>
    </main>
  );
};

const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

export default App;
