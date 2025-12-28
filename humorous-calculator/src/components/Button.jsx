import './Button.css';

function Button({ value, type, wide, onClick }) {
  const getClassName = () => {
    let className = 'button';
    if (type === 'operator') className += ' operator';
    if (type === 'function') className += ' function';
    if (wide) className += ' wide';
    return className;
  };

  return (
    <button
      className={getClassName()}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;
