import './SettingsPanel.css';

const PERSONALITY_MODES = [
  { id: 'normal', name: 'Normal', emoji: '😐' },
  { id: 'sarcastic', name: 'Sarcastic', emoji: '😏' },
  { id: 'enthusiastic', name: 'Enthusiastic', emoji: '🎉' },
  { id: 'existential', name: 'Existential', emoji: '🤔' },
  { id: 'pirate', name: 'Pirate', emoji: '🏴‍☠️' },
  { id: 'robot', name: 'Robot', emoji: '🤖' },
];

const ACHIEVEMENT_LIST = [
  { id: 'first', name: 'First Steps', description: 'Complete first calculation' },
  { id: 'basic', name: 'Basic Math Wizard', description: 'Calculate 2+2' },
  { id: 'easter', name: 'Easter Egg Hunter', description: 'Find an easter egg' },
  { id: 'danger', name: 'Danger Seeker', description: 'Attempt division by zero' },
];

function SettingsPanel({ isOpen, onClose, personalityMode, onPersonalityChange, achievements, calculationCount }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="settings-overlay" onClick={onClose} />
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Settings ⚙️</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="settings-content">
          <section className="settings-section">
            <h3>Personality Mode</h3>
            <div className="personality-grid">
              {PERSONALITY_MODES.map(mode => (
                <button
                  key={mode.id}
                  className={`personality-btn ${personalityMode === mode.id ? 'active' : ''}`}
                  onClick={() => onPersonalityChange(mode.id)}
                >
                  <span className="personality-emoji">{mode.emoji}</span>
                  <span className="personality-name">{mode.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="settings-section">
            <h3>Achievements 🏆</h3>
            <div className="stats-display">
              <p>Calculations: <strong>{calculationCount}</strong></p>
              <p>Unlocked: <strong>{achievements.length}/{ACHIEVEMENT_LIST.length}</strong></p>
            </div>
            <div className="achievement-list">
              {ACHIEVEMENT_LIST.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`achievement-item ${achievements.includes(achievement.id) ? 'unlocked' : 'locked'}`}
                >
                  <span className="achievement-icon">
                    {achievements.includes(achievement.id) ? '✅' : '🔒'}
                  </span>
                  <div>
                    <div className="achievement-name">{achievement.name}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;
