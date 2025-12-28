import './Display.css';

function Display({ value, previousValue, timeMessage }) {
  return (
    <div className="display-container">
      {previousValue && (
        <div className="previous-value">{previousValue}</div>
      )}
      <div className="display-value">{value}</div>
      {timeMessage && (
        <div className="time-message">{timeMessage}</div>
      )}
    </div>
  );
}


export default Display;
