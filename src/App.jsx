import { useState, useEffect } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import Confetti from './components/Confetti';
import SettingsPanel from './components/SettingsPanel';
import useCalculator from './hooks/useCalculator';
import { getNigerianHumor } from './utils/nigerianHumor';
import { checkAchievement, getAchievements } from './utils/achievements';
import { getPersonalityResponse } from './utils/personalities';
import { getTimeBasedMessage } from './utils/timeDetection';
import './App.css';

const BUTTONS = [
  { value: 'AC', type: 'function' },
  { value: '+/-', type: 'function' },
  { value: '%', type: 'function' },
  { value: '÷', type: 'operator' },
  { value: '7', type: 'number' },
  { value: '8', type: 'number' },
  { value: '9', type: 'number' },
  { value: '×', type: 'operator' },
  { value: '4', type: 'number' },
  { value: '5', type: 'number' },
  { value: '6', type: 'number' },
  { value: '−', type: 'operator' },
  { value: '1', type: 'number' },
  { value: '2', type: 'number' },
  { value: '3', type: 'number' },
  { value: '+', type: 'operator' },
  { value: '0', type: 'number', wide: true },
  { value: '.', type: 'number' },
  { value: '=', type: 'operator' },
];

function App() {
  const { display, previousValue, handleButtonClick, calculationCount } = useCalculator();
  const [easterEggMessage, setEasterEggMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [personalityMode, setPersonalityMode] = useState(
    localStorage.getItem('personalityMode') || 'normal'
  );
  const [timeMessage, setTimeMessage] = useState('');
  const [calculatorFact, setCalculatorFact] = useState('');

  // Add calculation history tracking at the top of App() function
const [calculationHistory, setCalculationHistory] = useState([]);


// Show Nigerian Pidgin humor ONLY after pressing equals
const [lastCalculation, setLastCalculation] = useState(null);

useEffect(() => {
  // Only show if we have a new calculation result
  if (lastCalculation && lastCalculation !== display) {
    const humor = getNigerianHumor(display, calculationHistory);
    if (humor) {
      setEasterEggMessage(humor.message);
      if (humor.confetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      if (humor.shake) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      setTimeout(() => setEasterEggMessage(''), 6000);
    }
    setLastCalculation(null); // Reset after showing
  }
}, [lastCalculation, display, calculationHistory]);


  // Update achievements
  useEffect(() => {
    const storedAchievements = getAchievements();
    setAchievements(storedAchievements);
  }, [display]);

  // Time-based messages
  useEffect(() => {
    const message = getTimeBasedMessage();
    if (message) {
      setTimeMessage(message);
      setTimeout(() => setTimeMessage(''), 5000);
    }
  }, [calculationCount]);

  // Random calculator facts
  useEffect(() => {
    const facts = [
      "Did you know? Calculators were banned from SATs until 1994 📚",
      "Fun fact: The first electronic calculator weighed 55 pounds! 💪",
      "The word 'calculator' comes from Latin 'calculare' meaning to count",
      "Pocket calculators were invented in 1970",
      "The equals sign (=) was invented in 1557",
      "Ancient Romans used the abacus for calculations 🏛️"
    ];
    
    const interval = setInterval(() => {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setCalculatorFact(randomFact);
      setTimeout(() => setCalculatorFact(''), 8000);
    }, 30000); // Show every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = (value) => {
    const result = handleButtonClick(value);
    checkAchievement(value, display);
    
    // Track calculation history and trigger Nigerian humor ONLY when = is pressed
    if (value === '=') {
      setCalculationHistory(prev => [...prev.slice(-4), result]);
      setLastCalculation(result); // This triggers the humor
    }
  };




  const handlePersonalityChange = (mode) => {
    setPersonalityMode(mode);
    localStorage.setItem('personalityMode', mode);
  };

  return (
    <div className={`app ${shake ? 'shake' : ''}`}>
      {showConfetti && <Confetti />}
      
      <button 
        className="settings-toggle"
        onClick={() => setShowSettings(!showSettings)}
        aria-label="Toggle Settings"
      >
        ⚙️
      </button>

      <SettingsPanel 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        personalityMode={personalityMode}
        onPersonalityChange={handlePersonalityChange}
        achievements={achievements}
        calculationCount={calculationCount}
      />
      
      {/* Nigerian Pidgin Message - ABOVE calculator */}
      {easterEggMessage && (
        <div className="pidgin-message">
          {easterEggMessage}
        </div>
      )}
      
      <div className="calculator">
        <Display 
          value={display} 
          previousValue={previousValue}
          timeMessage={timeMessage}
        />

        
        <div className="button-grid">
          {BUTTONS.map((btn, index) => (
            <Button
              key={index}
              value={btn.value}
              type={btn.type}
              wide={btn.wide}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>

      {calculatorFact && (
        <div className="calculator-fact">{calculatorFact}</div>
      )}

      <footer className="footer">
        Built by Danbury
        {achievements.length > 0 && (
          <span className="achievement-count"> • {achievements.length} achievements 🏆</span>
        )}
      </footer>
    </div>
  );
}

export default App;
