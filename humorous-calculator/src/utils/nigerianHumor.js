// Sarcastic Nigerian Pidgin calculator humor
const PIDGIN_MESSAGES = [
  // Sarcastic general calculations
  "Wetin be this abeg? 😒",
  "Na wetin carry you come calculator be this? You dull o 🤦‍♂️",
  "Oga, primary school pikin fit solve this one 😂",
  "You sure say you go school? 🤔",
  "Chai! Even my grandmother quick pass you 😭",
  "Bros, you wan use calculator for this simple thing? 😏",
  "Abeg, you need help abi? This one hard you? 😂",
  "You dey whine me abi? This calculation too simple! 🙄",
  "Omo, your brain don rest? Wake am up! 😴",
  "Shebi you see the answer now? E shock you abi? 😏",
  
  // More sarcasm
  "This one wey you calculate now, na achievement? 😂",
  "You dey do like say you solve quantum physics 🤣",
  "Abeg shift, make better person calculate 😤",
  "Your teacher go dey proud abi? For this rubbish calculation? 😭",
  "Na wa o! Simple plus simple don stress you 🤦‍♀️",
  "You sure calculator no go vex for you? 😂",
  "Omo, if mathematics see you ehn... 📚😭",
  "This one wey you dey calculate, e get sense? 🤨",
  "Abeg rest small, you don tire calculator 😂",
  "You dey try sha, but e never reach 😏",
  
  // Mocking intelligence
  "Einstein dey roll for grave 😂",
  "Your brain need software update o! 🧠⚙️",
  "Calculator dey tire for your hand 😮‍💨",
  "You wan break calculator with this yeye sum? 😂",
  "If na exam, you don fail finish! 😭",
  "Abeg, who send you message? 📱",
  "You dey use calculator for this? Nawa o! 🤦",
  "Your brain don go on vacation abi? ✈️😂",
  "Wetin concern calculator with this rubbish? 😤",
  
  // Question their choices
  "You sure say na calculation you wan do? 🤔",
  "Abi you just dey press button for fun? 😏",
  "This result dey surprise you? E suppose shock you! 😂",
  "You expect different answer? Nah same thing o! 🙄",
  "Na guesswork you dey do abi? 😭",
  "Omo, you just dey try your luck 🎰😂",
  
  // Playful insults
  "Maths don deal with you finish! 😂",
  "You come calculator come disgrace yourself 🤦‍♂️",
  "This one no hard, na you wey hard 😏",
  "Calculator say make you rest 😴",
  "You wan wound me with this calculation? 😤",
  "Your brain tire you abi? Small calculation dey stress you 😂",
  "Oga calculator chief, wetin you calculate now? 😭",
  "You sure say you sabi wetin you dey do? 🤨",
  
  // More savage ones
  "If confusion be person, na you! 😂",
  "You dey calculate or you dey play? 🎮",
  "Small addition don make you sweat 😅",
  "Na only this one you fit do? Kai! 😭",
  "You try small sha, e remain plenty 😏",
  "Calculator dey beg you make you stop 🙏😂",
  "Omo, this one pain me o! Too simple! 😤",
  "You need tutor abi? I fit help you 😂",
];

// Special sarcastic messages for specific scenarios
const SPECIAL_SCENARIOS = {
  veryLarge: [
    "Omo! Where you see this big number? You dey calculate national debt? 😂",
    "This money wey you calculate, e reach your hand? 😭",
    "Abeg, who get this kind money wey you dey calculate? 🤑",
    "You don calculate finish, but the money no dey your account o! 😂",
    "Na dream calculation be this? Wake up jare! 😴",
  ],
  verySmall: [
    "Wetin be this small small number? Grasshopper brain? 😂",
    "You dey calculate change for bread? 🍞😭",
    "This decimal point pass you o! 😂",
    "Small thing dey worry you? Nawa! 🤦‍♂️",
    "You need magnifying glass to see this result 🔍😂",
  ],
  zero: [
    "Zero! You calculate reach zero? Na your bank account? 😭",
    "Nothing! Empty! Just like your brain! 😂",
    "Oga zero, you don do well o! 🤡",
    "You see zero? Na your future be that 😂💔",
    "Abeg, even zero dey shame for you! 😤",
  ],
  repeated: [
    "You dey calculate the same thing again? Memory loss? 😂",
    "Oga, the answer never change o! You dull abi? 🤦‍♂️",
    "Why you dey waste my time? Same calculation hooo! 😤",
    "You no believe the first answer? This one pain me o! 😭",
    "See this one o! Dey calculate same thing twice! 😂",
  ],
  divisionByZero: [
    "You wan divide by zero? You craze abi? 🤪",
    "Bros, mathematics no be juju! You no fit divide zero! 😂",
    "Abeg, leave zero alone! E no do you anything! 🙅‍♂️",
    "This one na wahala! You wan break calculator? 💥😭",
    "Zero no get part for this matter! Comot! 😤",
    "You see as you just fail mathematics now? 😂",
  ],
  simple: [
    "This one wey you calculate... baby fit do am o! 👶😂",
    "Omo, if na only this you sabi, wahala dey! 😭",
    "You come here come do addition? Primary school things! 📚😂",
    "Simple calculation don make you press calculator? Nawa! 🤦‍♀️",
    "You sure say you need calculator for this rubbish? 😏",
  ],
};

export function getNigerianHumor(result, calculationHistory = []) {
  const num = parseFloat(result);
  
  // Check for division by zero message
  if (typeof result === 'string' && (result.includes('divide') || result.includes('Infinity'))) {
    const message = SPECIAL_SCENARIOS.divisionByZero[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.divisionByZero.length)
    ];
    return {
      message,
      confetti: false,
      shake: true, // Shake for division by zero
    };
  }
  
  // Very large numbers
  if (num > 1000000) {
    const message = SPECIAL_SCENARIOS.veryLarge[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.veryLarge.length)
    ];
    return { message, confetti: true };
  }
  
  // Very small decimals
  if (num > 0 && num < 0.01) {
    const message = SPECIAL_SCENARIOS.verySmall[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.verySmall.length)
    ];
    return { message, confetti: false };
  }
  
  // Zero
  if (num === 0) {
    const message = SPECIAL_SCENARIOS.zero[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.zero.length)
    ];
    return { message, confetti: false };
  }
  
  // Simple calculations (single digit results)
  if (num > 0 && num < 10 && num === Math.floor(num)) {
    const message = SPECIAL_SCENARIOS.simple[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.simple.length)
    ];
    return { message, confetti: false };
  }
  
  // Repeated calculation check
  if (calculationHistory.length > 0 && calculationHistory[calculationHistory.length - 1] === result) {
    const message = SPECIAL_SCENARIOS.repeated[
      Math.floor(Math.random() * SPECIAL_SCENARIOS.repeated.length)
    ];
    return { message, confetti: false };
  }
  
  // Default: Random sarcastic message
  const message = PIDGIN_MESSAGES[Math.floor(Math.random() * PIDGIN_MESSAGES.length)];
  return { message, confetti: false };
}
