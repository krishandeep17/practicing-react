const Button = ({ children, onClick }) => {
  return (
    <button type="submit" className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
