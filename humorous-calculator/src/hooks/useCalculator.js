import { useState, useEffect } from 'react';

function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationCount, setCalculationCount] = useState(
    parseInt(localStorage.getItem('calculationCount')) || 0
  );

  useEffect(() => {
    localStorage.setItem('calculationCount', calculationCount);
  }, [calculationCount]);

  const calculate = (firstValue, secondValue, operation) => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    switch (operation) {
      case '+':
        return num1 + num2;
      case '−':
        return num1 - num2;
      case '×':
        return num1 * num2;
      case '÷':
        if (num2 === 0) {
          const divByZeroMessages = [
            'Infinity called, it\'s busy 📞',
            'Nice try, Timmy 🙅',
            'Error: Universe.exe stopped',
            'Math teachers are crying 😢',
            'Cannot divide by zero!',
            'Bold move! ⚠️'
          ];
          return divByZeroMessages[Math.floor(Math.random() * divByZeroMessages.length)];
        }
        return num1 / num2;
      default:
        return secondValue;
    }
  };

  const handleButtonClick = (value) => {
    // Numbers and decimal
    if ((value >= '0' && value <= '9') || value === '.') {
      if (waitingForOperand) {
        setDisplay(String(value));
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? String(value) : display + value);
      }
      return display;
    }

    // Clear
    if (value === 'AC') {
      setDisplay('0');
      setPreviousValue('');
      setOperation(null);
      setWaitingForOperand(false);
      return '0';
    }

    // Plus/Minus toggle
    if (value === '+/-') {
      const newValue = parseFloat(display) * -1;
      setDisplay(String(newValue));
      return String(newValue);
    }

    // Percentage
    if (value === '%') {
      const newValue = parseFloat(display) / 100;
      setDisplay(String(newValue));
      return String(newValue);
    }

    // Equals
    if (value === '=') {
      if (operation && previousValue) {
        const result = calculate(previousValue, display, operation);
        setDisplay(String(result));
        setPreviousValue('');
        setOperation(null);
        setWaitingForOperand(true);
        setCalculationCount(prev => prev + 1);
        return result;
      }
      return display;
    }

    // Operations
    if (['+', '−', '×', '÷'].includes(value)) {
      if (operation && !waitingForOperand) {
        const result = calculate(previousValue, display, operation);
        setDisplay(String(result));
        setPreviousValue(String(result));
      } else {
        setPreviousValue(display);
      }
      setOperation(value);
      setWaitingForOperand(true);
      return display;
    }

    return display;
  };

  return {
    display,
    previousValue: previousValue ? `${previousValue} ${operation || ''}` : '',
    handleButtonClick,
    calculationCount,
  };
}

export default useCalculator;
