export function getTimeBasedMessage() {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  
  // Weekend detection
  if (day === 0 || day === 6) {
    if (Math.random() < 0.3) {
      return "It's the weekend... homework? 😅";
    }
  }
  
  // Late night
  if (hour >= 23 || hour < 5) {
    if (Math.random() < 0.3) {
      return "Late night math session? 🌙";
    }
  }
  
  // Early morning
  if (hour >= 5 && hour < 7) {
    if (Math.random() < 0.3) {
      return "Morning calculations! ☕";
    }
  }
  
  // Work hours
  if (hour >= 9 && hour < 17 && day >= 1 && day <= 5) {
    if (Math.random() < 0.2) {
      return "Shouldn't you be working? 💼";
    }
  }
  
  return null;
}
