const ACHIEVEMENTS = {
  FIRST_CALC: { id: 'first', name: 'First Steps', description: 'Complete first calculation' },
  BASIC_MATH: { id: 'basic', name: 'Basic Math Wizard', description: 'Calculate 2+2' },
  TRUST_ISSUES: { id: 'trust', name: 'Trust Issues', description: 'Calculate same thing 5 times' },
  DANGER_SEEKER: { id: 'danger', name: 'Danger Seeker', description: 'Attempt division by zero' },
  EASTER_HUNTER: { id: 'easter', name: 'Easter Egg Hunter', description: 'Find an easter egg' },
};

export function checkAchievement(value, display) {
  const achievements = getAchievements();
  
  // First calculation
  if (!achievements.includes('first') && value === '=') {
    unlockAchievement('first');
  }
  
  // Basic math (2+2)
  if (!achievements.includes('basic') && display === '4') {
    unlockAchievement('basic');
  }
  
  // Easter egg hunter
  if (!achievements.includes('easter') && [42, 69, 420, 777].includes(parseFloat(display))) {
    unlockAchievement('easter');
  }
  
  // Danger seeker (division by zero message)
  if (!achievements.includes('danger') && typeof display === 'string' && display.includes('divide')) {
    unlockAchievement('danger');
  }
}

export function getAchievements() {
  const stored = localStorage.getItem('achievements');
  return stored ? JSON.parse(stored) : [];
}

function unlockAchievement(id) {
  const achievements = getAchievements();
  if (!achievements.includes(id)) {
    achievements.push(id);
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }
}
