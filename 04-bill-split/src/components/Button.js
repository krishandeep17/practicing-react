const Button = ({ children, onClick }) => {
  return (
    <button type="submit" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
